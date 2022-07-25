import { CommandInteraction, MessageEmbed } from 'discord.js';
import { getRecords, record_command } from './Record';
import { getMatchInfo } from './Match';
import { help } from './Help';
import { getRanking, ranking_command } from './Ranking';
import { setup } from './Setup';
import { clan_command, clanController } from './Clan';
import { BotServer } from '../entity/BotServer';
import { getGuildInfo } from '../utils/guild';

const normalCommander = async (
    interaction: CommandInteraction
): Promise<string | MessageEmbed> => {
    // const info: BotServer | null = await getGuildInfo(interaction.guild);
    // if (
    //     info !== null &&
    //     info.channel !== null &&
    //     info.channel !== undefined &&
    //     interaction.channelId !== info.channel
    // )
    //     return;

    let sendString: string | MessageEmbed;
    switch (interaction.commandName) {
        case '전적':
        case 'record':
            sendString = await getRecords(interaction);
            break;
        case '매치':
        case 'match':
            // sendString = await getMatchInfo(parsed.arguments[0]);
            break;
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
    let sendString: string | MessageEmbed;
    console.log(interaction.commandName)
    switch (interaction.commandName) {
        case '설정':
            // sendString = await setup(interaction.options);
            break;
        case 'help':
        case '도움말':
        case '명령어':
            // sendString = help(parsed.arguments);
            break;
        default:
            sendString = await normalCommander(interaction);
    }
    if (sendString instanceof MessageEmbed)
        interaction.reply({ embeds: [sendString] });
    else interaction.reply(sendString);
};
export const commands = [clan_command, record_command, ranking_command];
