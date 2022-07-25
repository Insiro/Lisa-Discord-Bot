import { CommandInteraction } from 'discord.js';
import {
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import { botServerRepository, getGuildInfo } from '../../utils/guild';

export const setClan = async (
    interaction: CommandInteraction
): Promise<string> => {
    const server = await getGuildInfo(interaction.guild);
    if (server === null) return 'failed to set Clan Link';
    const page_key = interaction.options.getString('page_key');
    server.clan = page_key;
    await botServerRepository.save(server);
    return 'changed clan Link to ' + page_key;
};
export const setup_clan = new SlashCommandSubcommandBuilder()
    .setName('클랜')
    .setDescription('클랜 홈페이지 주소 설정')
    .addStringOption(
        new SlashCommandStringOption()
            .setName('page_key')
            .setDescription(
                '홈페이지 주소 키 : cyphers.nexon.com/cyphers/clan/<PageKey>'
            )
            .setRequired(true)
    );
