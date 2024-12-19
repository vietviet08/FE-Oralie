import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';

export async function getProductOptionById(id: number) {
    try {
        const res = await axios.get(`${baseUrl}/store/product-options/${id}`);

        if (res && res.status == 200) {
            console.log(res);
            return res.data;
        }

    } catch (error) {
        console.error("Error calling backend product confirmation:", error);
        throw error;
    }
}
