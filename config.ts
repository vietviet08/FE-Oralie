import { z } from "zod";

const configSechema = z.object({
    NEXT_PUBLIC_API_URL: z.string(),
    NEX_PUBLIC_KEYCLOAK_URL: z.string(),
    NEXT_PUBLIC_URL: z.string(),
});

const configProject = configSechema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEX_PUBLIC_KEYCLOAK_URL: process.env.NEX_PUBLIC_KEYCLOAK_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

if (!configProject.success) {
    throw new Error(configProject.error.errors.join(","));
}

const evnConfig = configProject.data;

export default evnConfig;