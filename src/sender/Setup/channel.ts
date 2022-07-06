import { Guild } from 'discord.js';
import { botServerRepository, getGuildInfo } from '../../utils/guild';
import { prefix } from '../../config';

const setResposeChannel = async (
    guild: Guild,
    channelID: string
): Promise<string> => {
    const channel = guild.channels.cache.get(channelID);
    if (channel === undefined || channel === null)
        return 'failed to find Channel';
    const server = await getGuildInfo(guild);
    if (server === null) return 'failed to set respose Channel';
    server.channel = channelID;
    await botServerRepository.save(server);
    return 'changed respose Channel to ' + channel.name;
};
const resetChannel = async (guild: Guild): Promise<string> => {
    const server = await getGuildInfo(guild);
    if (server === null) return 'failed to set respose Channel\nPlz rejoin Bot';
    server.channel = undefined;
    server.clan = undefined;
    server.role = undefined;
    server.prefix = prefix;
    await botServerRepository.save(server);
    return 'success to reset';
};

export const setChannel = async (
    guild: Guild,
    subCommand: string
): Promise<string> => {
    switch (subCommand) {
        case '초기화':
        case 'reset':
        case null:
        case '':
            return resetChannel(guild);
        default:
            return setResposeChannel(guild, subCommand);
    }
};
