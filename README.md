# wdio-cucumber-ts

This project automates end-to-end scenarios for the SauceDemo website using WebdriverIO, Cucumber, and TypeScript.

## Automated Scenarios

The automated coverage focuses on the Login and Checkout flows because they are core features for any e-commerce application.

### Login

The login scenarios validate that users can access the application securely and that the system handles invalid authentication attempts correctly. The selected scenarios include:

- Successful login with valid credentials.
- Login failure for a locked-out user.
- Login failure with invalid credentials.
- Login validation when required fields are missing.

These scenarios were selected because authentication is the entry point to the application. If login is broken, users cannot access the product catalog or continue with the purchase flow.

### Checkout

The checkout scenarios validate the main purchasing journey, from adding products to the cart to completing an order. The selected scenarios include:

- Adding a single product to the cart.
- Completing a full purchase successfully.
- Verifying that the cart persists multiple products.

These scenarios were selected because checkout is one of the most critical business flows in an e-commerce platform. It directly impacts the user experience and the ability to complete purchases.

## Framework Structure

The tests were implemented using the Page Object Model pattern to improve reusability, readability, and maintainability. Each page of the application is represented by a dedicated class under the `pages/` folder, while the Cucumber step definitions are kept under `step-definitions/`.

The framework is organized as follows:

- `features/`: Cucumber feature files written in Gherkin.
- `step-definitions/`: Step implementations that connect Gherkin steps with automation code.
- `pages/`: Page Object classes that encapsulate selectors and browser interactions.
- `test-data/`: Reusable test data used by the scenarios.
- `wdio.conf.ts`: WebdriverIO configuration, including Cucumber and reporter setup.

The Page Object Model implementation applies the four pillars of Object-Oriented Programming:

- Abstraction: `BasePage` defines common page behavior and requires each page to implement its own load validation.
- Encapsulation: selectors and browser interactions are kept inside Page Object classes, exposing only meaningful actions to the tests.
- Inheritance: page classes reuse shared functionality by extending `BasePage`.
- Polymorphism: each page provides its own implementation of page-specific behavior while following the same base structure.

This structure keeps the feature files focused on business behavior, while the technical details of interacting with the browser remain isolated in reusable page objects.
