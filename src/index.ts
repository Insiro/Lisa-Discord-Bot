import { Client } from 'discord.js';
import { parse } from 'discord-command-parser';
import { DiscordApiKey } from './config';
import * as sender from './sender';
const client = new Client();
const prefix = '!!';

client.on('message', (msg): void => {
    const parsed = parse(msg, prefix);

    if (!parsed.success) return;
    switch (parsed.command) {
        case 'help':
        case '도움말':
        case '명령어':
        case 'command':
            void sender.helper(msg, parsed.arguments);
            break;
        case 'setting':
        case '설정':
            void sender.setting(msg, parsed.arguments);
            break;
        case 'entirely':
        case '전적':
            void sender.entirely(msg, parsed.arguments);
            break;
        case '매치':
        case 'match':
            void sender.match(msg, parsed.arguments);
            break;
        case 'ranking':
        case '랭킹':
            void sender.ranking(msg, parsed.arguments);
        default:
    }
});

void client
    .login(DiscordApiKey)
    .then(() => console.log('start CyphersDiscord Bot!!'));
