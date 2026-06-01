export class SourceFile {
  constructor(private readonly content: string) {}

  read(): string {
    return this.content;
  }
}

export class Scanner {
  scan(sourceFile: SourceFile): readonly string[] {
    const content = sourceFile.read().trim();

    if (content.length === 0) {
      return [];
    }

    return content.split(/\s+/);
  }
}

export class ProgramNode {
  constructor(
    private readonly instruction: string,
    private readonly parameters: readonly string[]
  ) {}

  getInstruction(): string {
    return this.instruction;
  }

  getParameters(): readonly string[] {
    return this.parameters;
  }
}

export class ProgramNodeBuilder {
  private instruction?: string;
  private parameters: string[] = [];

  reset(): void {
    this.instruction = undefined;
    this.parameters = [];
  }

  newCommand(instruction: string): void {
    this.instruction = instruction;
  }

  addParameter(parameter: string): void {
    this.parameters.push(parameter);
  }

  getRootNode(): ProgramNode {
    if (this.instruction === undefined) {
      throw new Error('Cannot build a program without an instruction.');
    }

    return new ProgramNode(this.instruction, [...this.parameters]);
  }
}

export class Parser {
  parse(tokens: readonly string[], builder: ProgramNodeBuilder): ProgramNode {
    const [instruction, ...parameters] = tokens;

    if (instruction === undefined) {
      throw new Error('Cannot parse an empty source file.');
    }

    builder.reset();
    builder.newCommand(instruction);
    parameters.forEach((parameter) => builder.addParameter(parameter));

    return builder.getRootNode();
  }
}

export class BytecodeStream {
  private readonly instructions: string[] = [];

  write(instruction: string): void {
    this.instructions.push(instruction);
  }

  toInstructions(): readonly string[] {
    return this.instructions;
  }

  toString(): string {
    return this.instructions.join('\n');
  }
}

export class CodeGenerator {
  generate(programNode: ProgramNode, output: BytecodeStream): void {
    output.write(`COMMAND ${programNode.getInstruction().toUpperCase()}`);

    programNode.getParameters().forEach((parameter) => {
      output.write(`PARAMETER ${parameter}`);
    });
  }
}

/*
    GoF Facade: provide one higher-level interface over a subsystem.
    The client can call Compiler.compile instead of coordinating Scanner,
    Parser, ProgramNodeBuilder, CodeGenerator and BytecodeStream by itself.
*/
export class Compiler {
  constructor(
    private readonly scanner = new Scanner(),
    private readonly parser = new Parser(),
    private readonly builder = new ProgramNodeBuilder(),
    private readonly codeGenerator = new CodeGenerator()
  ) {}

  compile(sourceFile: SourceFile, output = new BytecodeStream()): BytecodeStream {
    const tokens = this.scanner.scan(sourceFile);
    const programNode = this.parser.parse(tokens, this.builder);
    this.codeGenerator.generate(programNode, output);

    return output;
  }
}
