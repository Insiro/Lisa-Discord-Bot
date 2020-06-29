import { getEntirely } from './Entirely';
import { matchInfo } from './Match';
import { help } from './Help';
import { Message } from 'discord.js';
import { CyRanking } from './Ranking';
import { setup } from './Setup';

export const entirely = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    msg.channel.send(await getEntirely(args[0]));
};

export const match = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    msg.channel.send(await matchInfo(args[0]));
};

export const helper = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    msg.channel.send(help(args));
};
export const ranking = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    msg.channel.send(await CyRanking(args[0]));
};

export const setting = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    msg.channel.send(setup(args));
};
export const wrong = async (msg: Message): Promise<void> => {
    msg.channel.send('wrong Command');
};
