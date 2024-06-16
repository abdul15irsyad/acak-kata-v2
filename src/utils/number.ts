export const randomInt = (min = 0, max = 10) => Math.round(Math.random() * (max - min)) + min;

export const generateRandomNumber = (digit = 10) => {
  const random = Math.floor(Math.random() * 10 ** digit); // Up to 15 digits
  const numberString = random.toString().padStart(16, '0');
  return Number(numberString);
};
