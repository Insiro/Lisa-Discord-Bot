import { Message } from 'discord.js';
import { Server } from '../entity/Server';
import { getRepository } from 'typeorm';
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

const playingMember = async (guidID: string): Promise<string> => {
    const server: Server = (await getRepository('server')
        .createQueryBuilder()
        .where('serverId = :Sid', { Sid: guidID })
        .getOne()) as Server;
    if (server.clan === null) return 'not setted Clan Link yet';
    const re = await request.get(
        'http://cyphers.nexon.com/cyphers/clan/' + server.clan
    );
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
        default:
            result = '준비중입니다';
    }
    return result;
};
