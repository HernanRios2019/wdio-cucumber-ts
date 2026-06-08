import { BasePage } from "./BasePage";

// ============================================================
// ProductsPage — Concrete Page Object for the inventory screen
//
// OOP Pillars demonstrated here:
//   • INHERITANCE: Extends BasePage, reusing protected methods.
//   • POLYMORPHISM: Overrides waitForLoad() with a different
//     wait condition than LoginPage — same method name, different
//     behavior depending on the concrete class at runtime.
// ============================================================

export class ProductsPage extends BasePage {
  protected readonly path: string = "/inventory.html";

  private readonly selectors = {
    pageTitle: ".title",
    productList: ".inventory_list",
    productItem: ".inventory_item",
    addToCartButton: (productName: string) =>
      `[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, "-")}"]`,
    cartBadge: ".shopping_cart_badge",
    cartLink: ".shopping_cart_link",
    menuButton: "#react-burger-menu-btn",
    logoutLink: "#logout_sidebar_link",
  } as const;

  // ── Polymorphism: different waitForLoad than LoginPage ──
  async waitForLoad(): Promise<void> {
    await this.waitForElementDisplayed(this.selectors.pageTitle);
    await this.waitForElementDisplayed(this.selectors.productList);
  }

  async isOnProductsPage(): Promise<boolean> {
    return this.isElementDisplayed(this.selectors.productList);
  }

  async getPageTitle(): Promise<string> {
    return this.getElementText(this.selectors.pageTitle);
  }

  async addProductToCart(productName: string): Promise<void> {
    const selector = this.selectors.addToCartButton(productName);
    await this.clickElement(selector);
  }

  async getCartCount(): Promise<number> {
    const isVisible = await this.isElementDisplayed(
      this.selectors.cartBadge
    );
    if (!isVisible) return 0;
    const text = await this.getElementText(this.selectors.cartBadge);
    return parseInt(text, 10);
  }

  async goToCart(): Promise<void> {
    await this.clickElement(this.selectors.cartLink);
  }

  async logout(): Promise<void> {
    await this.clickElement(this.selectors.menuButton);
    await this.waitForElementDisplayed(this.selectors.logoutLink);
    await this.clickElement(this.selectors.logoutLink);
  }
}
