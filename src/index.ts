import { Client } from 'discord.js';
import { parse } from 'discord-command-parser';
import { DiscordApiKey } from './config';
import { setting } from './setup';
import { CyUsers } from './CyphersUser';
import { cyphersOthers } from './CyphersOther';
import { help } from './help';
const client = new Client();
const prefix = '!!';

client.on('message', (msg): void => {
    const parsed = parse(msg, prefix);
    if (!parsed.success) return;
    switch (parsed.command) {
        case 'help':
        case '도움말':
            void help(msg, parsed.arguments);
            break;
        case 'setting':
        case 'settings':
        case '설정':
            void setting(msg, parsed.arguments);
            break;
        case 'user':
        case '유저':
            void CyUsers(msg, parsed.arguments);
            break;
        default:
            void cyphersOthers(msg, parsed);
    }
});

void client
    .login(DiscordApiKey)
    .then(() => console.log('start CyphersDiscord Bot!!'));
