import { CommandInteraction, GuildMember, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { setRole, setup_role } from './role';
import { setClan, setup_clan } from './clan';
import { setSubscribeChannel, setup_news } from './news';
import { setChannel, setup_channel } from './channel';
import { resetServer, reset_command } from './reset';

import { BotServer } from '../../entity/BotServer';
import { getGuildInfo } from '../../utils/guild';

const hasPermission = async (interaction: Interaction): Promise<boolean> => {
    const info: BotServer | null = await getGuildInfo(interaction.guild);
    if (info == null) return false;
    const member = interaction.member as GuildMember;
    if (member.permissions.has('ADMINISTRATOR')) return true;
    if (info.role === null || info.role === undefined) return false;
    return member.roles.cache.has(info.role);
};

export const setup = async (
    interaction: CommandInteraction
): Promise<string> => {
    if (!interaction.inGuild()) return '서버에서만 가능합니다';
    if (!(await hasPermission(interaction))) return "haven't permission";
    let outStr: string;
    switch (interaction.options.getSubcommand()) {
        case '채널':
            outStr = await setChannel(interaction);
            break;
        case '클랜':
            outStr = await setClan(interaction);
            break;
        case '역할':
            outStr = await setRole(interaction);
            break;
        case '구독':
            outStr = await setSubscribeChannel(interaction);
            break;
        case '초기화':
            outStr = await resetServer(interaction);
            break;
        default:
            outStr = 'Wrong Command';
    }
    return outStr;
};

export const setup_command = new SlashCommandBuilder()
    .setName('설정')
    .setDescription('설정')
    .addSubcommand(setup_channel)
    .addSubcommand(setup_role)
    .addSubcommand(setup_clan)
    .addSubcommand(reset_command)
    .addSubcommand(setup_news);
