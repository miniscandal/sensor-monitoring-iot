const COMMAND_PATTERN = /^\s*([a-zA-Z]+(?:-[a-zA-Z]+)*)(?:\s+(.*))?$/;
const TOKEN_FLAG_VALUE_PATTERN = /(?:[^\s"'`=]+=(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|[^\s]+)|(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|[^\s]+))/g;
const FLAG_PATTERN = /^--?([a-zA-Z]+)(?:=(.*))?$/;

export {
    COMMAND_PATTERN,
    FLAG_PATTERN,
    TOKEN_FLAG_VALUE_PATTERN,
};
