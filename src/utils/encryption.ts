import Cryptr from "cryptr";

export function encrypt(text: string) {
    const secretKey = process.env.NEXTAUTH_SECRET;
    if (!secretKey) {
        throw new Error("NEXTAUTH_SECRET environment variable is not defined");
    }
    const cryptr = new Cryptr(secretKey);

    const encryptedString = cryptr.encrypt(text);
    return encryptedString;
}

export function decrypt(encryptedString: string) {
    const secretKey = process.env.NEXTAUTH_SECRET;
    if (!secretKey) {
        throw new Error("NEXTAUTH_SECRET environment variable is not defined");
    }
    const cryptr = new Cryptr(secretKey);

    const text = cryptr.decrypt(encryptedString);
    return text;
}

export function parseJwt(token: any) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
}