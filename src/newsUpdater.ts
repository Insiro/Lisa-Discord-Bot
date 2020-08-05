import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import { parseString } from 'xml2js';

import { News } from './entity/News';
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

function data2Embed(data: Array<any>): Array<MessageEmbed> {
    const list: Array<MessageEmbed> = [];
    data.forEach((data) => {
        const embed = new MessageEmbed()
            .setTitle(data.title[0])
            .setURL(data.link[0]);

        if (data.category[0] !== 'notice')
            embed.setDescription(data.description[0]);
        list.push(embed);
    });
    return list;
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
    let news = await News.findOne({ where: { id: 1 } });
    if (news !== undefined && news !== null) {
        const datas: Array<any> = [];
        for (const item of event) {
            if (item.pubDate > news.event) {
                datas.push(item);
            } else break;
        }
        for (const item of magazine) {
            if (item.pubDate > news.magazine) {
                datas.push(item);
            } else break;
        }
        for (const item of update) {
            if (item.pubDate > news.update) {
                datas.push(item);
            } else break;
        }
        for (const item of notic) {
            if (item.pubDate > news.notic) {
                datas.push(item);
            } else break;
        }
        embedList = data2Embed(datas);
    } else {
        news = new News();
        news.id = 1;
        news.event = new Date(event[0].pubDate);
        news.magazine = new Date(magazine[0].pubDate);
        news.update = new Date(update[0].pubDate);
        news.notic = new Date(notic[0].pubDate);
        news.save();
        embedList = data2Embed(event.concat(magazine, update, notic));
    }
    embedList.forEach((embed) => {
        sendEmbed(client, embed);
    });
    return;
}
