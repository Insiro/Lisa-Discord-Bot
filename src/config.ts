import dotenv from 'dotenv';
dotenv.config();

export const CyphersApiKey =
    process.env.cyphersKey || 'Your Neople Open API Key';
export const DiscordApiKey = process.env.discordKey || 'Your Discord API Key';
export const prefix = process.env.prefix || '!!';
