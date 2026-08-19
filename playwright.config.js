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
      ['html'],
      ['json', { outputFile: 'test-results/results.json' }]
    ],

    use: {

        baseURL: process.env.BASE_URL || 'http://localhost:3000',

        headless: true,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'
    },

    // Start and wait for the web server before running tests (helpful in CI)
    webServer: {
        command: 'npm run start',
        port: 3000,
        timeout: 120_000,
        reuseExistingServer: true
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