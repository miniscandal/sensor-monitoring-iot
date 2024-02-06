import { useEffect } from 'preact/compat';
import { useSignal } from '@preact/signals';

import { ParameterSignalsType } from './types/parameters-signals';

import { MqttClientSingleton } from '@core-services/mqtt-client';
import { ObserverType } from '@core-services/mqtt-client/types/observer';
import { ObserverDataType } from '@core-services/mqtt-client/types/observer-data';
import { ReceivedMessageByDeviceType } from '@core-services/mqtt-client/types/received-message-by-device';

import { OBS_ID_DEVICE_PARAMETERS_READING } from './constants/observer-id';

function observerCallback(
    observerId: string, currentDeviceId: string, data: ObserverDataType, signals: ParameterSignalsType,
) {
    const { humidity: humiditySignal, temperature: temperatureSignal } = signals;
    const { device_id, temperature, humidity } = data as ReceivedMessageByDeviceType;

    if (observerId !== OBS_ID_DEVICE_PARAMETERS_READING || device_id !== currentDeviceId) {

        return;
    }

    humiditySignal.value = humidity;
    temperatureSignal.value = temperature;
}

function useDeviceParametersReading(deviceId: string) {
    const humidity = useSignal(0);
    const temperature = useSignal(0);

    useEffect(() => {
        const client = MqttClientSingleton.getInstance();
        const signals: ParameterSignalsType = {
            humidity,
            temperature,
        };
        const observer: ObserverType = (observerId, data) => {
            observerCallback(observerId, deviceId, data, signals);
        };
        client.addObserver(observer);

    }, []);

    return { humidity, temperature };
}

export { useDeviceParametersReading };
