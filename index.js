import {
  checkForExistingBooking,
  getBookingConfig,
  makeBooking,
  fetchDataAndParseSlots,
} from './utils/bookingLogic.js';

import { checkTokenExpiration } from './utils/helpers.js';

// Run the script
let token = await checkTokenExpiration(process.env.AUTH_TOKEN);
if (token) {
  let existingBooking = await checkForExistingBooking();
  if (!existingBooking) {
    let slots = await fetchDataAndParseSlots();

    if (slots) {
      let bookToken = await getBookingConfig(slots);
      let booking = await makeBooking(bookToken);
      if (booking.resy_token) {
        console.log(`You've got a reservation!`);
      } else {
        console.log(`Something went to 💩`);
      }
    }
  }
}
