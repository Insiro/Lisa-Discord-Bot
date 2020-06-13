export const parseErrorMsg = 'ParseError';
export const ParseError = (error: Error): string => {
    console.log(error);
    return 'parseError';
};
