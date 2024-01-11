import type {Config} from 'jest';

const config: Config = {
    //setupFilesAfterEnv: ['./tests/setup-test.ts'],
    testMatch: [
        "**/tests/**/*.[jt]s?(x)", 
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
};

export default config;