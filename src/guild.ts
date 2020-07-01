import { getConnection } from 'typeorm';
import { Guild } from 'discord.js';
import 'reflect-metadata';
export const deleteGuild = async (guild: Guild): Promise<void> => {
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from('server')
        .where('server.serverID = :serverID', {
            serverID: guild.id.toString(),
        })
        .execute();
};
export const registGuild = async (guild: Guild): Promise<void> => {
    const connection = getConnection();
    await connection
        .createQueryBuilder()
        .insert()
        .into('server')
        .values({
            serverId: guild.id.toString(),
            channel: null,
        })
        .execute()
        .catch(() => guild.leave());
};
