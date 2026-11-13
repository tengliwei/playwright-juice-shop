import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    expect: {timeout: 5_000},
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: 'html',
    forbidOnly: !!process.env.CI,
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: 
    [
        {   name: 'chromium', 
            use: { 
                ...devices['Desktop Chrome'],
                channel: process.env.CI ? undefined : 'chrome'
            },
            dependencies: ['setup']
        },
        {   name: 'setup',
            use: {
                ...devices['Desktop Chrome'],
                channel: process.env.CI ? undefined : 'chrome'
            },
            testMatch:/\.setup\.js$/
        }
    ]
})