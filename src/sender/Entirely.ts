import { CyphersApiKey } from '../config';
import { CyApiLink, ParseError, parseErrorMsg } from '../utils/values';
import * as request from 'request-promise-native';

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
        return ParseError(error);
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

export const getEntirely = async (
    playerName: string,
    gameTypeId = 'rating'
): Promise<string> => {
    let gameType: string;
    if (gameTypeId === 'normal') gameType = '일반';
    else {
        gameTypeId = 'rating';
        gameType = '공식';
    }
    const playerID = await getPlayerID(playerName);
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
            '\t|\t최대RP\t' +
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
        return ParseError(error);
    }
};
