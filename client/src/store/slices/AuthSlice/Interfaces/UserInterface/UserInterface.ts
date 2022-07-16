export interface UserInterface {
    loading: boolean;
    success: boolean;
    error: any;
    isAuthenticated: boolean;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        phone: string;
        token?: string;
    }
}
