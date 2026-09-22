/* eslint-disable no-unused-vars */
/*
isSelected = false,
nodeStateCode = 201,
operationResult = null,
metadata: {
    nodeId = 'a001',
    timestamp = "2026-03-29T21:51:01Z",
    firmwareVersion = "1.3.0",
    location: {
        lat = 20.5244,
        lng = -99.8956,
        zone = 'assembly',
        line = '3',
        station = 'welding robot',
        } = { },
} = { },
connection: { state = 'online', reason = 'boot' } = { },
data: {
    sensorsReadings: {
        humidity: { value: humidityValue = null } = { },
        temperature: { value: temperatureValue = null } = { },
    } = { },
} = { },
*/


import { createContext } from 'preact';

const EnvMonitoringNodeContext = createContext({
    key: null,
    isSelected: false,
    nodeProperties: {
        nodeStateCode: null,
        operationResult: null,
        metadata: {},
        data: {
            sensorsReadings: {
                humidity: {
                    value: null,
                },
                temperature: {
                    value: null,
                },
            },
        },
    },
});


function EnvMonitoringNodeProvider({
    isSelected = false,
    nodeProperties: {
        nodeStateCode = 201,
        operationResult = null,
        metadata: {
            nodeId = 'a001',
            timestamp = '2026-03-29T21:51:01Z',
            firmwareVersion = '1.3.0',
            location: {
                lat = 20.5244,
                lng = -99.8956,
                zone = 'assembly',
                line = '3',
                station = 'welding robot',
            } = {},
        } = {},
        data: {
            sensorsReadings: {
                humidity,
                temperature,
            } = {},
        } = {},
        connection: { state = 'online', reason = 'boot' } = {},
    },
    children,
}) {
    const value = {
        isSelected,
        nodeProperties: {
            nodeStateCode,
            metadata: {
                nodeId,
            },
            data: {
                sensorsReadings: {
                    humidity,
                    temperature,
                },
            },
        },
    };

    return (
        <EnvMonitoringNodeContext.Provider value={value}>
            {children}
        </EnvMonitoringNodeContext.Provider>
    );
}

export { EnvMonitoringNodeContext, EnvMonitoringNodeProvider };
