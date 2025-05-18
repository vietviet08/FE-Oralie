interface RequestOptions {
    method: string;
    headers: {
        [key: string]: string;
    };
    body?: string;
}

const sendRequest = async (
    method: string,
    endpoint: string,
    data: unknown = null,
    contentType: string | null = null
) => {
    const defaultContentType = 'application/json; charset=UTF-8';
    const requestOptions: RequestOptions = {
        method: method.toUpperCase(),
        headers: {
            'Content-type': contentType ?? defaultContentType,
        },
    };

    if (data) {
        if (data instanceof FormData) {
            delete requestOptions.headers['Content-type'];
        }
        requestOptions.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(endpoint, method === 'GET' ? undefined : requestOptions);

        if (response.type == 'cors' && response.redirected) {
            window.location.href = response.url;
        }

        return response;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

const apiClientService = {
    get: (endpoint: string) => sendRequest('GET', endpoint),
    post: (endpoint: string, data: unknown, contentType: string | null = null) => sendRequest('POST', endpoint, data, contentType),
    put: (endpoint: string, data: unknown, contentType: string | null = null) => sendRequest('PUT', endpoint, data, contentType),
    delete: (endpoint: string) => sendRequest('DELETE', endpoint),
};

export default apiClientService;