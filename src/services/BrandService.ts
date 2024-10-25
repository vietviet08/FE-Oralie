import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';


export async function getListBrand(page: number,
                                   size: number,
                                   sortBy: string,
                                   sort: string,
                                   token: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/brands`, {
            params: {
                page,
                size,
                sortBy,
                sort,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}