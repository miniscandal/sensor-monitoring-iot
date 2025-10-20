import { ConnectedDeviceCount } from './components/organisms/connected-device-count';
import { ConnectedDeviceList } from './components/organisms/connected-device-list';


function FeatConnectedDeviceMonitoring() {

    return (
        <>
            <ConnectedDeviceCount />
            <ConnectedDeviceList />
        </>
    );
}

export { FeatConnectedDeviceMonitoring };
