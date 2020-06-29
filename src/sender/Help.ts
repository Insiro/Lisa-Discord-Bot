
const commands: Array<string> = [
    '> 전적 <유저 이름> : 해당우저의 전적을 검색합니다',
    '> 매치 <매치 키> : 해당 게임의 정보를 가져옵니다.',
    '> 랭킹 <시작 순위> : 시작 순위부터 상위 10명을 보여줍니다',
];

const settingList: Array<string> = ['> 준비중 입니다.'];

export const help = (args: Array<String>): string => {
    if (args.length == 0)
        return commands.join('\n') + '\nclass 설정\n' + settingList.join('\n');
    switch (args[0]) {
        default:
            return '준비중';
    }
};

export default help;
