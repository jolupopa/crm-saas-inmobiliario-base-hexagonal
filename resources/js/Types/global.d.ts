import { PageProps as InertiaPageProps } from '@inertiajs/core';

declare global {
    interface User {
        id: number;
        name: string;
        email: string;
        joined: string; // Formateado por Carbon en el BaseResource
    }

    type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
        auth: {
            user: User;
        };
    };
}