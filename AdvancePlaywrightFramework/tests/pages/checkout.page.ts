import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly cartItems: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly checkoutButton: Locator;
  readonly shippingAddress: Locator;
  readonly paymentMethod: Locator;
  readonly cardNumber: Locator;
  readonly cardExpiry: Locator;
  readonly cardCvc: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmation: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.getByTestId('cart-item');
    this.subtotal = page.getByTestId('subtotal');
    this.tax = page.getByTestId('tax');
    this.total = page.getByTestId('total');
    this.checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
    this.shippingAddress = page.getByTestId('shipping-address');
    this.paymentMethod = page.getByTestId('payment-method');
    this.cardNumber = page.getByLabel('Card number');
    this.cardExpiry = page.getByLabel('Expiry');
    this.cardCvc = page.getByLabel('CVC');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.orderConfirmation = page.getByTestId('order-confirmation');
  }

  async goto(): Promise<void> {
    await this.navigate('/checkout');
    await this.waitForPageLoad();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getSubtotal(): Promise<string> {
    return await this.getText(this.subtotal);
  }

  async getTotal(): Promise<string> {
    return await this.getText(this.total);
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
    await this.waitForPageLoad();
  }

  async fillShippingAddress(address: string): Promise<void> {
    await this.fillInput(this.shippingAddress, address);
  }

  async selectPaymentMethod(method: string): Promise<void> {
    const option = this.paymentMethod.getByRole('option', { name: method });
    await this.clickElement(option);
  }

  async fillCreditCardDetails(cardNumber: string, expiry: string, cvc: string): Promise<void> {
    await this.fillInput(this.cardNumber, cardNumber);
    await this.fillInput(this.cardExpiry, expiry);
    await this.fillInput(this.cardCvc, cvc);
  }

  async placeOrder(): Promise<void> {
    await this.clickElement(this.placeOrderButton);
    await this.waitForPageLoad();
  }

  async expectOrderConfirmation(orderId: string): Promise<void> {
    await expect(this.orderConfirmation).toBeVisible();
    await expect(this.orderConfirmation).toContainText(orderId);
  }
}