import { ConnectedDeviceCount } from './components/organisms/connected-device-count';
import { ConnectedDeviceView } from './components/organisms/connected-device-view';


function FeatConnectedDeviceMonitoring() {

    return (
        <>
            <ConnectedDeviceCount />
            <ConnectedDeviceView />
        </>
    );
}

export { FeatConnectedDeviceMonitoring };
