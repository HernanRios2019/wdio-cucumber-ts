import { BasePage } from "./BasePage";

// ============================================================
// CartPage — Concrete Page Object for the shopping cart
//
// OOP Pillar: INHERITANCE + POLYMORPHISM
//   waitForLoad() has its own specific condition, different
//   from all other pages — same interface, unique behavior.
// ============================================================

export class CartPage extends BasePage {
  protected readonly path: string = "/cart.html";

  private readonly selectors = {
    cartTitle: ".title",
    cartItem: ".cart_item",
    cartItemName: ".inventory_item_name",
    itemQuantity: ".cart_quantity",
    checkoutButton: '[data-test="checkout"]',
    continueShoppingButton: '[data-test="continue-shopping"]',
    removeButton: (productName: string) =>
      `[data-test="remove-${productName.toLowerCase().replace(/ /g, "-")}"]`,
  } as const;

  async waitForLoad(): Promise<void> {
    await this.waitForElementDisplayed(this.selectors.cartTitle);
  }

  async getCartItems(): Promise<string[]> {
    const elements = await browser.$$(".inventory_item_name");
    const texts: string[] = [];
    for (const el of elements) {
      texts.push(await el.getText());
    }
    return texts;
  }
  async isProductInCart(productName: string): Promise<boolean> {
    const items = await this.getCartItems();
    return items.some((name) =>
      name.toLowerCase().includes(productName.toLowerCase())
    );
  }

  async getItemCount(): Promise<number> {
    const items = await browser.$$(".cart_item");
    let count = 0;
    for (const _ of items) count++;
    return count;
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.selectors.checkoutButton);
  }
}
