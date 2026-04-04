import { TYPE_CHECKS } from './variants';

import './style.css';


function JsonValue({ value, level = 0 }) {
    const handler = TYPE_CHECKS.find(({ match }) => match(value));


    return handler?.render(value, level) ?? null;
};

export { JsonValue };
