import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page() {
  const headerList = await headers();
  const locale = headerList.get("x-locale");

  if (!locale) {
    return notFound();
  }

  return (
    <main>
      <h1>Locale: {locale}</h1>
    </main>
  );
}
