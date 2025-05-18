import {UserAddressRes} from "@/model/user/UserAddressRes";

export type UserRes = {
    username: string;
    email: string;
    address: UserAddressRes[];
    fullName: string;
    gender: boolean;
}