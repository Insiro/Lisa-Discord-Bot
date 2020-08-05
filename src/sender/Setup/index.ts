import { Message } from 'discord.js';
import { setRole } from './role';
import { setClan } from './clan';
import { setSubscribeChannel} from './news';
import { setPrefix } from './prefix';
import { BotServer } from '../../entity/BotServer';
import { setChannel } from './channel';
import { getGuildInfo } from '../../utils/guild';
const hasPermission = async (msg: Message): Promise<boolean> => {
    const info: BotServer | null = await getGuildInfo(msg.guild);
    if (
        info !== null &&
        msg.member !== undefined &&
        msg.member !== null &&
        (msg.member.hasPermission('ADMINISTRATOR') ||
            (info.role !== null &&
                info.role !== undefined &&
                msg.member.roles.cache.has(info.role)))
    )
        return true;
    return false;
};

export const setup = async (
    msg: Message,
    args: Array<string>
): Promise<string> => {
    if (msg.guild === null) return '서버에서만 가능합니다';
    let outStr = "haven't permision";
    if (!(await hasPermission(msg))) return "haven't permission";
    switch (args[0]) {
        case '채널':
            outStr = await setChannel(msg.guild, args[1]);
            break;
        case '클랜주소':
            outStr = await setClan(msg.guild, args[1]);
            break;
        case '역할':
            outStr = await setRole(msg.guild, args.slice(1));
            break;
        case '구독':
            outStr = await setSubscribeChannel(msg.guild, args[1]);
            break;
        default:
            outStr = 'Wrong Command';
    }
    return outStr;
};
export default setup;
