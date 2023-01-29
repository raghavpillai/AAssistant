import { atom } from "recoil";

export const flightNumberAtom = atom({
    key: 'flightNumber',
    default: "AA 1511",
})