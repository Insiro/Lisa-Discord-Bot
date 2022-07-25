import { CommandInteraction, MessageEmbed } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandStringOption,
} from '@discordjs/builders';

function normalCommands(): MessageEmbed {
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('명령어')
        .setDescription(
            '기여 / 버그제보 : https://github.com/Insiro/Lisa-Discord-Bot'
        )
        .addField('명령어', '명령어들을 확인합니다.')
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
            '구독 <채널ID>',
            '신규 공지, 매거진 등을 해당 채널로 알람오게 합니다'
        )
        .addField('구독 취소', '알림 구독을 취소합니다')
        .addField(
            '클랜주소 <PageKey>',
            ' 클랜의 주소를 설정합니다.\ncyphers.nexon.com/cyphers/clan/<PageKey>'
        );
}
export const help = (interaction: CommandInteraction): MessageEmbed | null => {
    let embed: MessageEmbed | null;
    switch (interaction.options.getString('what')) {
        case 'setting':
        case '설정':
            embed = settingCommands();
            break;
        default:
            embed = normalCommands();
    }

    return embed;
};
const help_options = new SlashCommandStringOption()
    .setName('what')
    .setDescription('하위 설정')
    .setRequired(false)
    .setChoices(
        { name: '설정', value: 'setting' },
        { name: '전체', value: 'default' }
    );

export const help_command = new SlashCommandBuilder()
    .setName('help')
    .setDescription('help')
    .addStringOption(help_options);
export const how_command = new SlashCommandBuilder()
    .setName('명령어')
    .setDescription('명령어')
    .addStringOption(help_options);
