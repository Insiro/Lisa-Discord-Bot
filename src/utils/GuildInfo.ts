import { Server } from '../entity/Server';
import { Guild } from 'discord.js';
import { getRepository } from 'typeorm';

export const getGuildInfo = async (
    guild: Guild | null
): Promise<Server | null> => {
    if (guild === null) return null;
    return (await getRepository('server')
        .createQueryBuilder()
        .where('serverId =:sID', { sID: guild.id.toString() })
        .getOne()) as Server;
};
