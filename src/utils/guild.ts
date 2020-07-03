import { BotServer } from '../entity/BotServer';
import { Guild } from 'discord.js';
import 'reflect-metadata';

export const deleteGuild = async (guild: Guild): Promise<void> => {
    const server: BotServer | undefined = await BotServer.findOne({
        serverId: guild.id.toString(),
    });
    server?.remove();
};

const registGuildStr = async (guildID: string): Promise<boolean> => {
    try {
        const server = new BotServer();
        server.serverId = guildID;
        await server.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const registGuild = async (guild: Guild): Promise<void> => {
    const result = await registGuildStr(guild.id.toString());
    if (result === false) {
        guild.systemChannel?.send('faild to regist server');
        guild.leave();
    }
};

export const getGuildInfoStr = async (
    guildID: string
): Promise<BotServer | null> => {
    if (guildID === undefined || guildID === '') return null;
    let server: BotServer | undefined = await BotServer.findOne({
        serverId: guildID,
    });
    if (server === undefined) {
        registGuildStr(guildID);
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
