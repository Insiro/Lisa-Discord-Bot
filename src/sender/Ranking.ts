import { CyphersApiKey } from '../config';
import { CyApiLink } from '../values';
import * as request from 'request-promise-native';

export const CyRanking = async (offset: string): Promise<string> => {
    const Options = {
        uri: CyApiLink + 'ranking/ratingpoint',
        qs: {
            apikey: CyphersApiKey,
            offset: parseInt(offset) - 1,
        },
    };
    const list = JSON.parse(await request.get(Options))['rows'];
    let outString = '```markdown\n';
    for (const i in list) {
        const item = list[i];
        outString +=
            item['rank'] +
            '. ' +
            item['nickname'] +
            '\t' +
            item['ratingPoint'] +
            '\n';
    }
    outString += '```';
    return outString;
};
