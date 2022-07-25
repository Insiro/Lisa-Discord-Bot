import { CommandInteraction } from 'discord.js';
import {
    SlashCommandBooleanOption,
    SlashCommandRoleOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import { botServerRepository, getGuildInfo } from '../../utils/guild';

export const setRole = async (
    interaction: CommandInteraction
): Promise<string> => {
    const server = await getGuildInfo(interaction.guild);
    if (server === null) return 'failed to set Clan Link';
    const options = interaction.options;
    if (options.getBoolean('reset')) {
        server.role = null;
        await botServerRepository.save(server);
        return '역할설정 초기화 되었습니다.';
    }
    const role = options.getRole('role');
    server.role = role.id;
    await botServerRepository.save(server);
    return `관리권한 역할이 ${role.name} 으로 설정되었습니다`;
};

export const setup_role = new SlashCommandSubcommandBuilder()
    .setName('역할')
    .setDescription('역할')
    .addBooleanOption(
        new SlashCommandBooleanOption()
            .setName('reset')
            .setDescription('초기화')
            .setRequired(false)
    )
    .addRoleOption(
        new SlashCommandRoleOption()
            .setName('role')
            .setDescription('설정 권한자')
            .setRequired(false)
    );
