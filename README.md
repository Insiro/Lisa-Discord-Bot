# cyphers-Discord-Bot

## init Bot

using node-js 14  
install from https://nodejs.org/  
sqlite3

1. change API Tokens
   change \`config.ts\`

    > CyphersApiKey -https://developers.neople.co.kr/contents/apiDocs/cyphers
    >
    > DiscordApiKey -https://discord.com/developers/applications

2. run below commands

```
yarn install
yarn build
yarn typeorm schema:sync
```

## run bot

```
yarn start
```

## Usage

### Bot Join Link

https://top.gg/bot/719503554854912032
https://discord.com/oauth2/authorize?client_id=719503554854912032&scope=bot&permissions=523328
### commands

call with `!!command`

1. `normal commands`

> 전적 <유저 이름> : 해당유저의 전적을 검색합니다.  
> 매치 <매치 키> : 해당 게임의 정보를 가져옵니다.  
> 랭킹 <시작 순위> : 시작 순위부터 상위 10명을 보여줍니다  
> 클랜 접속자 : 현재 접속중인 클랜원을 보여줍니다  
> 클랜 홈피 : 클랜 홈페이지의 주소를 보여줍니다.  
> 클랜 홈피 네이버 : 클랜 홈페이지의 네이버 퍼블리쉬 주소를 보여줍니다.

2. `settings <subcommands>`

> 열할 <열할 이름> : 봇의 설정을 허용할 역할을 1개 설정합니다  
> 채널 <채널ID> : 봇의 반응을 허용할 채널을 설정합니다  
> 채널 초기화 : 반응 허용할 채널을 초기화 합니다  
> 클랜주소 <PageKey>: 클랜의 주소를 설정합니다 - `"cyphers.nexon.com/cyphers/clan/<PageKey>"`
