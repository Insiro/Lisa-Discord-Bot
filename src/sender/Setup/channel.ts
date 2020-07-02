import { getRepository } from 'typeorm';
import { Guild } from 'discord.js';

const setResposeChannel = async (
    guild: Guild,
    channelID: string
): Promise<string> => {
    const channel = guild.channels.cache.get(channelID);
    if (channel === undefined || channel === null)
        return 'failed to find Channel';
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
const resetChannel = async (guildID: string | null): Promise<string> => {
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ channel: null })
        .where('serverId = :gID', { gID: guildID })
        .execute()
        .catch(() => {
            return 'failed to set respose Channel\nPlz rejoin Bot';
        });
    return 'success to reset';
};

export const setChannel = async (
    guild: Guild,
    subCommand: string
): Promise<string> => {
    if (guild === null || guild === undefined) return 'Not in Server';
    switch (subCommand) {
        case '초기화':
        case 'reset':
        case null:
        case '':
            return resetChannel(guild.id.toString());
        default:
            return setResposeChannel(guild, subCommand);
    }
};
