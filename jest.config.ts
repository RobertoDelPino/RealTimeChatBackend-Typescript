import type {Config} from 'jest';

const config: Config = {
    setupFilesAfterEnv: ['./tests/setup-test.ts'],
};

export default config;