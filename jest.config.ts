import type {Config} from 'jest';

const config: Config = {
    //setupFilesAfterEnv: ['./tests/setup-test.ts'],
    testMatch: [
        "**/?(*.)+(spec|tests).[tj]s?(x)"
    ],
};

export default config;