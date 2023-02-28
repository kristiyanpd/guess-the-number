export default function generateRandomNumber(min: number, max: number) {
  return Math.trunc(Math.random() * max) + min;
}
