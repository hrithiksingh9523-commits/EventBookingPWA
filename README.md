Folder Structure - 

Responsibilities - 

tests/
    → test scenarios + assertions

pages/
    → locators + page actions/workflows

fixtures/
    → reusable Playwright fixtures / page object injection

test-data/
    → static positive/negative/boundary datasets

utils/
    → dynamic test-data generation and generic helpers

constants/
    → reusable application messages/constants

playwright.config.js
    → browser, retries, reporting, timeout, artifacts, baseURL