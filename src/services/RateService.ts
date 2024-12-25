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

export async function postRate(token: string, productId: number, ratePost: RatePost) {
    try {
        const formData = new FormData();
        if (ratePost?.id !== undefined) {
            formData.append('id', ratePost.id.toString());
        }
        formData.append('userId', ratePost.userId);
        formData.append('productId', ratePost.productId.toString());
        formData.append('orderItemId', ratePost.orderItemId.toString());
        formData.append('rateStar', ratePost.rateStar.toString());
        formData.append('content', ratePost.content);
        formData.append('isAvailable', ratePost.isAvailable.toString());
        formData.append('parentRate', ratePost.parentRate.toString());

        ratePost.files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        ratePost.subRates.forEach((subRate, index) => {
            formData.append(`subRates[${index}]`, JSON.stringify(subRate));
        });

        const res = await axios.post(`${baseUrl}/store/rates/` + productId, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
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

export async function updateRate(token: string, productId: number, ratePost: RatePost) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/` + productId, ratePost, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
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

export async function deleteRate(token: string, rateId: number) {
    try {
        const res = await axios.delete(`${baseUrl}/store/rates/` + rateId, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.status === 204) {
            console.log("Delete rate successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function likeComment(token: string, productId: number, rateId: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/like/` + productId + '?rateId=' + rateId, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.status === 204) {
            console.log("Like successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function dislikeComment(token: string, productId: number, rateId: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/dislike/` + productId + '?rateId=' + rateId, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.status === 204) {
            console.log("Dislike successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateAvailableComment(token: string, rateId: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/rates/available/` + rateId, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
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
        const res = await axios.get(`${baseUrl}/store/rates/avg/${productId}`);
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
