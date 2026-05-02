import { createContext } from 'preact';

const EnvironmentalNodeContext = createContext({
    key: null,
    isSelected: false,
    nodeStateCode: null,
    metadata: {},
    data: {
        sensorReadings: {
            humidity: {
                value: null,
            },
            temperature: {
                value: null,
            },
        },
    },
});


function EnvironmentalNodeProvider({
    isSelected = false,
    nodeStateCode = 201,
    // operationResult = null,
    metadata: {
        nodeId = 'a001',
        // timestamp = "2026-03-29T21:51:01Z",
        // firmwareVersion = "1.3.0",
        // location: {
        //     lat = 20.5244,
        //     lng = -99.8956,
        //     zone = 'assembly',
        //     line = '3',
        //     station = 'welding robot',
        // } = {},
    } = {},
    // connection: { state = 'online', reason = 'boot' } = {},
    data: {
        sensorReadings: {
            humidity: { value: humidityValue = null } = {},
            temperature: { value: temperatureValue = null } = {},
        } = {},
    } = {},
    children,
}) {
    const value = {
        isSelected,
        nodeStateCode,
        metadata: {
            nodeId,
        },
        data: {
            sensorReadings: {
                humidity: { value: humidityValue },
                temperature: { value: temperatureValue },
            },
        },
    };

    return (
        <EnvironmentalNodeContext.Provider value={value}>
            {children}
        </EnvironmentalNodeContext.Provider>
    );
}

export { EnvironmentalNodeContext, EnvironmentalNodeProvider };


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
    sensorReadings: {
        humidity: { value: humidityValue = null } = { },
        temperature: { value: temperatureValue = null } = { },
    } = { },
} = { },
*/
