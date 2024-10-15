
import {User} from "@/model/user/User";
import apiClientService from "@/utils/ApiClientService";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/accounts';

export async function login(email: string, password: string) {
    const response = await apiClientService.post(`${baseUrl}/login`, JSON.stringify({ email, password }));
    return response.json();
}

export async function register(user: User): Promise<User> {
    const response = await apiClientService.post(`${baseUrl}/register`, JSON.stringify({ user}));
    return response.json();
}

export async function logout() {
    return await apiClientService.post(`${baseUrl}/logout`, {});
}

