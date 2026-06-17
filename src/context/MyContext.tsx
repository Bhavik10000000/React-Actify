import { createContext } from "react";

export type User = { name: string; email: string } | null;
export const MyContext = createContext<User>(null);
