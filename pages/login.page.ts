import { Locator, Page } from "@playwright/test";

export class LoginPage {
  LoginInput: Locator;
  PasswordInput: Locator;
  LoginButton: Locator;
  constructor(private page: Page) {
    this.LoginInput = page.getByTestId("login-input");
    this.PasswordInput = page.getByTestId("password-input");
    this.LoginButton = page.getByTestId("login-button");
  }

  async login(userId: string, userPassword: string) {
    await this.LoginInput.fill(userId);
    await this.PasswordInput.fill(userPassword);
    await this.LoginButton.click();
  }
}
