import axios from 'axios';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import * as cheerio from 'cheerio';

import { BotServer } from '../entity/BotServer';
import { getGuildInfoStr } from '../utils/guild';

const getClanLink = async (
    guildID: string,
    isNaver: boolean
): Promise<string | null> => {
    const server: BotServer | null = await getGuildInfoStr(guildID);
    if (server === null || server.clan === null || server.clan === undefined)
        return null;
    const host = isNaver
        ? 'https://cyphers.playnetwork.co.kr/'
        : 'https://cyphers.nexon.com/';
    return host + 'cyphers/clan/' + server.clan;
};

const clan_home_subCommand = new SlashCommandSubcommandBuilder()
    .setName('홈피')
    .setDescription("클랜 홈페이지 링크를 생성합니다")
    .addStringOption(
        new SlashCommandStringOption()
            .setRequired(false)
            .addChoices(
                { name: '네이버', value: 'naver' },
                { name: '넥슨', value: 'nexon' }
            )
            .setName('퍼블리셔')
            .setDescription('퍼블리셔 (기본값 넥슨)')
    );
const getClanSite = async (
    guildID: string,
    publisher: string | null
): Promise<string | MessageEmbed> => {
    const isNaver = publisher == '네이버' || publisher == 'naver';
    const clan = await getClanLink(guildID, isNaver);
    return clan === null || clan === undefined
        ? 'not set Clan Link yet'
        : new MessageEmbed()
              .setTitle('클랜 홈페이지')
              .setURL(clan)
              .setDescription(isNaver ? 'naver publish' : 'nexon publish');
};

const accessing_subcommand = new SlashCommandSubcommandBuilder()
    .setName('접속자')
    .setDescription('접속중인 클랜원 목록');

const playingMember = async (guidID: string): Promise<string> => {
    const clanUri = await getClanLink(guidID, false);
    if (clanUri === null || clanUri === undefined)
        return 'not set Clan Link yet';
    const re = await axios.get(clanUri);
    const html = cheerio.load(re.data);
    const memberList = html('.member_list > p')
        .text()
        .split(' ')
        .join('')
        .split('\n')
        .join('')
        .trim()
        .split(',');
    if (
        memberList.length === 0 ||
        (memberList.length === 1 && memberList[0] === '')
    ) {
        return '```nobody playing game, right now```';
    }
    return '```+\n' + memberList.join('\n') + '```';
};

export const clanController = async (
    interaction: CommandInteraction
): Promise<string | MessageEmbed> => {
    let result: string | MessageEmbed;
    if (!interaction.inGuild()) return '서버 에서만 가능합니다.';
    return '홈페이지 리뉴얼로 사용이 불가합니다';
    switch (interaction.options.getSubcommand()) {
        case '접속자':
        case 'players':
            result = await playingMember(interaction.guild.id.toString());
            break;
        case '홈피':
        case 'site':
            result = await getClanSite(
                interaction.guild.id.toString(),
                interaction.options.getString('publisher')
            );
            break;
        default:
            result = 'wrong command';
    }
    return result;
};

export const clan_command = new SlashCommandBuilder()
    .setName('클랜')
    .setDescription('clan')
    .addSubcommand(accessing_subcommand)
    .addSubcommand(clan_home_subCommand);
