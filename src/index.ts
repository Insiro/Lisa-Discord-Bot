import { Client } from 'discord.js';
import { DiscordApiKey, prefix } from './config';
import { createConnection } from 'typeorm';

import 'reflect-metadata';
import schedule from 'node-schedule';

import * as guildInit from './utils/guild';
import { sender } from './sender';
import { worker } from './newsUpdater';

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
    schedule.scheduleJob('0 30 * * * *', () => {
        void worker(client);
    });
    schedule.scheduleJob('0 00 * * * *', () => {
        void worker(client);
    });
    console.log('start CyphersDiscord Bot!!');
}
main().catch((error) => console.log(error));
