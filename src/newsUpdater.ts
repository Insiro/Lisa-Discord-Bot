import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import { parseString } from 'xml2js';

import { NewsDate } from './entity/NewsDate';
import { BotServer } from './entity/BotServer';
import { MessageEmbed, Client, TextChannel } from 'discord.js';
import AppDataSource from './data-sources';

const newsRepository = AppDataSource.getRepository(NewsDate);

async function getData(url: string): Promise<Array<any>> {
    const re = await request.get(url);
    let datas = '';
    parseString(
        cheerio.load(re, { xmlMode: true }).xml(),
        { mergeAttrs: true },
        (err, result) => (datas = JSON.stringify(result))
    );
    return JSON.parse(datas).rss.channel[0].item;
}

async function sendEmbed(client: Client, embed: MessageEmbed): Promise<void> {
    const serverList = await BotServer.find();
    serverList.forEach((server) => {
        if (server.newsChannel !== null && server.newsChannel !== undefined) {
            (
                client.channels.cache.get(server.newsChannel) as
                    | TextChannel
                    | undefined
            )?.send({ embeds:[embed] });
        }
    });
}

function pushEmbedList(
    parsedData: any,
    compareDate: Date | null,
    embedList: Array<MessageEmbed>
): void {
    for (const item of parsedData) {
        const date = new Date(item.pubDate[0]);
        if (compareDate === null || date > compareDate) {
            const embed = new MessageEmbed()
                .setTitle(item.title[0])
                .setURL(item.link[0])
                .addField('<<분류>>', item.category[0])
                .addField('<<링크>>', item.link[0]);
            if (item.category[0] !== 'notice')
                embed.setDescription(item.description[0]);
            embedList.push(embed);
        } else break;
    }
}

export async function worker(client: Client): Promise<void> {
    const event = await getData(
        'https://cyphers.nexon.com/cyphers/article/event/rss'
    );
    const magazine = await getData(
        'https://cyphers.nexon.com/cyphers/article/magazine/rss'
    );
    const update = await getData(
        'https://cyphers.nexon.com/cyphers/article/update/rss'
    );
    const notice = await getData(
        'https://cyphers.nexon.com/cyphers/article/notice/rss'
    );
    const embedList: Array<MessageEmbed> = [];
    let news = await newsRepository.findOne({ where: { id: 1 } });
    if (news !== undefined && news !== null) {
        pushEmbedList(event, news.event, embedList);
        pushEmbedList(magazine, news.magazine, embedList);
        pushEmbedList(update, news.update, embedList);
        pushEmbedList(notice, news.notic, embedList);
    } else {
        news = new NewsDate();
        news.id = 1;
        pushEmbedList(event, null, embedList);
        pushEmbedList(magazine, null, embedList);
        pushEmbedList(update, null, embedList);
        pushEmbedList(notice, null, embedList);
    }
    news.event = new Date(event[0].pubDate);
    news.magazine = new Date(magazine[0].pubDate);
    news.update = new Date(update[0].pubDate);
    news.notic = new Date(notice[0].pubDate);
    embedList.forEach((embed) => {
        sendEmbed(client, embed);
    });
    await newsRepository.save(news);
    return;
}
