const users = [
  { email: "one@gmail.com", password: "password" },
  { email: "second@gmail.com", password: "12345" },
  { email: "three@gmail.com", password: "12345" },
  { email: "four@gmail.com", password: "12345" },
  { email: "five@gmail.com", password: "12345 " },
];

export const getUserByEmail = (email) => {
  const user = users?.find((user) => user.email === email);
  return user;
};
