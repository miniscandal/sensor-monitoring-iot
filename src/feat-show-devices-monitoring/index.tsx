import { ConnectedDeviceCount } from "./components/organisms/connected-device-count";
import { ConnectedDeviceView } from "./components/organisms/connected-device-view";

function FeatShowDevicesMonitoring() {
	return (
		<>
			<ConnectedDeviceCount />
			<ConnectedDeviceView />
		</>
	);
}

export { FeatShowDevicesMonitoring };
