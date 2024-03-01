export type User = {
  id: number;
  name: string;
  email: string;
};

export const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
};
