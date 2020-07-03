import { BotServer } from '../entity/BotServer';
import { Guild } from 'discord.js';
import { getRepository, getConnection } from 'typeorm';
import { prefix } from '../config';
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
const registGuild_s = async (guildID: string): Promise<boolean> => {
    try {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into('server')
            .values({
                serverId: guildID,
                channel: null,
                prefix: prefix,
            })
            .execute();
        return true;
    } catch {
        return false;
    }
};

export const registGuild = async (guild: Guild): Promise<void> => {
    const result = await registGuild_s(guild.id.toString());
    if (result === false) {
        guild.systemChannel?.send('faild to regist server');
        guild.leave();
    }
};

export const getGuildInfo_s = async (
    guildID: string
): Promise<BotServer | null> => {
    if (guildID === undefined || guildID === '') return null;
    let server: BotServer | null | undefined = (await getRepository('server')
        .createQueryBuilder()
        .where('serverId =:sID', { sID: guildID })
        .getOne()) as BotServer;
    if (server === undefined || server === null) {
        registGuild_s(guildID);
        server = new BotServer();
        server.serverId = guildID;
    }
    return server;
};
export const getGuildInfo = async (
    guild: Guild | null
): Promise<BotServer | null> => {
    if (guild === null || guild === undefined) return null;
    return getGuildInfo_s(guild.id.toString());
};
