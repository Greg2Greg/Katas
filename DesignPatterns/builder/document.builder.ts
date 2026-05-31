export type HeadingLevel = 1 | 2;

export interface IDocument<TContent = unknown> {
  format: 'html' | 'json';
  content: TContent;
}

export interface DocumentBuilder {
  reset(): void;
  addHeading(level: HeadingLevel, text: string): void;
  addParagraph(text: string): void;
}
