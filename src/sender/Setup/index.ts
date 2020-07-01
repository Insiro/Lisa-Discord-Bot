import { Message } from 'discord.js';
import { setRole } from './role';
import { setClan } from './clan';
import { setPrefix } from './prefix';
import { Server } from '../../entity/Server';
import { setChannel } from './channel';
import { getGuildInfo } from '../../utils/GuildInfo';
const hasPermission = async (msg: Message): Promise<boolean> => {
    const info: Server | null = await getGuildInfo(msg.guild);
    if (info === null && msg.member === null) return false;
    if (msg.member!.hasPermission('ADMINISTRATOR')) return true;
    if (info!.role !== null && msg.member!.roles.cache.has(info!.role!))
        return true;
    return false;
};

export const setup = async (
    msg: Message,
    args: Array<string>
): Promise<string> => {
    let outStr = "haven't permision";
    if (!(await hasPermission(msg))) return "haven't permission";
    switch (args[0]) {
        case '채널':
        case 'channel':
            outStr = await setChannel(msg.guild!, args[1]);
            break;
        case '클랜주소':
        case 'clanLink':
            outStr = await setClan(msg.guild!.id.toString(), args[1]);
            break;
        case 'role':
        case '역할':
            outStr = await setRole(msg.guild!, args.slice(1));
            break;
        default:
            outStr = 'Wrong Command';
    }
    return outStr;
};
export default setup;
