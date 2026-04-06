import { TYPE_CHECKS } from './variants';

import './style.css';


function JsonToken({ token, level = 0 }) {
    const handler = TYPE_CHECKS.find(({ match }) => match(token));


    return handler?.render(token, level) ?? null;
};

export { JsonToken };
