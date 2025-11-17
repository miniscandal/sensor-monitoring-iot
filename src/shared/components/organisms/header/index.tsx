import { Heading } from '@shared-components/atoms/heading';
import { Logo } from '@shared-components/atoms/logo';

import './styles.css';


function Header() {

    return (
        <header class="header">
            <Heading level={1} text="IoT Control Panel" />
            <Logo />
        </header>
    );
}

export { Header };
