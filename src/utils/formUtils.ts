export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  // Remove non-numeric characters from the input
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");

  // Limit the length to the desired format and add hyphens accordingly
  if (number.length <= 3) return number;
  if (number.length <= 6) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length <= 9)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");

  // If the length exceeds 9 characters, truncate the input
  return number.slice(0, 9).replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
};
