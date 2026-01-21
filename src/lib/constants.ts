export const APP_CONFIG = {
  PRICING: {
    WEBSITE_PRICE: 75.99,
    SERVICE_FEE: 0.00,
    CURRENCY: 'USD',
  },
  COMPANY: {
    NAME: 'Foundrr Group',
    EMAIL: 'contact@foundrr.com',
  }
} as const;

export const getTotalPrice = () => {
    return (APP_CONFIG.PRICING.WEBSITE_PRICE + APP_CONFIG.PRICING.SERVICE_FEE).toFixed(2);
}
