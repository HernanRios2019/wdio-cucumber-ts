// ============================================================
// Test Data — credentials and user types for SauceDemo
// Kept separate from step definitions to allow easy maintenance
// without touching test logic.
// ============================================================

export interface User {
  username: string;
  password: string;
  role: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const Users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
    role: "Standard user with full access",
  } as User,

  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
    role: "User blocked from accessing the application",
  } as User,

  invalid: {
    username: "invalid_user",
    password: "wrong_password",
    role: "Non-existent user",
  } as User,
} as const;

export const ShippingData: ShippingInfo = {
  firstName: "Juan",
  lastName: "Pérez",
  postalCode: "7000",
};

export const ErrorMessages = {
  lockedUser:
    "Epic sadface: Sorry, this user has been locked out.",
  invalidCredentials:
    "Epic sadface: Username and password do not match any user in this service",
  missingUsername: "Epic sadface: Username is required",
  missingPassword: "Epic sadface: Password is required",
} as const;
