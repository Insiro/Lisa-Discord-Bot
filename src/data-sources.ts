import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BotServer } from './entity/BotServer';
import { NewsDate } from './entity/NewsDate';

dotenv.config();
const dataSourceOption: DataSourceOptions = {
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
const AppDataSource = new DataSource(dataSourceOption);
export default AppDataSource;
