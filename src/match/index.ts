import { Message } from 'discord.js';
import { CyApiLink, CyphersApiKey } from '../config';
import { parseErrorMsg, ParseError } from '../error';
import * as request from 'request-promise-native';
export const Match = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    let result = '현재 준비중입니다';
    switch (args[0]) {
        case '정보':
            if (args.length == 2) result = await matchInfo(args[1]);
            break;
        default:
    }
    msg.channel.send(result);
};

const matchInfo = async (matchKey: string): Promise<string> => {
    const options = {
        uri: CyApiLink + '/matches/' + matchKey,
        qs: {
            apikey: CyphersApiKey,
        },
    };
    try {
        const json = JSON.parse(await request.get(options));
        var outString: string = '시간 : ' + json.date;
        var win;
        if (json.teams[0].result == 'win') win = json.teams[0].players;
        else win = json.teams[1].players;
        var winstr: string = '';
        var losestr: string = '';
        for (var player in json.players) {
            var user = json.players[player];
            var playerInfo = user.playInfo;
            let playerString: string = '';
            playerString =
                '\n```' + user.nickname + '\t' + playerInfo.characterName;
            playerString +=
                '\n> ' +
                user.position.name +
                '  |  ' +
                user.position.attribute[0].name +
                '  |  ' +
                user.position.attribute[1].name +
                '  |  ' +
                user.position.attribute[2].name;

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
            var iswin = false;
            for (var winner in win) {
                if (win[winner] == user.playerId) {
                    iswin = true;
                    winstr += playerString;
                    break;
                }
            }
            if (!iswin) losestr += playerString;
        }
        outString += '\n> __승리 팀__ ' + winstr + '\n> __패배 팀__ ' + losestr;
        console.log(outString.length);
        return outString;
    } catch (error) {
        return ParseError(error);
    }
};
