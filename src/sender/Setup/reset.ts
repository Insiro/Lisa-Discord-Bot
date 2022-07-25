import { CommandInteraction } from 'discord.js';
import { SlashCommandBooleanOption, SlashCommandSubcommandBuilder } from '@discordjs/builders';
import { botServerRepository, getGuildInfo } from '../../utils/guild';

export const resetServer = async (
    interaction: CommandInteraction
): Promise<string> => {
    if (!interaction.options.getBoolean('check'))
        return '초기화를 취소하였습니다';
    const server = await getGuildInfo(interaction.guild);
    server.channel = null;
    server.role = null;
    server.clan = null;
    server.newsChannel = null;
    await botServerRepository.save(server);
    return 'success to reset';
};
export const reset_command = new SlashCommandSubcommandBuilder()
    .setName('초기화')
    .setDescription('서버 초기화')
    .addBooleanOption(
        new SlashCommandBooleanOption()
            .setName('check')
            .setDescription('정말로 초기화 하시겠습니까?')
            .setRequired(true)
    );
