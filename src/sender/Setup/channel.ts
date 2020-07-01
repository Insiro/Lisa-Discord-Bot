import { getRepository } from 'typeorm';
import { Guild } from 'discord.js';
export const setResposeChannel = async (
    guild: Guild,
    channelID: string
): Promise<string> => {
    const channel = guild.channels.cache.get(channelID);
    if (channel === undefined) return 'failed to set respose Channel';
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ channel: channelID })
        .where('serverId = :gID', { gID: guild.id.toString() })
        .execute()
        .catch(() => {
            return 'failed to set respose Channel';
        });
    return 'changed respose Channel to ' + channel.name;
};
export const resetChannel = async (guild: Guild | null): Promise<string> => {
    if (guild == null) return 'Not in Server';
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ channel: null })
        .where('serverId = :gID', { gID: guild.id.toString() })
        .execute()
        .catch(() => {
            return 'failed to set respose Channel\nPlz rejoin Bot';
        });
    return 'success to reset';
};
