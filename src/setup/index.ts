// import { parse, SuccessfulParsedMessage } from 'discord-command-parser';
import { Message } from 'discord.js';
export const setting = async (
    msg: Message,
    args: Array<string>
): Promise<void> => {
    await msg.channel.send('will be supports');
};

export default setting;
