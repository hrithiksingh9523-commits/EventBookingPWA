import {
    defineConfig,
    devices
} from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();


export default defineConfig({

    testDir: './tests',

    timeout: 30_000,

    expect: {
        timeout: 5_000
    },

    fullyParallel: true,

    retries: process.env.CI ? 2 : 0,

    reporter: [
        ['list'],
        ['html']
    ],

    use: {

        baseURL: process.env.BASE_URL,

        headless: true,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'
    },

    projects: [

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari']
            }
        }

    ]

});