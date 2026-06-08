Feature: User Authentication
  As a registered user of SauceDemo
  I want to be able to log in and out of the application
  So that I can access the product catalog securely

  Background:
    Given the user is on the login page

  @smoke @login
  Scenario: Successful login with valid credentials
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be redirected to the products page
    And the page title should be "Products"

  @login @negative
  Scenario: Login fails with locked out user
    When the user logs in with username "locked_out_user" and password "secret_sauce"
    Then an error message should be displayed
    And the error message should contain "Sorry, this user has been locked out"

  @login @negative
  Scenario: Login fails with invalid credentials
    When the user logs in with username "invalid_user" and password "wrong_password"
    Then an error message should be displayed
    And the error message should contain "Username and password do not match"

  @login @negative
  Scenario Outline: Login fails when required fields are missing
    When the user logs in with username "<username>" and password "<password>"
    Then an error message should be displayed
    And the error message should contain "<expectedError>"

    Examples:
      | username      | password     | expectedError          |
      |               | secret_sauce | Username is required   |
      | standard_user |              | Password is required   |
