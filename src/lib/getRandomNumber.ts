
let numbers: number[] = [];
for (let i = 1001; i < 9999; i++) {
  numbers.push(i);
}

const getRandomNumber = () => {
  const code = Math.round(Math.random() * numbers.length)
  return code;
};

export default getRandomNumber;
