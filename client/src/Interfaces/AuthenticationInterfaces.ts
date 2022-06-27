export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    token: string;
    isAuthenticated: boolean;
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


export interface RegisterNameInterface{
    firstName: string;
    lastName: string;
}
export interface RegisterContactsInterface{
    email: string;
    phone: string;
    address: string;
}
export interface RegisterPasswordInterface{
    password: string;
    confirmPassword: string;
}

export interface LoginDataInterface {
    email: string;
    password: string;
}
