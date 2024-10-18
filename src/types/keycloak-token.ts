export interface KeycloakToken {
    exp: number;
    iat: number;
    realm_access?: {
        roles: string[];
    };
}
