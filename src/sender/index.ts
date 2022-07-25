import { getEntirely } from './Entirely';
import { getMatchInfo } from './Match';
import { help } from './Help';
import {
    CommandInteraction,
    MessageEmbed,
} from 'discord.js';
import { parse, SuccessfulParsedMessage } from 'discord-command-parser';
import { getRanking } from './Ranking';
import { setup } from './Setup';
import { clanController } from './Clan';
import { BotServer } from '../entity/BotServer';
import { getGuildInfo } from '../utils/guild';
import { prefix } from '../config';
const normalCommander = async (
    interaction: CommandInteraction
): Promise<void> => {
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
            // sendString = await getEntirely(parsed.arguments);
            break;
        case '매치':
        case 'match':
            // sendString = await getMatchInfo(parsed.arguments[0]);
            break;
        case 'clan':
            // sendString = await clanController(interaction);
            break;
        case '랭킹':
        case 'ranking':
            // sendString = await getRanking(interaction);
            break;
        default:
            return;
    }
    const msg =(sendString instanceof MessageEmbed)?  { embeds: [sendString] }: sendString
    interaction.reply(msg);
};

export const sender = async (
    interaction: CommandInteraction
): Promise<void> => {
    let sendString: string | MessageEmbed | null;
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
            await normalCommander(interaction);
    }
    // if (sendString instanceof MessageEmbed) msg.channel.send({ embeds:[sendString] })
    // else if (sendString !== null) msg.channel.send(sendString);
};
