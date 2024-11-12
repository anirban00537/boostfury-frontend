import {
  Poppins,
  Roboto,
  Lato,
  Montserrat,
  Raleway,
  Merriweather,
  Oswald,
  Lora,
  Nunito,
  Ubuntu,
  Rubik,
  Quattrocento,
  Bitter,
  Arvo,
  Inconsolata,
  Karla,
  Lobster,
  Pacifico,
  Vollkorn,
  Playfair,
  Roboto_Condensed,
  Roboto_Flex,
  Roboto_Mono,
  Roboto_Serif,
} from "next/font/google";

export const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["400", "700"], subsets: ["latin"] });
const raleway = Raleway({ weight: ["400", "700"], subsets: ["latin"] });
const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const oswald = Oswald({ weight: ["400", "700"], subsets: ["latin"] });
const lora = Lora({ weight: ["400", "700"], subsets: ["latin"] });
const nunito = Nunito({ weight: ["400", "700"], subsets: ["latin"] });
const ubuntu = Ubuntu({ weight: ["400", "700"], subsets: ["latin"] });
const rubik = Rubik({ weight: ["400", "700"], subsets: ["latin"] });
const quattrocento = Quattrocento({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const bitter = Bitter({ weight: ["400", "700"], subsets: ["latin"] });
const arvo = Arvo({ weight: ["400", "700"], subsets: ["latin"] });
const inconsolata = Inconsolata({ weight: ["400", "700"], subsets: ["latin"] });
const karla = Karla({ weight: ["400", "700"], subsets: ["latin"] });
const lobster = Lobster({ weight: ["400"], subsets: ["latin"] });
const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });
const vollkorn = Vollkorn({ weight: ["400", "700"], subsets: ["latin"] });

const playfair = Playfair({ weight: ["400", "700"], subsets: ["latin"] });
const roboto_condensed = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const roboto_flex = Roboto_Flex({ weight: ["400", "700"], subsets: ["latin"] });
const roboto_mono = Roboto_Mono({ weight: ["400", "700"], subsets: ["latin"] });
const roboto_serif = Roboto_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const fontOptions = [
  { name: "Poppins", font: poppins, slug: "poppins" },
  { name: "Roboto", font: roboto, slug: "roboto" },
  { name: "Lato", font: lato, slug: "lato" },
  { name: "Montserrat", font: montserrat, slug: "montserrat" },
  { name: "Raleway", font: raleway, slug: "raleway" },
  { name: "Merriweather", font: merriweather, slug: "merriweather" },
  { name: "Oswald", font: oswald, slug: "oswald" },
  { name: "Lora", font: lora, slug: "lora" },
  { name: "Nunito", font: nunito, slug: "nunito" },
  { name: "Ubuntu", font: ubuntu, slug: "ubuntu" },
  { name: "Rubik", font: rubik, slug: "rubik" },
  { name: "Quattrocento", font: quattrocento, slug: "quattrocento" },
  { name: "Bitter", font: bitter, slug: "bitter" },
  { name: "Arvo", font: arvo, slug: "arvo" },
  { name: "Inconsolata", font: inconsolata, slug: "inconsolata" },
  { name: "Karla", font: karla, slug: "karla" },
  { name: "Lobster", font: lobster, slug: "lobster" },
  { name: "Pacifico", font: pacifico, slug: "pacifico" },
  { name: "Vollkorn", font: vollkorn, slug: "vollkorn" },
  { name: "Playfair", font: playfair, slug: "playfair" },
  { name: "Roboto Condensed", font: roboto_condensed },
  { name: "Roboto Flex", font: roboto_flex, slug: "roboto_flex" },
  { name: "Roboto Mono", font: roboto_mono, slug: "roboto_mono" },
  { name: "Roboto Serif", font: roboto_serif, slug: "roboto_serif" },
];
