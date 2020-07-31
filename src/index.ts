import { Client } from 'discord.js';
import { DiscordApiKey, prefix } from './config';
import { createConnection } from 'typeorm';

import * as guildInit from './utils/guild';
import { sender } from './sender';
import 'reflect-metadata';

async function main(): Promise<void> {
    const client = new Client();
    client.on('ready', () => {
        client.user?.setPresence({
            status: 'online',
            activity: {
                type: 'LISTENING',
                name: prefix + 'help',
            },
        });
    });
    client.on('message', (msg): void => void sender(msg));
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
