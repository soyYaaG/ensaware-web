/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_API_ENSAWARE: string;
	readonly VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
