import { ConnectedDeviceCount } from "./components/organisms/connected-device-count";
import { ConnectedDeviceView } from "./components/organisms/connected-device-view";

function FeatShowConnectedDevices() {
	return (
		<>
			<ConnectedDeviceCount />
			<ConnectedDeviceView />
		</>
	);
}

export { FeatShowConnectedDevices };
