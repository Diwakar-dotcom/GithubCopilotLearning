import { test, expect } from '../fixtures/test.fixtures';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ authenticatedPage, checkoutPage }) => {
    await checkoutPage.goto();
  });

  test('should display cart with items', async ({ checkoutPage }) => {
    const itemCount = await checkoutPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('should display correct subtotal and total', async ({ checkoutPage }) => {
    const subtotal = await checkoutPage.getSubtotal();
    const total = await checkoutPage.getTotal();
    expect(subtotal).toBeTruthy();
    expect(total).toBeTruthy();
  });

  test('should proceed to checkout', async ({ checkoutPage }) => {
    await checkoutPage.proceedToCheckout();
    await expect(checkoutPage.shippingAddress).toBeVisible();
  });

  test('should complete checkout with valid shipping address', async ({ checkoutPage }) => {
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingAddress('123 Main St, City, State 12345');
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderConfirmation('ORD-');
  });

  test('should show validation error for empty shipping address', async ({ checkoutPage }) => {
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingAddress('');
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.placeOrderButton.click();
    await expect(checkoutPage.shippingAddress).toHaveAttribute('required');
  });
});

test.describe('Checkout - Payment methods', () => {
  test('should accept credit card payment', async ({ checkoutPage }) => {
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingAddress('123 Main St, City, State 12345');
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.fillCreditCardDetails('4111111111111111', '12/25', '123');
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderConfirmation('ORD-');
  });

  test('should accept PayPal payment', async ({ checkoutPage }) => {
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingAddress('123 Main St, City, State 12345');
    await checkoutPage.selectPaymentMethod('PayPal');
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderConfirmation('ORD-');
  });
});