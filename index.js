import { checkForExistingBooking, getBookingConfig, makeBooking } from './utils/bookingLogic.js';
import { fetchDataAndParseSlots } from './utils/bookingLogic.js';

// Run the script
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
