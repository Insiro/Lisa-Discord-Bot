import { CyphersApiKey } from '../config';
import { ParseError, CyApiLink } from '../values';
import * as request from 'request-promise-native';

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

export const getMatchInfo = async (matchKey: string): Promise<string> => {
    const options = {
        uri: CyApiLink + '/matches/' + matchKey,
        qs: {
            apikey: CyphersApiKey,
        },
    };
    try {
        const json = JSON.parse(await request.get(options));
        const outString: string = '시간 : ' + json.date;
        let win;
        if (json.teams[0].result === 'win') win = json.teams[0].players;
        else win = json.teams[1].players;
        let winstr = '';
        let losestr = '';
        for (const player in json.players) {
            const user = json.players[player];
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
        return ParseError(error);
    }
};
