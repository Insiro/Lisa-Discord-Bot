import { Message } from 'discord.js';
import { getPlayerID, getEntirelyByName, getEntirely } from './user';

export const CyUsers = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    let result;
    switch (args[0]) {
        case 'ID':
        case 'id':
            result = await getPlayerID(args[1]);
            break;
        case 'Entirely':
        case '전적':
            result = await getEntirelyByName(args[1]);
            break;
        case 'EntirelyByID':
        case '전적ID':
        case '전적id':
            result = await getEntirely(args[1]);
            break;
        default:
            result = 'wrong command';
    }
    await msg.channel.send(result);
};
