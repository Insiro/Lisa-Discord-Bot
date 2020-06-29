import { Message } from 'discord.js';
import { SuccessfulParsedMessage } from 'discord-command-parser';
import { CyphersApiKey, CyApiLink } from '../config';
import * as request from 'request-promise-native';

export const CyRanking = async (offset: string): Promise<string> => {
    const Options = {
        uri: CyApiLink + 'ranking/ratingpoint',
        qs: {
            apikey: CyphersApiKey,
            offset: parseInt(offset) - 1,
        },
    };
    const list = JSON.parse(await request.get(Options))['rows'];
    let outString = '```markdown\n';
    for (const i in list) {
        const item = list[i];
        outString +=
            item['rank'] +
            '. ' +
            item['nickname'] +
            '\t' +
            item['ratingPoint'] +
            '\n';
    }
    outString += '```';
    return outString;
};

export const cyphersOthers = async (
    msg: Message,
    parsed: SuccessfulParsedMessage<Message>
): Promise<void> => {
    let outString = '';
    switch (parsed.command) {
        case 'ranking':
        case '랭킹':
            if (parsed.arguments.length === 0) outString = await CyRanking('1');
            else outString = await CyRanking(parsed.arguments[0]);
            break;
        default:
            outString = '준비중';
    }
    await msg.channel.send(outString);
};

export const CyMatch = (): string => {
    return '';
};
export const getRankings = (): string => {
    return '';
};
export default cyphersOthers;
