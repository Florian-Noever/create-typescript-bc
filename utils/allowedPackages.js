export const scope = 'Florian-Noever';
export const projectTypes = [
    'bc-controladdin-typescript-template',
    'bc-controladdin-react-ts-template',
    'bc-controladdin-react-vite-ts-template',
    'bc-controladdin-svelte-vite-ts-template',
    'bc-controladdin-vue-vite-ts-template'
];

export const managers = {
    npm: { check: 'npm --version', install: 'npm install', lock: 'package-lock.json' },
    yarn: { check: 'yarn --version', install: 'yarn install', lock: 'yarn.lock' },
    pnpm: { check: 'pnpm --version', install: 'pnpm install', lock: 'pnpm-lock.yaml' }
};
