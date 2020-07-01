import { Guild } from 'discord.js';
import { getRepository } from 'typeorm';
export const setRole = async (
    guild: Guild,
    args: Array<String>
): Promise<string> => {
    const roleName = args.join(' ');
    const role = guild.roles.cache.find((role) => role.name === roleName);
    if (role == undefined) return 'Wrong Role Name';
    const repo = getRepository('server');
    await repo
        .createQueryBuilder()
        .update()
        .set({ role: role.id })
        .where('serverId = :gID', { gID: guild.id!.toString() })
        .execute()
        .catch(() => {
            return 'failed to set respose Role ' + roleName;
        });
    return 'changed respose Role to ' + role.name;
};
