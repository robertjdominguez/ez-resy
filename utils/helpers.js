function convertTimeToTwelveHourFormat(time) {
  const timeString = time.split(' ')[1];
  const [hour, minutes] = timeString.split(':');
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${suffix}`;
}

function convertDateToLongFormat(date) {
  const dateArray = date.split('-');
  const [year, month, day] = dateArray;
  const dateObject = new Date(year, month - 1, day);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('en-US', options);
}

function isTimeBetween(startTime, endTime, dateString) {
  let targetTime = dateString.split(' ')[1];

  // Convert times to minutes since midnight
  const convertToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);
  const targetMinutes = convertToMinutes(targetTime);

  return targetMinutes >= startMinutes && targetMinutes <= endMinutes;
}

function checkForExistingBooking() {}

export { convertTimeToTwelveHourFormat, convertDateToLongFormat, isTimeBetween };
