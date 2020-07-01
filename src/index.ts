import { Client } from 'discord.js';
import { parse } from 'discord-command-parser';
import { DiscordApiKey } from './config';
import { createConnection } from 'typeorm';

import * as guildInit from './guild';
import * as sender from './sender';
import 'reflect-metadata';

async function main(): Promise<void> {
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
                sender.helper(msg, parsed.arguments);
                break;
            case 'setting':
            case '설정':
                sender.setting(msg, parsed.arguments);
                break;
            case 'entirely':
            case '전적':
                sender.entirely(msg, parsed.arguments);
                break;
            case '매치':
            case 'match':
                sender.match(msg, parsed.arguments);
                break;
            case 'clan':
            case '클랜':
                sender.clan(msg, parsed.arguments);
                break;
            case 'ranking':
            case '랭킹':
                sender.ranking(msg, parsed.arguments);
                break;
            default:
        }
    });
    client.on(
        'guildCreate',
        (guild): void => void guildInit.registGuild(guild)
    );
    client.on(
        'guildDelete',
        (guild): void => void guildInit.deleteGuild(guild)
    );
    const connection = await createConnection();
    await connection.synchronize();
    await client.login(DiscordApiKey);
    console.log('start CyphersDiscord Bot!!');
}
main().catch((error) => console.log(error));
