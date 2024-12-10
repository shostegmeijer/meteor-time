export interface Config {
    appUrl: string;
}

const { VITE_APP_BASE_URL } = import.meta.env;

export default { appUrl: VITE_APP_BASE_URL } as unknown as Config;
