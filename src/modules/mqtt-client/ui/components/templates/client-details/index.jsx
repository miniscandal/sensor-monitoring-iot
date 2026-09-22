import { Properties } from '../../organisms/properties';

import './style.css';


function ClientDetails({ connected, properties }) {

    return (
        <article class="client-details">
            <Properties connected={connected} properties={properties} />
        </article>
    );
}

export { ClientDetails };
