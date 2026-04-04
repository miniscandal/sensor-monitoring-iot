import { Properties } from '../../organisms/properties';

import './style.css';


function Information({ connected, properties }) {

    return (
        <article class="information">
            <Properties connected={connected} properties={properties} />
        </article>
    );
}

export { Information };
