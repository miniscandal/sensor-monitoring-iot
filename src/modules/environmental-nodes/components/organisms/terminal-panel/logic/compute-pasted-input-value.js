import { cleanTextWhitespace } from './clean-text-white-space';


function computePastedInputValue({ pastedText, inputCommand, selectionStart, selectionEnd }) {
    const cleanText = cleanTextWhitespace(pastedText);


    return `${inputCommand.slice(0, selectionStart)}${cleanText}${inputCommand.slice(selectionEnd)}`;
}

export { computePastedInputValue };
