import { Message } from 'discord.js';

export const clan = (msg: Message, args: Array<String>) => {
    let result = '';
    switch (args[0]) {
        default:
            result = '준비중입니다';
    }
    msg.channel.send(result);
};
