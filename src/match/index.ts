import { Message } from 'discord.js';

export const Match = async (msg: Message, args: Array<string>): Promise<void> => {
    let result;
    switch (args[0]) {
        default:
            result = '현재 준비중입니다';
    }
    msg.channel.send(result);
};
