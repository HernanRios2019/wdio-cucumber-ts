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
    const items = await $$(".inventory_item_name");
    return Promise.all(items.map((item) => item.getText()));
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const items = await this.getCartItems();
    return items.some((name) =>
      name.toLowerCase().includes(productName.toLowerCase())
    );
  }

  async getItemCount(): Promise<number> {
    const items = await $$(".cart_item");
    return items.length;
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.selectors.checkoutButton);
  }
}
