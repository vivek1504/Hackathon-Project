import { atom } from "recoil";

export const timeFrameAtom = atom({
    key: "timeFrame",
    default: "day",
});