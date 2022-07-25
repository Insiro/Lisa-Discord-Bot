import { CommandInteraction, MessageEmbed } from 'discord.js';
import { getRecords, record_command } from './Record';
import { getMatchInfo, match_command } from './Match';
import { help, help_command, how_command } from './Help';
import { getRanking, ranking_command } from './Ranking';
import { setup, setup_command } from './Setup';
import { clanController, clan_command } from './Clan';
import { BotServer } from '../entity/BotServer';
import { getGuildInfo } from '../utils/guild';

const normalCommander = async (
    interaction: CommandInteraction
): Promise<string | MessageEmbed | null> => {
    const info: BotServer | null = await getGuildInfo(interaction.guild);
    if (
        info !== null &&
        info.channel !== null &&
        info.channel !== undefined &&
        interaction.channelId !== info.channel
    )
        return;

    let sendString: string | MessageEmbed;
    switch (interaction.commandName) {
        case '전적':
        case 'record':
            sendString = await getRecords(interaction);
            break;
        case '매칭':
        case 'match':
            sendString = await getMatchInfo(interaction);
            break;
        case '클랜':
        case 'clan':
            sendString = await clanController(interaction);
            break;
        case '랭킹':
        case 'ranking':
            sendString = await getRanking(interaction);
            break;
        default:
            return;
    }
    return sendString;
};

export const sender = async (
    interaction: CommandInteraction
): Promise<void> => {
    let sendString: string | MessageEmbed | null;
    switch (interaction.commandName) {
        case '설정':
            sendString = await setup(interaction);
            break;
        case 'help':
        case '명령어':
            sendString = help(interaction);
            break;
        default:
            sendString = await normalCommander(interaction);
    }
    if (sendString == null) return;
    if (sendString instanceof MessageEmbed)
        interaction.reply({ embeds: [sendString] });
    else interaction.reply(sendString);
};
export const commands = [
    clan_command,
    record_command,
    ranking_command,
    match_command,
    help_command,
    how_command,
    setup_command,
];
