import { Guild } from 'discord.js';
import { botServerRepository, getGuildInfo } from '../../utils/guild';
import { BotServer } from '../../entity/BotServer';

export async function setSubscribeChannel(
    guild: Guild,
    channelID: string
): Promise<string> {
    const server = await getGuildInfo(guild);
    if (server === null)
        return 'failed to set subscribe channel ';
    if (channelID === '취소' || channelID === undefined || channelID === null)
        return cancelSubscribe(server)
    const channel = guild.channels.cache.get(channelID);
    if (channel === undefined || channel === null)
        return 'failed to find Channel';
    server.newsChannel = channelID;
    await botServerRepository.save(server);
    return 'changed news subscribe Channel to ' + channel.name;
}
async function cancelSubscribe(server:BotServer):Promise<string>{
    server.newsChannel = null;
    await botServerRepository.save( server);
    return 'remove news subscribe channel';
}
