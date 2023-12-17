import {
  Bellota,
  Comfortaa,
  Rajdhani,
  Raleway,
  Russo_One,
} from "next/font/google";

export const russoOne = Russo_One({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  preload: true,
});

export const comfortaa = Comfortaa({
  weight: ["300", "600"],
  subsets: ["latin", "cyrillic"],
  preload: true,
});

export const bellota = Bellota({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  preload: true,
});

export const raleway = Raleway({
  weight: "400",
  subsets: ["cyrillic", "latin"],
});
