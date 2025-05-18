import NextCors from 'nextjs-cors';
import {NextApiRequest, NextApiResponse} from "next";

export async function applyCors(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    await NextCors(req, res, {
        origin: process.env.ALLOWED_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
        credentials: true,
        maxAge: 86400,
    });
}
