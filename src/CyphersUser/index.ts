import { Message } from 'discord.js';
import { getEntirelyByName } from './user';

export const CyUsers = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    let result;
    switch (args[0]) {
        case 'entirely':
        case '전적':
            result = await getEntirelyByName(args[1]);
            break;
        default:
            result = 'wrong command';
    }
    await msg.channel.send(result);
};
