import { BotServer } from '../entity/BotServer';
import AppDataSource from '../data-sources';
import { Guild } from 'discord.js';
import 'reflect-metadata';

export const botServerRepository = AppDataSource.getRepository(BotServer);
export const deleteGuild = async (guild: Guild): Promise<void> => {
    const server: BotServer | undefined = await botServerRepository.findOne({
        where: { serverId: guild.id.toString() },
    });
    await botServerRepository.remove(server);
};

const registerGuildStr = async (guildID: string): Promise<boolean> => {
    try {
        const server = new BotServer();
        server.serverId = guildID;
        await botServerRepository.insert(server);
        return true;
    } catch {
        return false;
    }
};

export const registerGuild = async (guild: Guild): Promise<void> => {
    const result = await registerGuildStr(guild.id.toString());
    if (result === false) {
        guild.systemChannel?.send('failed to register server');
        guild.leave();
    }
};

export const getGuildInfoStr = async (
    guildID: string
): Promise<BotServer | null> => {
    if (guildID === undefined || guildID === '') return null;
    let server: BotServer | null = await botServerRepository.findOne({
        where: { serverId: guildID },
    });
    if (server === null) {
        registerGuildStr(guildID);
        server = new BotServer();
    }
    server.serverId = guildID;
    return server;
};
export const getGuildInfo = async (
    guild: Guild | null
): Promise<BotServer | null> => {
    if (guild === null || guild === undefined) return null;
    return getGuildInfoStr(guild.id.toString());
};
