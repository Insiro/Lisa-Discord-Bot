import { getEntirely } from './Entirely';
import { getMatchInfo } from './Match';
import { help } from './Help';
import { Message } from 'discord.js';
import { parse } from 'discord-command-parser';
import { getRanking } from './Ranking';
import { setup } from './Setup';
import { clanController } from './Clan';

export const sender = async (msg: Message): Promise<void> => {
    const prefix = '!!';
    const parsed = parse(msg, prefix);
    if (!parsed.success) return;
    let sendString: string;
    switch (parsed.command) {
        case 'help':
        case '도움말':
        case '명령어':
        case 'command':
            sendString = help(parsed.arguments);
            break;
        case 'setting':
        case '설정':
            sendString = await setup(msg, parsed.arguments);
            break;
        case 'entirely':
        case '전적':
            sendString = await getEntirely(parsed.arguments[0]);
            break;
        case '매치':
        case 'match':
            sendString = await getMatchInfo(parsed.arguments[0]);
            break;
        case 'clan':
        case '클랜':
            sendString = await clanController(msg, parsed.arguments);
            break;
        case 'ranking':
        case '랭킹':
            sendString = await getRanking(parsed.arguments[0]);
            break;
        default:
            return;
    }
    msg.channel.send(sendString);
};
