import { transformerNotationHighlight } from "@shikijs/transformers";
import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki"; // Import the types from shiki // [!code highlight]

type Props = {
  lang?: BundledLanguage;
  theme?: BundledTheme;
  children?: string;
};

export default async function Code({
  lang = "typescript",
  theme = "dracula-soft",
  children,
}: Props) {
  if (!children) {
    return null;
  }

  const html = await codeToHtml(children.trim(), {
    lang,
    theme,
    transformers: [transformerNotationHighlight()],
  });

  return (
    <section dir="ltr" dangerouslySetInnerHTML={{ __html: html }}></section>
  );
}
