import { Message, Guild } from 'discord.js';
import { Server } from '../entity/Server';
import { getRepository } from 'typeorm';
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
export const clanController = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    let result = '';
    if (msg.guild === null) {
        msg.channel.send('서버 에서만 가능합니다.');
        return;
    }
    switch (args[0]) {
        case '접속자':
            result = await playingMember(msg.guild!.id.toString());
            break;
        default:
            result = '준비중입니다';
    }
    msg.channel.send(result);
};

const playingMember = async (guidID: string): Promise<string> => {
    const server: Server = (await getRepository('server')
        .createQueryBuilder()
        .where('serverId = :Sid', { Sid: guidID })
        .getOne()) as Server;
    if (server.clan == null) return 'not setted Clan Link yet';
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
