
import {User} from "@/model/user/User";
import apiClientService from "@/utils/ApiClientService";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";

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

export async function getAccessToken(): Promise<string | null> {
    const session: Session | null = await getServerSession(authOptions);
    const token = session?.access_token as string;
    return token;
}

