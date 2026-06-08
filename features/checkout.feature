Feature: Shopping Cart and Checkout
  As a logged-in user of SauceDemo
  I want to add products to my cart and complete a purchase
  So that I can successfully buy items from the store

  Background:
    Given the user is logged in as a standard user

  @smoke @checkout
  Scenario: Add a single product to the cart
    When the user adds "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1 item
    When the user navigates to the cart
    And the cart should contain "Sauce Labs Backpack"

  @smoke @checkout
  Scenario: Complete a full purchase successfully
    When the user adds "Sauce Labs Bike Light" to the cart
    And the user adds "Sauce Labs Bolt T-Shirt" to the cart
    And the user navigates to the cart
    And the user proceeds to checkout
    And the user fills in shipping info with first name "Juan", last name "Perez", postal code "7000"
    And the user continues to the order overview
    And the user confirms the purchase
    Then the order confirmation should be displayed
    And the confirmation message should contain "Thank you for your order"

  @checkout
  Scenario: Cart persists multiple products
    When the user adds "Sauce Labs Fleece Jacket" to the cart
    And the user adds "Sauce Labs Onesie" to the cart
    Then the cart badge should show 2 items
    When the user navigates to the cart
    Then the cart should contain "Sauce Labs Fleece Jacket"
    And the cart should contain "Sauce Labs Onesie"
