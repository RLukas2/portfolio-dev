import { generateSlug, stripMarkdown } from '@xbrk/utils';
import { type Token } from 'marked';

export function gfmHeadingId() {
  return {
    headerIds: false,
    useNewRenderer: true,
    renderer: {
      heading(
        // biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
        this: any,
        { tokens, depth }: { tokens: Token[]; depth: number },
      ): string {
        // Preserve inline formatting inside headings by rendering the inline tokens
        // with the built-in parser, while generating a stable slug from raw text.
        const rawText = tokens
          .map(
            (token) =>
              (token as { raw?: string; text?: string }).raw || (token as { raw?: string; text?: string }).text || '',
          )
          .join('');

        const id = generateSlug(stripMarkdown(rawText).toLowerCase());
        const innerHtml = this.parser.parseInline(tokens);
        const level = depth;

        return `<h${level} id="${id}">${innerHtml}</h${level}>\n`;
      },
    },
  };
}
