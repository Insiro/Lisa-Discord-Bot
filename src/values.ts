export const parseErrorMsg = 'Failed to load data\nplz check args';
export const ParseError = (error: Error): string => {
    console.log(error);
    return parseErrorMsg;
};

export const CyApiLink = 'https://api.neople.co.kr/cy/';
