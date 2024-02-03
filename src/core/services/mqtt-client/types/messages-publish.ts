type MessagePublishType = {
    topic: string;
    message: {
        status?: number;
        procedure_code_request?: number;
    },
};

export { MessagePublishType };
