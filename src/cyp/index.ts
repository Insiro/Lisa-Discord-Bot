import { CyphersApiKey } from '../config';
import { Message } from 'discord.js';
import { SuccessfulParsedMessage } from 'discord-command-parser';
import * as request from 'request-promise-native';
const apiLink = 'https://api.neople.co.kr/cy/';
export enum gameMode {
    normal,
    rating,
    all,
}
export const cyphers = (
    msg: Message,
    command: SuccessfulParsedMessage<Message>
): void => {
    return;
};

export const checkStatusCode = (): void => {
    return;
};
