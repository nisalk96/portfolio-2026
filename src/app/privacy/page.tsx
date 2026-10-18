import { redirect } from "next/navigation";

/** Chrome Web Store and older links → CMS-backed extension privacy page. */
export default function PrivacyRedirectPage() {
  redirect("/extensions/nk-currency/privacy");
}
