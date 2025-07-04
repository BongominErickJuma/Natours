/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Qko1hFZqt3hk7XO2Mgd0FAq4qYJsZCDZPiL3yTIesm4DXaScJeYkHMQXQ3KpCbbs85ooqpprqLuJVBPNpK7SqzM00gVEmjj4d'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
