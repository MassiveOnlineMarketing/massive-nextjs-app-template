/**
 * Gets the appropriate greeting based on the current hour.
 *
 * @returns {string} The greeting message.
 */
export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};
