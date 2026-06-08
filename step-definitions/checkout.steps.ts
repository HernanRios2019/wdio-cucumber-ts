import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { Users } from "../test-data/users";

// ── Page instances ──
const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

// ─────────────────────────────────────────────
// Given
// ─────────────────────────────────────────────

Given("the user is logged in as a standard user", async () => {
  await loginPage.open();
  await loginPage.login(Users.standard.username, Users.standard.password);
  await productsPage.waitForLoad();
});

// ─────────────────────────────────────────────
// When
// ─────────────────────────────────────────────

When(
  "the user adds {string} to the cart",
  async (productName: string) => {
    await productsPage.addProductToCart(productName);
  }
);

When("the user navigates to the cart", async () => {
  await productsPage.goToCart();
  await cartPage.waitForLoad();
});

When("the user proceeds to checkout", async () => {
  await cartPage.proceedToCheckout();
  await checkoutPage.waitForLoad();
});

When(
  "the user fills in shipping info with first name {string}, last name {string}, postal code {string}",
  async (firstName: string, lastName: string, postalCode: string) => {
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
  }
);

When("the user continues to the order overview", async () => {
  await checkoutPage.clickContinue();
  await checkoutPage.waitForOverview();
});

When("the user confirms the purchase", async () => {
  await checkoutPage.clickFinish();
  await checkoutPage.waitForConfirmation();
});

// ─────────────────────────────────────────────
// Then
// ─────────────────────────────────────────────

Then(
  "the cart badge should show {int} item(s)",
  async (expectedCount: number) => {
    const count = await productsPage.getCartCount();
    await expect(count).toBe(expectedCount);
  }
);

Then(
  "the cart should contain {string}",
  async (productName: string) => {
    const isInCart = await cartPage.isProductInCart(productName);
    await expect(isInCart).toBe(true);
  }
);

Then("the order confirmation should be displayed", async () => {
  const isConfirmed = await checkoutPage.isOrderConfirmed();
  await expect(isConfirmed).toBe(true);
});

Then(
  "the confirmation message should contain {string}",
  async (expectedText: string) => {
    const header = await checkoutPage.getConfirmationHeader();
    await expect(header).toContain(expectedText);
  }
);
