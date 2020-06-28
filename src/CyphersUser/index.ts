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
            if (args.length == 2) result = await getEntirelyByName(args[1]);
            else if (args[1] == '키' || args[1] == 'key' || args[1] == 'id') {
                result = await getEntirely(args[2]);
            } else result = 'wrong command';
            break;
        default:
            result = 'wrong command';
    }
    await msg.channel.send(result);
};
