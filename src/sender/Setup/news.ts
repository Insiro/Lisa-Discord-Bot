import { Guild } from 'discord.js';
import { getGuildInfo } from '../../utils/guild';

export async function setSubscribeChannel(
    guild: Guild,
    channelID: string
): Promise<string> {
    const server = await getGuildInfo(guild);
    if (server === null) {
        return 'failed to set subscribe channel ';
    }
    if (channelID === '취소' || channelID === undefined || channelID === null) {
        server.newsChannel = null;
        await server.save();
        return 'remove news subscribe channel';
    }
    const channel = guild.channels.cache.get(channelID);
    if (channel === undefined || channel === null)
        return 'failed to find Channel';
    else server.newsChannel = channelID;
    await server.save();
    return 'changed news subscribe Channel to ' + channel.name;
}
