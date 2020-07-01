import { getRepository } from 'typeorm';
export const setClan = async (
    guildID: string,
    newClanLink: string
): Promise<string> => {
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ clan: newClanLink })
        .where('serverId = :gID', { gID: guildID.toString() })
        .execute()
        .catch(() => {
            return 'failed to set Clan Link';
        });
    return 'changed clan Link to ' + newClanLink;
};
