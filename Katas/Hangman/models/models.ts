export interface Inputer {
  read(): Promise<string | undefined>;
}

export interface Outputer {
  display(output: string): void;
}
