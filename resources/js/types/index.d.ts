export interface User {
    id: number;
    name: string;
    email: string;
    discord_id?: string;
    email_verified_at?: string;
    isAdmin: boolean;
    profile_photo_path?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
