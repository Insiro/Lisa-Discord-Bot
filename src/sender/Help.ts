import { MessageEmbed } from 'discord.js';

function noramlCommands(): MessageEmbed {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('명령어')
        .setAuthor('Insiro', 'https://github.com/Insiro/cyphers-Discord-Bot')
        .addField('명령어 / 도움말', '명령어들을 확인합니다.')
        .addField(
            '전적 <유저 이름> <공식 / 일반>',
            '해당유저의 전적을 검색합니다'
        )
        .addField('매치 <매치 키>', '해당 게임의 정보를 가져옵니다.')
        .addField('랭킹 <시작 순위>', '시작 순위부터 상위 10명을 가져옵니다.')
        .addField('클랜 접속자', '현재 접속중인 클랜원을 보여줍니다')
        .addField('클랜 홈피', '클랜 홈페이지의 주소를 보여줍니다')
        .addField(
            '클랜 홈피 네이버',
            '클랜 홈페이지의 네이버 퍼블리쉬 주소를 보여줍니다.'
        )
        .addField(
            '설정 <하위 명령어>',
            '설정을 합니다. 하위명령여는 !!도움말 설정 에서 보실수 있습니다.'
        );
    return embed;
}
function settingCommands(): MessageEmbed {
    return new MessageEmbed()
        .setTitle('설정 명령어')
        .setColor('#0099ff')
        .addField(
            '열할 <열할 이름>',
            '봇의 설정을 허용할 역할을 1개 설정합니다'
        )
        .addField('채널 <채널ID>', '봇의 반응을 허용할 채널을 설정합니다')
        .addField('채널 초기화 ', ' 반응 허용할 채널을 초기화 합니다')
        .addField(
            '클랜주소 <PageKey>',
            ' 클랜의 주소를 설정합니다.\ncyphers.nexon.com/cyphers/clan/<PageKey>'
        );
}
export const help = (args: Array<string>): MessageEmbed | null => {
    let embed: MessageEmbed | null = null;
    switch (args[0]) {
        case null:
        case undefined:
            embed = noramlCommands();
            break;
        case 'setting':
        case '설정':
            embed = settingCommands();
            break;
    }

    return embed;
};

export default help;
