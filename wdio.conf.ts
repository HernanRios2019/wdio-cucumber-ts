import type { Options } from "@wdio/types";
import type { PickleStep, Pickle } from "@cucumber/messages";

export const config: Options.Testrunner = {
  runner: "local",

  specs: ["./features/**/*.feature"],
  exclude: [],

  maxInstances: 1,

  // @ts-ignore - WDIO v9 type conflict with goog:chromeOptions
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--headless",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--window-size=1920,1080",
        ],
      },
    },
  ],

  logLevel: "warn",
  bail: 0,
  baseUrl: "https://www.saucedemo.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "cucumber",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
      },
    ],
  ],

  cucumberOpts: {
    require: ["./step-definitions/**/*.ts"],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  afterStep: async function (
    _step: PickleStep,
    _scenario: Pickle,
    result: { passed: boolean }
  ) {
    if (result.passed === false) {
      await browser.takeScreenshot();
    }
  },
};