import { Message } from 'discord.js';
import { Server } from '../entity/Server';
import { getRepository } from 'typeorm';
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

const getClanLink = async (guildID: string): Promise<string | null> => {
    const server: Server = (await getRepository('server')
        .createQueryBuilder()
        .where('serverId = :Sid', { Sid: guildID })
        .getOne()) as Server;
    if (server.clan === null) return null;
    return 'http://cyphers.nexon.com/cyphers/clan/' + server.clan;
};

const getClanSite = async (guildID: string): Promise<string> => {
    const clan = await getClanLink(guildID);
    return clan === null ? 'not setted Clan Link yet' : clan;
};

const playingMember = async (guidID: string): Promise<string> => {
    const clanUri = await getClanLink(guidID);
    if (clanUri === null) return 'not setted Clan Link yet';
    const re = await request.get(clanUri);
    const html = cheerio.load(re);
    const memberList = html('.member_list > p')
        .text()
        .split(' ')
        .join('')
        .split('\n')
        .join('')
        .trim()
        .split(',');
    return '```+\n' + memberList.join('\n') + '```';
};

export const clanController = async (
    msg: Message,
    args: Array<string>
): Promise<string> => {
    let result = '';
    if (msg.guild === null) {
        return '서버 에서만 가능합니다.';
    }
    switch (args[0]) {
        case '접속자':
            result = await playingMember(msg.guild.id.toString());
            break;
        case '홈피':
            result = await getClanSite(msg.guild.id.toString());
            break;
        default:
            result = 'wrong command';
    }
    return result;
};
