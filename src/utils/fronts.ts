import {
  Bellota,
  Comfortaa,
  Raleway,
  Russo_One,
  Tektur,
  Nunito_Sans,
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
  preload: true,
});

export const tektur = Tektur({
  weight: ["400", "800"],
  subsets: ["latin", "cyrillic"],
  preload: true,
});

export const nunito = Nunito_Sans({
  weight: "700",
  subsets: ["latin", "cyrillic"],
});
