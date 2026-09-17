import type { Category } from "@/lib/constants";

/**
 * Category tiles for the homepage rail and the collections filter.
 *
 * `image` currently points at the seeded Google-hosted artwork. These are
 * temporary — replace each with a local file under /public/images/categories
 * once the commissioned photography lands. Swapping one is a single-line
 * change here; nothing else references these URLs.
 */
export interface CategoryTile {
  slug: Category;
  name: string;
  blurb: string;
  image: string;
}

export const categoryTiles: CategoryTile[] = [
  {
    slug: "rings",
    name: "Rings",
    blurb: "Solitaires, halos & stackable bands",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3ldPLSo2Ea8Yrj-9qSFGNSEO-he6MWDsSfh8c2kNaIlgo-7aNrS7RQWjI-DMaVdK3C3URKi2eNS1z2UrIuHz6w6rERCdwGtIYir7yWTG4RVFPTeUOKvhkJ84WK6orzTrnUBMbG2RZ302EkAhdlRQZk81E5lGTlYZsjcy738vycS4KW3kmtul0f9oYPjbidqsSXIzr1W3JQULhC7OlWQ11aOx3vqe_e7bCln5xntf0nmdbAarSlNrkZ0YdWafC9Qtla9rpgWYtyr1O",
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    blurb: "Tennis rows & architectural links",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDojDWBr7M4bHABXREt3R3YTToJtPVtPDpXiQLkL1-x4sKDRmBowgdY6c88IISgSHTl-V0WKfuJIstHka6YTiKr6pQIQCAvtR717wV7wntiMByYJOOGpNXnR_MZDdSthA712IRnHP0jdn9NRlzPQHF8IQ2RiCpBnB930G5j1ljVUH4htQs6P0xLHW0318rk8R5dMXBXn_rsfqtY-1gFR4hO9Igv-2-isb1jyaxah87i9z1rZ-ZVMWpbSAvstae0PCw0vcEJD7lVC9Cy",
  },
  {
    slug: "earrings",
    name: "Earrings",
    blurb: "Studs, drops & hoops",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm3keoWLoVcr4PHwT1zhSnRoq6RfAniN9cxNZ-fa5raY8Pw1O7IN_5BmhBsuHdLrzRKJ4OocIVPEb8Qty4GAOBQqvZnooQmnuSdsbwLAfIvyh-h8YeyOzMgujW0ETyI2bI8e6uX0rhJA-dCnazybEawRRpfbAUyTZsHqGX3euIDpkS24YErkZEIUilsWx0R8GHW7NskIZYIBaY_SE99eqAkoMeabmP-Fih9aAFDn5XooN7ennOLg9towg1sp01B5YJ-GMbpLUwN7ET",
  },
  {
    slug: "pendants",
    name: "Pendants",
    blurb: "Solitaire & cluster drops",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDu68UgAB0m9NsnDACMRthjEjmT8Ft3xuIYomi6uF26QpH_Neka_sx_A0Ce6OlG8PMxn7_F7W82u8caUOeNsac3GjXCBZGmtC9vQTTk9jcv0MrdAZDLkfpkdLW9bNNWAFCbe5997et-uR6tUD1Y7M6E52w-UXQY3ovJ-44P9i2zcYBbJkpCLPQyqI_FuVRLJm9Ay7Dgx6s1teC5_wOjmm4RmWkgNDABVGLgeG4yXXNjGSH8aacveieh4Bv1sCROkoI-P14JEZufl0x5",
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    blurb: "Tennis lines & Cuban links",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDE3QRlMYTtKO7hIL5QD44aUpV1lZCcF4uEFRWbNpVY-qHzMqbyAOc70AXgQkE9biTQfJN8L3-rCDqb3Dep7dMK4Cisk4j1_EtILBc1HGKB2bGIrWY0fCALhi1Ox1jOGMMZQwLEiyjumKqRYmTv1vrRQm7xZxKV__ZkNJdoV5IqtSYp7yBtTf4WoS2IpElLiRx4kt1pLw1Zau-6b-x75CykS3dB1SVWb9KUo70CG8p5Gd_bltESAZZ3jcPq2Cz8QOtox30BkOj2CuYE",
  },
  {
    slug: "bangles",
    name: "Bangles",
    blurb: "Pavé-set, in every gold",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1_dnfztSiYk8jZGzLjZH3ySGJp_nytwpQLn63ogPDWoLtMv78NXzxCKkDj6EbbJI2KBZ6HEQfJnWCMXXE_yDwjtrT6Z8YoMzaTcsnkW6X0aA4pjMhjRC6AUlHFdJ3UHQ56J8G0vZqjlwjEfjnfKd0fV36KGN_-9gUPSdDlNwS39R10qnfvj6lsVn-oAfiSID6ogAjWRkhykVXxUBGSbtEgOigP6UlX-2U_Og3tiYLZhwRcvyfkZ7UyEGamdQAYE-zwpfpt36fwH5J",
  },
];
