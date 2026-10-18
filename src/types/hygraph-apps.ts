export type HygraphAppPlatform =
  | "android"
  | "ios"
  | "windows"
  | "linux"
  | "macOs";

export type HygraphAppPortfolio = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  privacyPolicy: string | null;
  termsOfUse: string | null;
  playstoreLink: string | null;
  appstoreLink: string | null;
  tags: string[];
  supportPlatforms?: HygraphAppPlatform[];
  appIcon?: { url: string } | null;
  screens?: { url: string }[];
  updatedAt?: string;
};
