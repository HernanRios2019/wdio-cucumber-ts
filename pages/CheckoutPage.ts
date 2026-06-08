import { BasePage } from "./BasePage";

// ============================================================
// CheckoutPage — Handles both checkout steps (info + overview)
//   and the order confirmation screen.
//
// OOP Pillars: INHERITANCE + ENCAPSULATION + POLYMORPHISM
// ============================================================

export class CheckoutPage extends BasePage {
  protected readonly path: string = "/checkout-step-one.html";

  private readonly selectors = {
    // Step 1 — Shipping info
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    errorMessage: '[data-test="error"]',

    // Step 2 — Order overview
    overviewTitle: ".title",
    summarySubtotal: ".summary_subtotal_label",
    summaryTotal: ".summary_total_label",
    finishButton: '[data-test="finish"]',

    // Confirmation
    confirmationHeader: ".complete-header",
    confirmationText: ".complete-text",
    backHomeButton: '[data-test="back-to-products"]',
  } as const;

  // ── Polymorphism: unique waitForLoad for checkout step 1 ──
  async waitForLoad(): Promise<void> {
    await this.waitForElementDisplayed(this.selectors.firstNameInput);
  }

  // ── Step 1: Fill shipping info ──
  async fillShippingInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.typeIntoField(this.selectors.firstNameInput, firstName);
    await this.typeIntoField(this.selectors.lastNameInput, lastName);
    await this.typeIntoField(this.selectors.postalCodeInput, postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(this.selectors.continueButton);
  }

  async getStepOneError(): Promise<string> {
    return this.getElementText(this.selectors.errorMessage);
  }

  // ── Step 2: Overview ──
  async waitForOverview(): Promise<void> {
    await this.waitForElementDisplayed(this.selectors.finishButton);
  }

  async getSubtotal(): Promise<string> {
    return this.getElementText(this.selectors.summarySubtotal);
  }

  async getTotal(): Promise<string> {
    return this.getElementText(this.selectors.summaryTotal);
  }

  async clickFinish(): Promise<void> {
    await this.clickElement(this.selectors.finishButton);
  }

  // ── Confirmation ──
  async waitForConfirmation(): Promise<void> {
    await this.waitForElementDisplayed(this.selectors.confirmationHeader);
  }

  async getConfirmationHeader(): Promise<string> {
    return this.getElementText(this.selectors.confirmationHeader);
  }

  async isOrderConfirmed(): Promise<boolean> {
    return this.isElementDisplayed(this.selectors.confirmationHeader);
  }
}
