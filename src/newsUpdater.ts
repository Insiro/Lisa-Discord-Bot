import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import { parseString } from 'xml2js';

import { NewsDate } from './entity/NewsDate';
import { BotServer } from './entity/BotServer';
import { MessageEmbed, Client, TextChannel } from 'discord.js';

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
            (client.channels.cache.get(server.newsChannel) as
                | TextChannel
                | undefined)?.send(embed);
        }
    });
}

function datas2Embeds(dataList: Array<any>): Array<MessageEmbed> {
    const embedList: Array<MessageEmbed> = [];
    dataList.forEach((data) => {
        const embed = new MessageEmbed()
            .setTitle(data.title[0])
            .setURL(data.link[0])
            .addField('<<분류>>', data.category[0])
            .addField('<<링크>>', data.link[0]);
        if (data.category[0] !== 'notice')
            embed.setDescription(data.description[0]);
        embedList.push(embed);
    });
    return embedList;
}

function pushDataList(
    parsedData: any,
    compareDate: Date,
    list: Array<any>
): void {
    for (const item of parsedData) {
        const date = new Date(item.pubDate[0]);
        if (date > compareDate) {
            list.push(item);
        } else break;
    }
}

export async function worker(client: Client): Promise<void> {
    const event = await getData(
        'http://cyphers.nexon.com/cyphers/article/event/rss'
    );
    const magazine = await getData(
        'http://cyphers.nexon.com/cyphers/article/magazine/rss'
    );
    const update = await getData(
        'http://cyphers.nexon.com/cyphers/article/update/rss'
    );
    const notic = await getData(
        'http://cyphers.nexon.com/cyphers/article/notice/rss'
    );
    let embedList: Array<MessageEmbed>;
    let news = await NewsDate.findOne({ where: { id: 1 } });
    if (news !== undefined && news !== null) {
        const datas: Array<any> = [];
        pushDataList(event, news.event, datas);
        pushDataList(magazine, news.magazine, datas);
        pushDataList(update, news.update, datas);
        pushDataList(notic, news.notic, datas);
        news.event = event[0].pubDate[0];
        news.magazine = magazine[0].pubDate[0];
        news.update = update[0].pubDate[0];
        news.notic = notic[0].pubDate[0];
        embedList = datas2Embeds(datas);
    } else {
        news = new NewsDate();
        news.id = 1;
        news.event = new Date(event[0].pubDate);
        news.magazine = new Date(magazine[0].pubDate);
        news.update = new Date(update[0].pubDate);
        news.notic = new Date(notic[0].pubDate);
        embedList = datas2Embeds(event.concat(magazine, update, notic));
    }
    embedList.forEach((embed) => {
        sendEmbed(client, embed);
    });
    news.save();
    return;
}
