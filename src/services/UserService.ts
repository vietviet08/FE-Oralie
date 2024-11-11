import apiClientService from "@/utils/ApiClientService";
import {UserRes} from "@/model/user/UserRes";
import {UserPage} from "@/model/user/UserPage";
import {User} from "@/model/user/User";
import {AssignRole} from "@/model/user/AssignRole";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/accounts';

//store

export async function getProfile(token : string) {
    try {
        const res = await axios.get(`${baseUrl}/store/accounts/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function updateProfile(user: User, token: string) {
    try {
        const res = await axios.put(`${baseUrl}/store/accounts/profile`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updatePassword(password: string, token: string) {
    try {
        const res = await axios.put(`${baseUrl}/store/accounts/change-password`, {password}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getImageProfile(token: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/accounts/profile/image`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function uploadImageProfile(image: File, token: string) {
    try {
        const formData = new FormData();
        formData.append('avatar', image);
        formData.append('userId', '');
        const res = await axios.post(`${baseUrl}/store/accounts/profile/image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteImageProfile(token: string) {
    try {
        const res = await axios.delete(`${baseUrl}/store/accounts/profile/image`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function getProfileUser(): Promise<UserRes> {
    const response = await apiClientService.get(`${baseUrl}/store/accounts/profile`);
    return response.json();
}

export async function updateProfileUser(user: User) {
    const response = await apiClientService.put(`${baseUrl}/store/accounts/profile`, JSON.stringify(user));
    return response.json();
}

export async function updatePasswordUser(password: string) {
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

export async function getUserById(id: number): Promise<UserRes> {
    const response = await apiClientService.get(`${baseUrl}/dash/accounts/${id}`);
    return response.json();
}

export async function getUserByUserName(username: string): Promise<UserRes> {
    const response = await apiClientService.get(`${baseUrl}/dash/accounts/user/${username}`);
    return response.json();
}


export async function getUserByUserId(username: string): Promise<UserRes> {
    const response = await apiClientService.get(`${baseUrl}/dash/accounts/userId/${username}`);
    return response.json();
}

export async function createUser(user: User): Promise<UserRes> {
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

export async function updateUser(user: User): Promise<UserRes> {
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
export async function getProfileAdmin(): Promise<UserRes> {
    const response = await apiClientService.get(`${baseUrl}/dash/profile`);
    return response.json();
}

export async function updateProfileAdmin(user: User) {
    return await apiClientService.put(`${baseUrl}/dash/profile`, JSON.stringify(user));

}

export async function updatePasswordAdmin(username: string, password: string) {
    return await apiClientService.put(`${baseUrl}/dash/profile/change-password?username=${username}`, JSON.stringify({password}));
}



