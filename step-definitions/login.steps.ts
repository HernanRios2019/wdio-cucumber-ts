import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

// ── Page instances — created once, reused across steps ──
const loginPage = new LoginPage();
const productsPage = new ProductsPage();

// ─────────────────────────────────────────────
// Given
// ─────────────────────────────────────────────

Given("the user is on the login page", async () => {
  await loginPage.open();
});

// ─────────────────────────────────────────────
// When
// ─────────────────────────────────────────────

When(
  "the user logs in with username {string} and password {string}",
  async (username: string, password: string) => {
    await loginPage.login(username, password);
  }
);

// ─────────────────────────────────────────────
// Then
// ─────────────────────────────────────────────

Then("the user should be redirected to the products page", async () => {
  const isOnProducts = await productsPage.isOnProductsPage();
  await expect(isOnProducts).toBe(true);
});

Then("the page title should be {string}", async (expectedTitle: string) => {
  const title = await productsPage.getPageTitle();
  await expect(title).toBe(expectedTitle);
});

Then("an error message should be displayed", async () => {
  const isDisplayed = await loginPage.isErrorDisplayed();
  await expect(isDisplayed).toBe(true);
});

Then(
  "the error message should contain {string}",
  async (expectedText: string) => {
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain(expectedText);
  }
);
