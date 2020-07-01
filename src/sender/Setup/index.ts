import { Message } from 'discord.js';
import { setRole } from './role';
import { setClan } from './clan';
import { setPrefix } from './prefix';
export const setup = async (
    msg: Message,
    args: Array<string>
): Promise<string> => {
    let outStr = 'will be support';
    if (msg.guild === null) outStr = 'not in Server';

    switch (args[0]) {
        case '채널':
        case 'channel':
            break;
        case '클랜주소':
        case 'clanLink':
            outStr = await setClan(msg.guild!.id.toString(), args[1]);
            break;
        default:
            outStr = 'Wrong Command';
    }
    return outStr;
};
export default setup;
