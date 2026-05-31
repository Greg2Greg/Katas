import { DocumentBuilder, HeadingLevel, IDocument } from './document.builder.ts';

type JsonDocumentBlock =
  | {
      type: 'heading';
      level: HeadingLevel;
      text: string;
    }
  | {
      type: 'paragraph';
      text: string;
    };

interface JsonDocumentContent {
  blocks: JsonDocumentBlock[];
}

export class HtmlDocumentBuilder implements DocumentBuilder {
  private elements: string[] = [];

  reset(): void {
    this.elements = [];
  }

  addHeading(level: HeadingLevel, text: string): void {
    this.elements.push(`<h${level}>${escapeMarkup(text)}</h${level}>`);
  }

  addParagraph(text: string): void {
    this.elements.push(`<p>${escapeMarkup(text)}</p>`);
  }

  getDocument(): IDocument<string> {
    const document: IDocument<string> = {
      format: 'html',
      content: this.elements.join('\n'),
    };

    this.reset();

    return document;
  }
}

export class JsonDocumentBuilder implements DocumentBuilder {
  private blocks: JsonDocumentBlock[] = [];

  reset(): void {
    this.blocks = [];
  }

  addHeading(level: HeadingLevel, text: string): void {
    this.blocks.push({
      type: 'heading',
      level,
      text,
    });
  }

  addParagraph(text: string): void {
    this.blocks.push({
      type: 'paragraph',
      text,
    });
  }

  getDocument(): IDocument<JsonDocumentContent> {
    const document: IDocument<JsonDocumentContent> = {
      format: 'json',
      content: {
        blocks: [...this.blocks],
      },
    };

    this.reset();

    return document;
  }
}

const escapeMarkup = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
