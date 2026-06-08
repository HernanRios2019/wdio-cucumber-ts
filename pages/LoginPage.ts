import { BasePage } from "./BasePage";

// ============================================================
// LoginPage — Concrete Page Object for the login screen
//
// OOP Pillars demonstrated here:
//   • INHERITANCE: Extends BasePage, reusing all protected
//     browser interaction methods without duplicating code.
//     LoginPage IS-A BasePage.
//   • ENCAPSULATION: Selectors are private constants — they
//     cannot be accessed or accidentally modified from outside.
// ============================================================

export class LoginPage extends BasePage {
  // ── Encapsulation: selectors hidden from consumers ──
  protected readonly path: string = "/";

  private readonly selectors = {
    usernameInput: "#user-name",
    passwordInput: "#password",
    loginButton: "#login-button",
    errorMessage: '[data-test="error"]',
    errorIcon: ".error_icon",
  } as const;

  // ── Abstraction: concrete implementation of abstract method ──
  async waitForLoad(): Promise<void> {
    await this.waitForElementDisplayed(this.selectors.loginButton);
  }

  // ── Public API — login-specific behaviors ──
  async enterUsername(username: string): Promise<void> {
    await this.typeIntoField(this.selectors.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.typeIntoField(this.selectors.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    await this.clickElement(this.selectors.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.selectors.errorMessage);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(this.selectors.errorMessage);
  }
}
