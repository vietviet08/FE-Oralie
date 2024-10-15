import apiClientService from "@/utils/ApiClientService";
import {UserGet} from "@/model/user/UserGet";
import {UserPage} from "@/model/user/UserPage";
import {User} from "@/model/user/User";
import {AssignRole} from "@/model/user/AssignRole";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/accounts';

//store


export async function getProfileUser(): Promise<UserGet> {
    const response = await apiClientService.get(`${baseUrl}/store/accounts/profile`);
    return response.json();
}

export async function updateProfile(user: User) {
    const response = await apiClientService.put(`${baseUrl}/store/accounts/profile`, JSON.stringify(user));
    return response.json();
}

export async function updatePassword(password: string) {
    const response = await apiClientService.put(`${baseUrl}/store/accounts/change-password`, JSON.stringify({password}));
    return response.json();
}


//dash
//for manage

export async function getUsers(page: number,
                               size: number,
                               sortBy: string,
                               sort: string): Promise<UserPage> {

    const url = `page=${page}&size=${size}&sortBy=${sortBy}&sort=${sort}`;
    const response = await apiClientService.get(`${baseUrl}/dash/accounts?${url}`);
    return response.json();
}

export async function getUserById(id: number): Promise<UserGet> {
    const response = await apiClientService.get(`${baseUrl}/dash/accounts/${id}`);
    return response.json();
}

export async function getUserByUserName(username: string): Promise<UserGet> {
    const response = await apiClientService.get(`${baseUrl}/dash/accounts/user/${username}`);
    return response.json();
}


export async function getUserByUserId(username: string): Promise<UserGet> {
    const response = await apiClientService.get(`${baseUrl}/dash/accounts/userId/${username}`);
    return response.json();
}

export async function createUser(user: User): Promise<UserGet> {
    const response = await apiClientService.post(`${baseUrl}/dash/accounts/create`, JSON.stringify(user));
    return response.json();
}

export async function assignRole(userId: number, roleName: string): Promise<AssignRole> {
    const response = await apiClientService.put(`${baseUrl}/dash/accounts/assign-role`, JSON.stringify({
        userId,
        roleName
    }));
    return response.json();
}

export async function unAssignRole(userId: number, roleName: string): Promise<AssignRole> {
    const response = await apiClientService.put(`${baseUrl}/dash/accounts/un-assign-role`, JSON.stringify({
        userId,
        roleName
    }));
    return response.json();
}

export async function updateUser(user: User): Promise<UserGet> {
    const response = await apiClientService.put(`${baseUrl}/dash/accounts`, JSON.stringify(user));
    return response.json();
}

export async function lockUser(id: number) {
    return await apiClientService.put(`${baseUrl}/dash/accounts/lock/${id}`, {});
}

export async function deleteUser(id: number) {
    return await apiClientService.delete(`${baseUrl}/dash/accounts/${id}`);
}

// dash for self
export async function getProfileAdmin(): Promise<UserGet> {
    const response = await apiClientService.get(`${baseUrl}/dash/profile`);
    return response.json();
}

export async function updateProfileAdmin(user: User) {
    return await apiClientService.put(`${baseUrl}/dash/profile`, JSON.stringify(user));

}

export async function updatePasswordAdmin(username: string, password: string) {
    return await apiClientService.put(`${baseUrl}/dash/profile/change-password?username=${username}`, JSON.stringify({password}));
}



