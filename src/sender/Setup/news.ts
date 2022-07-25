import { CommandInteraction } from 'discord.js';
import { botServerRepository, getGuildInfo } from '../../utils/guild';
import { BotServer } from '../../entity/BotServer';
import {
    SlashCommandBooleanOption,
    SlashCommandChannelOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders';

export async function setSubscribeChannel(
    interaction: CommandInteraction
): Promise<string> {
    const server = await getGuildInfo(interaction.guild);
    if (server === null) return 'failed to set subscribe channel ';
    const options = interaction.options;
    if (options.getBoolean('cancel')) return cancelSubscribe(server);
    const channel = options.getChannel('channel');
    server.newsChannel = channel.id;
    await botServerRepository.save(server);
    return 'changed news subscribe Channel to ' + channel.name;
}
async function cancelSubscribe(server: BotServer): Promise<string> {
    server.newsChannel = null;
    await botServerRepository.save(server);
    return 'remove news subscribe channel';
}

export const setup_news = new SlashCommandSubcommandBuilder()
    .setName('구독')
    .setDescription('사이퍼즈 공지 구독')
    .addBooleanOption(
        new SlashCommandBooleanOption()
            .setName('cancel')
            .setDescription('취소')
            .setRequired(false)
    )
    .addChannelOption(
        new SlashCommandChannelOption()
            .setName('channel')
            .setDescription('뉴스 알림을 받을 채널')
            .setRequired(false)
    );
