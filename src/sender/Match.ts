import axios from 'axios';
import {
    SlashCommandBuilder,
    SlashCommandStringOption,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { CyphersApiKey } from '../config';
import { ParseError, CyApiLink } from '../utils/values';

const getPlayerStr = (userJson: any): string => {
    const playerInfo = userJson.playInfo;
    let playerString =
        '\n```' + userJson.nickname + '\t' + playerInfo.characterName;
    //position info
    playerString +=
        '\n> ' +
        userJson.position.name +
        '  |  ' +
        userJson.position.attribute[0].name +
        '  |  ' +
        userJson.position.attribute[1].name +
        '  |  ' +
        userJson.position.attribute[2].name;

    playerString +=
        '\n> lv.' +
        playerInfo.level +
        '  |  ' +
        playerInfo.killCount +
        ' 킬 |  ' +
        (parseInt(playerInfo.attackPoint) / 1000).toFixed(1) +
        'k  |  ' +
        playerInfo.assistCount +
        ' 어시  |  ' +
        playerInfo.deathCount +
        '데스  |  ' +
        (parseInt(playerInfo.damagePoint) / 1000).toFixed(1) +
        'k```';
    return playerString;
};

export const getMatchInfo = async (
    interaction: CommandInteraction
): Promise<string> => {
    const matchKey = interaction.options.getString('matching_id');
    try {
        const response = await axios.get(CyApiLink + '/matches/' + matchKey, {
            params: { apikey: CyphersApiKey },
        });
        const result = response.data;
        const outString: string = '시간 : ' + result.date;
        let win;
        if (result.teams[0].result === 'win') win = result.teams[0].players;
        else win = result.teams[1].players;
        let winstr = '';
        let losestr = '';
        for (const player in result.players) {
            const user = result.players[player];
            let iswin = false;
            for (const winner in win) {
                if (win[winner] === user.playerId) {
                    iswin = true;
                    winstr += getPlayerStr(user);
                    break;
                }
            }
            if (!iswin) losestr += getPlayerStr(user);
        }
        return (
            outString +
            '\n> __승리 팀__ ' +
            winstr +
            '\n> __패배 팀__ ' +
            losestr
        );
    } catch (error) {
        return ParseError(error as Error);
    }
};
export const match_command = new SlashCommandBuilder()
    .setName('매칭')
    .setDescription('매칭정보를 조회합니다.')
    .addStringOption(
        new SlashCommandStringOption()
            .setName('matching_id')
            .setDescription('해당 메칭의 id')
            .setRequired(true)
    );
