import axios from 'axios';
import FormData from 'form-data';
import { slotParser } from './slotParser.js';
import { convertDateToLongFormat } from './helpers.js';
import { existingReservationConfig, slotConfig, bookingConfig, finalConfig } from '../config.js';

// First, we'll see if we already have a reservation
async function checkForExistingBooking() {
  let config = existingReservationConfig(process.env.AUTH_TOKEN);
  let venueId = process.env.VENUE_ID;
  try {
    const response = await axios.request(config);
    if (response.data.reservations[0]?.venue?.id == venueId) {
      console.log(`You already have a reservation for tonight!`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

// Then, we'll check to see if there are any reservations available
async function fetchDataAndParseSlots() {
  try {
    const response = await axios.request(slotConfig);
    console.log(
      `Checking for reservations at ${response.data.results.venues[0].venue.name} on ${convertDateToLongFormat(
        process.env.DATE
      )} for ${process.env.PARTY_SIZE} people...`
    );
    let slots = response.data.results.venues[0].slots;
    const slotId = await slotParser(slots);
    return slotId;
  } catch (error) {
    console.log(error);
  }
}

// If there are reservations available, we'll grab the booking token
async function getBookingConfig(slotId) {
  try {
    const response = await axios.request(bookingConfig(slotId));
    return response.data.book_token.value;
  } catch (error) {
    console.log(error);
  }
}

// Finally, we'll make the reservation
async function makeBooking(book_token) {
  let config = finalConfig(process.env.AUTH_TOKEN);
  const formData = new FormData();
  formData.append('struct_payment_method', JSON.stringify({ id: process.env.PAYMENT_ID }));
  formData.append('book_token', book_token);
  formData.append('source_id', 'resy.com-venue-details');

  try {
    const response = await axios.post(config.url, formData, {
      headers: {
        ...config.headers,
        ...formData.getHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export { checkForExistingBooking, fetchDataAndParseSlots, getBookingConfig, makeBooking };
