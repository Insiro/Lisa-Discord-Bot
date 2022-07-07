import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceOption } from './config';


const AppDataSource = new DataSource(dataSourceOption as DataSourceOptions);
export default AppDataSource;
