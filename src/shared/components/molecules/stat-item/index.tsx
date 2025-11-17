import { Label } from '@shared-components/atoms/label';
import { Output } from '@shared-components/atoms/output';

import './style.css';


function StatItem({ label = 'Stat Item', value = 'N/A', direction = '' }) {
    return (
        <div className={`stat-item ${direction}`}>
            <Label text={label} />
            <Output value={value} />
        </div>
    );
}

export { StatItem };
