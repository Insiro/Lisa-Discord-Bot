module.exports = {
    synchronize: false,
    entities: ['dist/entity/*.ts', 'dist/entity/*.js'],
    migrations: ['dist/migration/*.ts', 'dist/migration/*.js'],
    subscribers: ['dist/subscriber/*.ts', 'dist/subscriber/*.js'],
    cli: {
        entitiesDir: './src/entity',
        migrationsDir: './src/migration',
        subscribersDir: './src/subscriber',
    },
    type: 'postgres',
    database: process.env.dbName || 'db name',
    port: process.env.dbPort || '5432',
    username: process.env.dbUsername || 'db user name',
    host: process.env.dbHost || 'database host',
    password: process.env.dbPWD || 'database password',
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    migrationRun: true,
    autoSchemaSync: false,
    migration: 'generate',
};
