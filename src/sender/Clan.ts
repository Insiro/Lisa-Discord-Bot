import { Message, MessageEmbed } from 'discord.js';
import { BotServer } from '../entity/BotServer';
import { getGuildInfoStr } from '../utils/guild';
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

const getClanLink = async (
    guildID: string,
    isNaver: boolean
): Promise<string | null> => {
    const server: BotServer | null = await getGuildInfoStr(guildID);
    if (server === null || server.clan === null || server.clan === undefined)
        return null;
    const host = isNaver
        ? 'http://cyphers.playnetwork.co.kr/'
        : 'http://cyphers.nexon.com/';
    return host + 'cyphers/clan/' + server.clan;
};

const getClanSite = async (
    guildID: string,
    isNaver: boolean
): Promise<string | MessageEmbed> => {
    const clan = await getClanLink(guildID, isNaver);
    return clan === null || clan === undefined
        ? 'not setted Clan Link yet'
        : new MessageEmbed()
            .setTitle('클랜 홈페이지')
            .setURL(clan)
            .setDescription(isNaver ? 'naver publish' : 'nexon publish')
};

const playingMember = async (guidID: string): Promise<string> => {
    const clanUri = await getClanLink(guidID, false);
    if (clanUri === null || clanUri === undefined)
        return 'not setted Clan Link yet';
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
    if (
        memberList.length === 0 ||
        (memberList.length === 1 && memberList[0] === '')
    ) {
        return '```nobody playing game, right now```';
    }
    return '```+\n' + memberList.join('\n') + '```';
};

export const clanController = async (
    msg: Message,
    args: Array<string>
): Promise<string | MessageEmbed> => {
    let result: string | MessageEmbed;
    if (msg.guild === null || msg.guild === undefined) {
        return '서버 에서만 가능합니다.';
    }
    switch (args[0]) {
        case '접속자':
        case 'players':
            result = await playingMember(msg.guild.id.toString());
            break;
        case '홈피':
        case 'site':
            if (
                args.length === 2 &&
                (args[1] === '네이버' || args[1] === 'naver')
            )
                result = await getClanSite(msg.guild.id.toString(), true);
            else result = await getClanSite(msg.guild.id.toString(), false);
            break;
        default:
            result = 'wrong command';
    }
    return result;
};
