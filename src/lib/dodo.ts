import DodoPayments from 'dodopayments';

export const dodo = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY, // This is your API key
    environment: process.env.NODE_ENV === 'production' ? 'live' : 'test_mode', // Defaults to 'live'
});
