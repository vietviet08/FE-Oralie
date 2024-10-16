import {UserAddress} from "@/model/user/UserAddress";
import apiClientService from "@/utils/ApiClientService";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/accounts';

//store
export async function getAddresses(): Promise<UserAddress[]> {
    const response = await apiClientService.get(`${baseUrl}/store/user-address`);
    return response.json();
}

export async function getAddressById(id: number): Promise<UserAddress> {
    const response = await apiClientService.get(`${baseUrl}/store/user-address/${id}`);
    return response.json();
}

export async function saveAddress(address: UserAddress): Promise<UserAddress> {
    const response = await apiClientService.post(`${baseUrl}/store/user-address`, JSON.stringify({address}));
    return response.json();
}

export async function updateAddress(address: UserAddress): Promise<UserAddress> {
    const response = await apiClientService.put(`${baseUrl}/store/user-address`, JSON.stringify({address}));
    return response.json();
}

export async function deleteAddress(id: number) {
    return await apiClientService.delete(`${baseUrl}/store/user-address/${id}`);
}

//dash
export async function getAddressesDash(page: number, size: number, sortBy: string, sort: string): Promise<UserAddress[]> {
    const url = `page=${page}&size=${size}&sortBy=${sortBy}&sort=${sort}`;
    const response = await apiClientService.get(`${baseUrl}/dash/user-address?${url}`);
    return response.json();
}

export async function getAddressByIdDash(id: number): Promise<UserAddress> {
    const response = await apiClientService.get(`${baseUrl}/dash/user-address/${id}`);
    return response.json();
}

export async function saveAddressDash(address: UserAddress): Promise<UserAddress> {
    const response = await apiClientService.post(`${baseUrl}/dash/user-address`, JSON.stringify({address}));
    return response.json();
}

export async function updateAddressDash(address: UserAddress): Promise<UserAddress> {
    const response = await apiClientService.put(`${baseUrl}/dash/user-address`, JSON.stringify({address}));
    return response.json();
}

export async function deleteAddressDash(id: number) {
    return await apiClientService.delete(`${baseUrl}/dash/user-address/${id}`);
}

// dash for self
export async function getAddressesSelf(): Promise<UserAddress[]> {
    const response = await apiClientService.get(`${baseUrl}/dash/profile/address`);
    return response.json();
}

export async function getAddressByIdSelf(id: number): Promise<UserAddress> {
    const response = await apiClientService.get(`${baseUrl}/dash/profile/address/${id}`);
    return response.json();
}

export async function saveAddressSelf(address: UserAddress): Promise<UserAddress> {
    const response = await apiClientService.post(`${baseUrl}/dash/profile/address`, JSON.stringify({address}));
    return response.json();
}

export async function updateAddressSelf(address: UserAddress): Promise<UserAddress> {
    const response = await apiClientService.put(`${baseUrl}/dash/profile/address`, JSON.stringify({address}));
    return response.json();
}

export async function deleteAddressSelf(id: number) {
    return await apiClientService.delete(`${baseUrl}/dash/profile/address/${id}`);
}




