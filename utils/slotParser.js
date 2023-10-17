import { convertTimeToTwelveHourFormat, isTimeBetween } from './helpers.js';

async function slotParser(slots) {
  const numberOfSlots = slots.length;
  console.log(`There are ${numberOfSlots} slots available`);
  let slotId = null;

  for (const slot of slots) {
    let time = convertTimeToTwelveHourFormat(slot.date.start);
    const reservationType = slot.config.type;
    let isPrime = await slotChooser(slot, time, reservationType);
    if (isPrime) {
      slotId = isPrime;
      break;
    }
  }
  return slotId;
}

async function slotChooser(slot, time, type) {
  if (isTimeBetween(process.env.EARLIEST, process.env.LATEST, slot.date.start)) {
    console.log(`Booking a prime slot at ${time} ${type === 'Dining Room' ? 'in' : 'on'} the ${type}!`);
    return slot.config.token;
  }
}

export { slotParser };
