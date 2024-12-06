import axios from "axios";
import {RatePost} from "@/model/rate/RatePost";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/rates';


export async function getListRates(
                                             page: number,
                                             size: number,
                                             sortBy: string,
                                             sort: string,
) {
    try {
        const res = await axios.get(`${baseUrl}/dash/rates/`, {
            params: {
                page,
                size,
                sortBy,
                sort,
            },
        });
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getListRateByProductId(productId: number,
                                  page: number,
                                  size: number,
                                  sortBy: string,
                                  sort: string,
) {
    try {
        const res = await axios.get(`${baseUrl}/store/rates/` + productId, {
            params: {
                page,
                size,
                sortBy,
                sort,
            },
        });
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function postRate(productId: number, ratePost: RatePost) {
    try {
        const res = await axios.post(`${baseUrl}/store/rates/` + productId, ratePost);
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateRate(productId: number, ratePost: RatePost) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/` + productId, ratePost);
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteRate(rateId: number) {
    try {
        const res = await axios.delete(`${baseUrl}/store/rates/` + rateId);
        if (res && res.status === 204) {
            console.log("Delete rate successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function likeComment(productId: number, rateId: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/like/` + productId + '?rateId=' + rateId);
        if (res && res.status === 204) {
            console.log("Like successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function dislikeComment(productId: number, rateId: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/dislike/` + productId + '?rateId=' + rateId);
        if (res && res.status === 204) {
            console.log("Dislike successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function updateAvailableComment(rateId: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/available/` + rateId);
        if (res && res.status === 204) {
            console.log("Comment availability updated successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export async function getAvgRateStarByProductId(productId: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/rates/avg/` + productId);
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
