import { CyphersApiKey, CyApiLink } from '../config';
import { ParseError, parseErrorMsg } from '../error';
import * as request from 'request-promise-native';

const apiLink: string = CyApiLink + 'players/';

export const getPlayerID = async (playerName: string): Promise<string> => {
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

export const getRecent = (): string => {
    return '';
};

export const getEntirely = async (
    playerName: string,
    gameTypeId = 'rating'
): Promise<string> => {
    const playerID = await getPlayerID(playerName);
    if (playerID === parseErrorMsg) return parseErrorMsg;
    const options = {
        uri: apiLink + playerID + '/matches',
        qs: {
            gameTypeId: gameTypeId,
            apikey: CyphersApiKey,
        },
    };
    try {
        const result: string = await request.get(options);
        const json = JSON.parse(result);
        const record = json['records'];
        const sRecord =
            '- 공식  |  ' +
            record[0]['winCount'] +
            '승  |  ' +
            record[0]['loseCount'] +
            '패\n' +
            '- 일반  |  ' +
            record[1]['winCount'] +
            '승  |  ' +
            record[1]['loseCount'] +
            '패\n';

        const matches = json['matches']['rows'];
        let matchString = '';
        for (const i in matches) {
            const item = matches[i];
            matchString +=
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
        const outstring: string =
            '```markdown\n' +
            json['nickname'] +
            '\t|\t' +
            json['tierName'] +
            '\t|\t최대RP\t' +
            json['maxRatingPoint'] +
            '\n------------------------\n' +
            sRecord +
            '\n------------------------\n' +
            matchString +
            '```';
        return outstring;
    } catch (error) {
        return ParseError(error);
    }
};
