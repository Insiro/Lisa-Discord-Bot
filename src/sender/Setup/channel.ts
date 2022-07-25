import {
    CommandInteraction,
    CommandInteractionOption,
    Guild,
    TextChannel,
} from 'discord.js';
import { botServerRepository, getGuildInfo } from '../../utils/guild';
import {
    SlashCommandBooleanOption,
    SlashCommandChannelOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders';

const setResponseChannel = async (
    guild: Guild,
    channel: CommandInteractionOption['channel']
): Promise<string> => {
    if (!(channel instanceof TextChannel)) return '텍스트 체널을 지정해주세요';
    const server = await getGuildInfo(guild);
    if (server === null) return 'failed to set response Channel';
    server.channel = channel.id;
    await botServerRepository.save(server);
    return 'changed response Channel to ' + channel.name;
};
const resetChannel = async (guild: Guild): Promise<string> => {
    const server = await getGuildInfo(guild);
    if (server === null)
        return 'failed to set response Channel\nPlz rejoin Bot';
    server.channel = null;
    await botServerRepository.save(server);
    return 'success to reset';
};

export const setChannel = async (
    interaction: CommandInteraction
): Promise<string> => {
    const options = interaction.options;
    if (options.getBoolean('reset')) return resetChannel(interaction.guild);

    return await setResponseChannel(
        interaction.guild,
        options.getChannel('channel')
    );
};
export const setup_channel = new SlashCommandSubcommandBuilder()
    .setName('채널')
    .setDescription('채널')
    .addChannelOption(
        new SlashCommandChannelOption()
            .setName('channel')
            .setDescription('명령어에 응답할 채널')
            .setRequired(false)
    )
    .addBooleanOption(
        new SlashCommandBooleanOption()
            .setName('reset')
            .setDescription('초기화')
            .setRequired(false)
    );
