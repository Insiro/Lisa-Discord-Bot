import { getRepository } from 'typeorm';
import { Message } from 'discord.js';

export const changePrefix = (newPrefix: string): void => {
    return;
};

export const setResposeRole = async (
    guildID: string,
    role: string
): Promise<string> => {
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ role: role })
        .where('serverId = :gID', { gID: guildID.toString() })
        .execute()
        .catch(() => {
            return 'failed to set respose Role';
        });
    return 'changed respose Role to';
};

export const setResposeChannel = async (
    guildID: string,
    channelID: string
): Promise<string> => {
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ channel: channelID })
        .where('serverId = :gID', { gID: guildID.toString() })
        .execute()
        .catch(() => {
            return 'failed to set respose Channel';
        });
    return 'changed respose Channel to';
};
export const setClanLink = async (
    guildID: string,
    newClanLink: string
): Promise<string> => {
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ clan: newClanLink })
        .where('serverId = :gID', { gID: guildID.toString() })
        .execute()
        .catch(() => {
            return 'failed to set Clan Link';
        });
    return 'changed clan Link to ' + newClanLink;
};
export const setup = async (
    msg: Message,
    args: Array<string>
): Promise<string> => {
    var outStr: string = 'will be support';
    if (msg.guild === null) outStr = 'not in Server';
    switch (args[0]) {
        case '채널':
            break;
        case '클랜주소':
            outStr = await setClanLink(msg.guild!.id.toString(), args[1]);
            break;
        default:
            outStr = 'Wrong Command';
    }
    return outStr;
};
