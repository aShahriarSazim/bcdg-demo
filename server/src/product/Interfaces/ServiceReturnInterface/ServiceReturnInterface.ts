export  interface ServiceReturnInterface {
    success?: boolean;
    error?: {
        type: string;
        message: string;
    };
    data?: any;
}
