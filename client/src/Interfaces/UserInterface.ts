interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    token: string;
    isAuthenticated: boolean;

    password ?: string;
    confirmPassword ?: string;
}

export default UserInterface;