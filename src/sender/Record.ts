import * as request from 'request-promise-native';
import {
    SlashCommandBuilder,
    SlashCommandStringOption,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { CyphersApiKey } from '../config';
import { CyApiLink, ParseError, parseErrorMsg } from '../utils/values';
const apiLink: string = CyApiLink + 'players/';

const getPlayerID = async (playerName: string): Promise<string> => {
    const options = {
        uri: apiLink,
        qs: {
            apikey: CyphersApiKey,
            nickname: playerName,
        },
    };
    try {
        return JSON.parse(await request.get(options)).rows[0].playerId;
    } catch (error) {
        return ParseError(error as Error);
    }
};

const recordStr = (recordJson: any): string => {
    const winRate =
        (parseInt(recordJson[0]['winCount']) * 100) /
        (parseInt(recordJson[0]['winCount']) +
            parseInt(recordJson[0]['loseCount']));
    return (
        '- 공식  |  ' +
        recordJson[0]['winCount'] +
        '승  |  ' +
        recordJson[0]['loseCount'] +
        '패  |  ' +
        winRate.toFixed(1).toString() +
        '%\n' +
        '- 일반  |  ' +
        recordJson[1]['winCount'] +
        '승  |  ' +
        recordJson[1]['loseCount'] +
        '패\n'
    );
};

const matchStr = (matchJson: any): string => {
    let result = '';
    for (const i in matchJson) {
        const item = matchJson[i];
        result +=
            '* ' +
            item['playInfo']['result'] +
            '\t' +
            item['playInfo']['characterName'] +
            '\t' +
            item['position']['name'] +
            '\n ' +
            item['matchId'] +
            '\n';
    }
    return result;
};

export const getRecords = async (
    interaction: CommandInteraction
): Promise<string> => {
    const options = interaction.options;
    let gameTypeId = 'rating';
    let gameType = '공식';
    const game_mode = options.getString('gamemode');
    if (game_mode === 'normal' || game_mode === '일반') {
        gameType = '일반';
        gameTypeId = 'normal';
    }
    const user_name = options.getString('username');
    const playerID = await getPlayerID(user_name);
    if (playerID === parseErrorMsg) return parseErrorMsg;
    try {
        const options = {
            uri: apiLink + playerID + '/matches',
            qs: {
                gameTypeId: gameTypeId,
                apikey: CyphersApiKey,
            },
        };
        const result: string = await request.get(options);
        const json = JSON.parse(result);
        return (
            '```' +
            json['nickname'] +
            '\t|\t' +
            json['tierName'] +
            '\t|\t최대 RP\t' +
            json['maxRatingPoint'] +
            '```\n```' +
            recordStr(json['records']) +
            '\n```\n```최근 ' +
            gameType +
            ' 전적\n' +
            matchStr(json['matches']['rows']) +
            '```'
        );
    } catch (error) {
        return ParseError(error as Error);
    }
};

export const record_command = new SlashCommandBuilder()
    .setDescription('전적')
    .setName('전적')
    .setNameLocalizations({ ko: '전적' })
    .addStringOption(
        new SlashCommandStringOption()
            .setName('username')
            .setNameLocalizations({ ko: '유저이름' })
            .setDescription('유저이름')
            .setRequired(true)
    )
    .addStringOption(
        new SlashCommandStringOption()
            .setName('gamemode')
            .setDescription('게임모드 (기본값 공식)')
            .setRequired(false)
            .addChoices(
                { name: '공식', value: 'rating' },
                { name: '일반', value: 'normal' }
            )
    );
