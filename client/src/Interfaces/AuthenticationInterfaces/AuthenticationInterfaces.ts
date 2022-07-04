export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    token?: string;
    isAuthenticated: boolean;
}

export interface LoginDataInterface {
    email: string;
    password: string;
}

export interface RegisterDataInterface {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
}
