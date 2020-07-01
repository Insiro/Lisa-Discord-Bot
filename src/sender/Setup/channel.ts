import { getRepository } from 'typeorm';
export const setResposeChannel = async (
    guildID: string,
    channelID: string
): Promise<string> => {
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ channel: channelID })
        .where('serverId = :gID', { gID: guildID.toString() })
        .execute()
        .catch(() => {
            return 'failed to set respose Channel';
        });
    return 'changed respose Channel to';
};