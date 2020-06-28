import { Message } from 'discord.js';
const userList: Array<string> = [
    '> 전적 <유저 이름> 해당우저의 전적을 검색합니다',
    '> 전적 키 <유저 key> 유저의 key로 전적을 검색합니다',
    '> key <유저 이름> 유저의 key를 검색합니다',
];
const otherList: Array<string> = [
    '> 랭킹 <시작 순위> : 시작 순위부터 상위 10명을 보여줍니다',
];
const settingList: Array<string> = ['준비중 입니다.'];
const commands: string =
    'class 유저\n ' +
    userList.join('\n ') +
    '\n\nclass 설정\n' +
    settingList.join('\n') +
    '\n\n기타\n' +
    otherList.join('\n');
export const help = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    if (args.length === 0) {
        await msg.channel.send(commands);
        return;
    }
};

export default help;
