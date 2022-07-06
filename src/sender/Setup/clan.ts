import { botServerRepository, getGuildInfo } from '../../utils/guild';
import { Guild } from 'discord.js';

export const setClan = async (
    guild: Guild,
    newClanLink: string
): Promise<string> => {
    const server = await getGuildInfo(guild);
    if (server === null) return 'failed to set Clan Link';
    server.clan = newClanLink;
    await botServerRepository.save(server);
    return 'changed clan Link to ' + newClanLink;
};
