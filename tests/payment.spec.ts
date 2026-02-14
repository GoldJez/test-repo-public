import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PaymentsPage } from '../pages/payments.page';

test.describe('Payment tests', () => {
  let loginPage: LoginPage;
  let paymentsPage: PaymentsPage;
  test.beforeEach(async ({ page }) => {
    const userId = 'testerLO';
    const userPassword = '10987654';
    loginPage = new LoginPage(page);
    paymentsPage = new PaymentsPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
    await paymentsPage.sideMenuComponent.paymentLink.click();
  });

  test(
    'simple payment',
    { tag: ['@payment', '@integration'] },
    async ({ page }) => {
      // Arrange
      const transferReceiver = 'Jan Nowak';
      const transferAccount = '12 3456 7890 1234 5678 9012 34568';
      const transferAmount = '222';
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

      // Act
      await paymentsPage.makeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount,
      );

      // Assert
      await expect(paymentsPage.messageText).toHaveText(expectedMessage);
    },
  );
});
