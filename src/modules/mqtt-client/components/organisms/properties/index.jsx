/**
 * Module responsibility
 * 
 */


import { IconStat } from '@shared-components/molecules/icon-stat';

import { PROPERTIES_DISPLAY_CONFIG } from './variants';

import './style.css';


function Properties({ connected, properties }) {
    const iconStatComponents = PROPERTIES_DISPLAY_CONFIG.map(property => (
        <IconStat key={property.name} {...property} value={connected ? properties[property.name] : 'N/A'} />
    ));


    return (
        <section class="properties">
            {iconStatComponents}
        </section>
    );
}

export { Properties };
