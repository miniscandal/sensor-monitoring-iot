type ReceivedParameterByDeviceType = {
    temperature: number;
    humidity: number;
    timestamp: Date;
};

type ReceivedMessageByDeviceType = {
    device_id: string;
    status_code: number;
    procedure_code: number;
} & Partial<ReceivedParameterByDeviceType>;

export { ReceivedMessageByDeviceType };
