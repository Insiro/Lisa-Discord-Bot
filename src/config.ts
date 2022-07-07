import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { BotServer } from './entity/BotServer';
import { NewsDate } from './entity/NewsDate';
import * as fs from 'fs';

const fileName = 'src/bot.env'
if (fs.existsSync(fileName))
    dotenv.config({path:fileName});
else
    dotenv.config();

export const dataSourceOption: DataSourceOptions = {
    type: 'postgres',
    host: process.env.dbHost || 'database host',
    port: parseInt(process.env.dbPort)|| 5432,
    username: process.env.dbUsername||'db user name',
    database: process.env.dbName||'db name',
    password: process.env.dbPWD ||'database password',
    synchronize: false,
    logging: false,
    entities: [BotServer, NewsDate],
    migrations: ['./migration/*.ts', './migration/*.js'],
    subscribers: ['./subscriber/*.ts', './subscriber/*.js'],
    ssl: false,
    extra: {
        insecureAuth: true,
        ssl: {
            rejectUnauthorized: false,
        },
    },
};


export const CyphersApiKey =
    process.env.cyphersKey || 'Your Neople Open API Key';
export const DiscordApiKey = process.env.discordKey || 'Your Discord API Key';
export const prefix = process.env.prefix || '!!';
