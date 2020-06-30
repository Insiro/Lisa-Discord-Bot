import { Client, Message } from 'discord.js';
import { parse } from 'discord-command-parser';
import { DiscordApiKey } from './config';
import { createConnection, Connection } from 'typeorm';

import * as guildInit from './guild';
import * as sender from './sender';
import 'reflect-metadata';

async function main() {
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
    client.on(
        'guildCreate',
        async (guild) => await guildInit.registGuild(guild)
    );
    client.on(
        'guildDelete',
        async (guild) => await guildInit.deleteGuild(guild)
    );
    const connection = await createConnection();
    await connection.synchronize();
    await client.login(DiscordApiKey);
    console.log('start CyphersDiscord Bot!!');
}
main().catch((error) => console.log(error));
