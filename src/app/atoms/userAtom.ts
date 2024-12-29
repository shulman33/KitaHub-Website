import { atom } from "jotai";

export interface GlobalUser {
  firstName: string;
  lastName: string;
  role: string;
  schoolEmail: string;
  id: string;
  auth0UserId: string;
}

export const userAtom = atom<GlobalUser | null>(null);
