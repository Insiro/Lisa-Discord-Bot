import { getRepository } from 'typeorm';
export const setRole = async (
    guildID: string,
    role: string
): Promise<string> => {
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ role: role })
        .where('serverId = :gID', { gID: guildID.toString() })
        .execute()
        .catch(() => {
            return 'failed to set respose Role';
        });
    return 'changed respose Role to';
};
