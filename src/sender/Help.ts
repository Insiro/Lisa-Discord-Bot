const commands: Array<string> = [
    '> 전적 <유저 이름> : 해당유저의 전적을 검색합니다',
    '> 매치 <매치 키> : 해당 게임의 정보를 가져옵니다.',
    '> 랭킹 <시작 순위> : 시작 순위부터 상위 10명을 보여줍니다',
    '> 클랜 접속자 : 현재 접속중인 클랜원을 보여줍니다',
    '> 클랜 홈피 : 클랜 홈페이지의 주소를 보여줍니다.',
    '> 클랜 홈피 <네이버> : 클랜 홈페이지의 네이버 퍼블리쉬 주소를 보여줍니다.',
];

const settingList: Array<string> = [
    '> 열할 <열할 이름> : 봇의 설정을 허용할 역할을 1개 설정합니다',
    '> 채널 <채널ID> : 봇의 반응을 허용할 채널을 설정합니다',
    '> 채널 초기화 : 반응 허용할 채널을 초기화 합니다',
    '> 클랜주소 <PageKey>: 클랜의 주소를 설정합니다',
    '> > cyphers.nexon.com/cyphers/clan/<PageKey>',
];

export const help = (args: Array<string>): string => {
    return (
        commands.join('\n') + '\n설정 <subCommand>\n' + settingList.join('\n')
    );
};

export default help;
