export const users = {
  standard: {
    email: 'user@example.com',
    password: 'UserPass123!',
    username: 'Jane Doe',
  },
  admin: {
    email: 'admin@example.com',
    password: 'AdminPass123!',
    username: 'Admin User',
  },
  invalid: {
    email: 'nonexistent@example.com',
    password: 'wrongpassword',
  },
} as const;

export const checkoutData = {
  shippingAddress: '123 Main St, City, State 12345',
  creditCard: {
    number: '4111111111111111',
    expiry: '12/25',
    cvc: '123',
  },
  paymentMethods: ['Credit Card', 'PayPal', 'Debit Card'],
} as const;

export const routes = {
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  checkout: '/checkout',
  profile: '/profile',
  settings: '/settings',
  admin: '/admin',
  forgotPassword: '/forgot-password',
} as const;
