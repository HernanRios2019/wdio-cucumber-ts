// ============================================================
// BasePage — Abstract base class for all Page Objects
//
// OOP Pillars demonstrated here:
//   • ABSTRACTION: Defines the common interface that all pages
//     must implement via abstract methods (open, waitForLoad).
//     Callers interact with pages without knowing browser internals.
//   • ENCAPSULATION: Browser interaction methods are protected,
//     preventing direct access from outside the class hierarchy.
//     Only the public API surface is exposed.
// ============================================================

export abstract class BasePage {
  // ── Encapsulation: internal state hidden from consumers ──
  private readonly defaultTimeout: number = 10000;

  // ── Abstraction: subclasses must define their own URL path ──
  protected abstract readonly path: string;

  // ── Abstraction: subclasses must implement their own load check ──
  abstract waitForLoad(): Promise<void>;

  // ── Public API — available to all consumers ──
  async open(): Promise<void> {
    await browser.url(this.path);
    await this.waitForLoad();
  }

  // ── Encapsulation: wraps WDIO's $ with a timeout default ──
  protected async findElement(
    selector: string,
    timeout: number = this.defaultTimeout
  ): Promise<WebdriverIO.Element> {
    const element = await $(selector);
    await element.waitForExist({ timeout });
    return element;
  }

  protected async clickElement(selector: string): Promise<void> {
    const element = await this.findElement(selector);
    await element.waitForClickable({ timeout: this.defaultTimeout });
    await element.click();
  }

  protected async typeIntoField(
    selector: string,
    value: string
  ): Promise<void> {
    const element = await this.findElement(selector);
    await element.clearValue();
    await element.setValue(value);
  }

  protected async getElementText(selector: string): Promise<string> {
    const element = await this.findElement(selector);
    return element.getText();
  }

  protected async isElementDisplayed(selector: string): Promise<boolean> {
    try {
      const element = await $(selector);
      return element.isDisplayed();
    } catch {
      return false;
    }
  }

  protected async waitForElementDisplayed(
    selector: string,
    timeout: number = this.defaultTimeout
  ): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
  }
}
