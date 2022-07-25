import { CommandInteraction } from 'discord.js';
import * as request from 'request-promise-native';
import { CyphersApiKey } from '../config';
import { CyApiLink } from '../utils/values';
import {
    SlashCommandBuilder,
    SlashCommandIntegerOption,
} from '@discordjs/builders';

export const getRanking = async (
    interaction: CommandInteraction
): Promise<string> => {
    let offset = interaction.options.getInteger('offset', false);
    offset = !offset ? 0 : offset - 1;
    console.log(offset)
    const Options = {
        uri: CyApiLink + 'ranking/ratingpoint',
        qs: {
            apikey: CyphersApiKey,
            offset: offset,
        },
    };
    const list = JSON.parse(await request.get(Options))['rows'];
    let outString = '```markdown\n';
    for (const i in list) {
        const item = list[i];
        outString +=
            item['rank'] +
            '. ' +
            item['nickname'] +
            '\t' +
            item['ratingPoint'] +
            '\n';
    }
    outString += '```';
    return outString;
};
export const ranking_command = new SlashCommandBuilder()
    .setName('랭킹')
    .setDescription('offset 부터 상위 10명을 가져옵니다')
    .addIntegerOption(
        new SlashCommandIntegerOption()
            .setName('offset')
            .setDescription('시작 순위')
            .setRequired(false)
    );
