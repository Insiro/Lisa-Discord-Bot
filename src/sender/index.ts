import { getEntirely } from './Entirely';
import { getMatchInfo } from './Match';
import { help } from './Help';
import { Message } from 'discord.js';
import { parse, SuccessfulParsedMessage } from 'discord-command-parser';
import { getRanking } from './Ranking';
import { setup } from './Setup';
import { clanController } from './Clan';
import { BotServer } from '../entity/BotServer';
import { getGuildInfo } from '../utils/guild';
import { prefix } from '../config';
const normalCommander = async (
    msg: Message,
    parsed: SuccessfulParsedMessage<Message>
): Promise<void> => {
    const info: BotServer | null = await getGuildInfo(msg.guild);
    if (
        info !== null &&
        info.channel !== null &&
        info.channel !== undefined &&
        msg.channel.id.toString() !== info.channel
    ) {
        return;
    }
    let sendString: string;
    switch (parsed.command) {
        case 'entirely':
        case '전적':
            sendString = await getEntirely(parsed.arguments);
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

export const sender = async (msg: Message): Promise<void> => {
    const parsed = parse(msg, prefix);
    if (!parsed.success) return;
    let sendString: string;
    switch (parsed.command) {
        case 'setting':
        case '설정':
            sendString = await setup(msg, parsed.arguments);
            break;
        case 'help':
        case '도움말':
        case '명령어':
        case 'command':
            sendString = help(parsed.arguments);
            break;
        default:
            normalCommander(msg, parsed);
            return;
    }
    msg.channel.send(sendString);
};
