import {UserAddressGet} from "@/model/user/UserAddressGet";

export type UserGet = {
    username: string;
    email: string;
    address: UserAddressGet[];
    fullName: string;
    gender: boolean;
}