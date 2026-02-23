/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly glob: (pattern: string) => Record<string, () => Promise<any>>;
}