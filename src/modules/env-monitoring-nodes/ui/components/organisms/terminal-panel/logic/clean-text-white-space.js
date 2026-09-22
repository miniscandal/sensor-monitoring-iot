function cleanTextWhitespace(text) {
    const jsonRegex = /(\r?\n|\r|\s{2,}|\s*(?==)|(?<==)\s*)/g;


    return text.replace(jsonRegex, '').trim();
}

export { cleanTextWhitespace };
