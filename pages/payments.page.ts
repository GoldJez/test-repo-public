import { Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../component/side-menu.component";

export class PaymentsPage {
    transferReceiverInput: Locator;
    transferAccountInput: Locator;
    transferAmountInput: Locator;
    executeTransferButton: Locator;
    closeMessageButton: Locator;
    messageText: Locator;
    sideMenuComponent: SideMenuComponent;

    constructor(private page: Page ) {
        this.transferReceiverInput = page.getByTestId('transfer_receiver');
        this.transferAccountInput = page.getByTestId('form_account_to');
        this.transferAmountInput = page.getByTestId('form_amount');
        this.executeTransferButton = page.getByRole('button', { name: 'wykonaj przelew' });
        this.closeMessageButton = page.getByTestId('close-button');
        this.messageText = page.locator('#show_messages');  
        this.sideMenuComponent = new SideMenuComponent(page);
    }
    
    async makeTransfer(receiver: string, account: string, amount: string): Promise<void> {
        await this.transferReceiverInput.fill(receiver);
        await this.transferAccountInput.fill(account);
        await this.transferAmountInput.fill(amount);
        await this.executeTransferButton.click();
        await this.closeMessageButton.click();
    }
}