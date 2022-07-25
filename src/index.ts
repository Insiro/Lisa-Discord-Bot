import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { DiscordApiKey, DiscordAppId } from './config';
import schedule from 'node-schedule';

import AppDataSource from './data-sources';
import * as guildInit from './utils/guild';
import { commands, sender } from './sender';
import { worker } from './newsUpdater';

import { Routes } from 'discord-api-types/v10';


async function main(): Promise<void> {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) sender(interaction);
    });
    // client.on('message', (msg): void => void sender(msg));
    client.on(
        'guildCreate',
        (guild): void => void guildInit.registerGuild(guild)
    );
    client.on(
        'guildDelete',
        (guild): void => void guildInit.deleteGuild(guild)
    );
    await AppDataSource.initialize();
    // schedule.scheduleJob('0 30 * * * *', () => {
    //     void worker(client);
    // });
    // schedule.scheduleJob('0 00 * * * *', () => {
    //     void worker(client);
    // });
    const rest = new REST({ version: '10' }).setToken(DiscordApiKey);
    await rest.put(Routes.applicationCommands(DiscordAppId), {
        body: commands.map((command) => command.toJSON()),
    });
    await client.login(DiscordApiKey);

    client.user.setActivity('/help 테스팅', { type: 'LISTENING' });

    console.log('start CyphersDiscord Bot!!');
}
main().catch((error) => console.log(error));
