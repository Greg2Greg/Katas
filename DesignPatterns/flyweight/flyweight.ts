/*
  Flyweight lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.

  In this example, `TreeType` is the flyweight: name, color and texture are shared. Why ? Because, name, color and texture is "intrinsic state", it doesn't depend on the context of the tree, the number of combinations is limited and they are usually shared between many trees. x and y is extrinsic state, it depends on the context of the tree and they are not shared between trees. 

  `Tree` is the context: coordinates are extrinsic state and stay outside the flyweight.
  `TreeTypeFactory` guarantees that equal intrinsic state reuses the same flyweight instance ("cache" mechanism).
*/

export type TreeColor = 'green' | 'yellow' | 'red';

export type TreeDrawing = {
  x: number;
  y: number;
  name: string;
  color: TreeColor;
  texture: string;
};

export interface TreeFlyweight {
  draw(x: number, y: number): TreeDrawing;
}

export class TreeType implements TreeFlyweight {
  constructor(
    private readonly name: string,
    private readonly color: TreeColor,
    private readonly texture: string
  ) {}

  draw(x: number, y: number): TreeDrawing {
    return {
      x,
      y,
      name: this.name,
      color: this.color,
      texture: this.texture,
    };
  }
}

type TreeTypeKey = `${string}:${TreeColor}:${string}`;

export class TreeTypeFactory {
  private readonly treeTypes = new Map<TreeTypeKey, TreeType>();

  getTreeType(name: string, color: TreeColor, texture: string): TreeType {
    const key = this.buildKey(name, color, texture);
    const existingTreeType = this.treeTypes.get(key);

    if (existingTreeType !== undefined) {
      return existingTreeType;
    }

    const treeType = new TreeType(name, color, texture);
    this.treeTypes.set(key, treeType);

    return treeType;
  }

  count(): number {
    return this.treeTypes.size;
  }

  private buildKey(name: string, color: TreeColor, texture: string): TreeTypeKey {
    return `${name}:${color}:${texture}`;
  }
}

export class Tree {
  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly type: TreeFlyweight
  ) {}

  draw(): TreeDrawing {
    return this.type.draw(this.x, this.y);
  }

  getType(): TreeFlyweight {
    return this.type;
  }
}

export class Forest {
  private readonly trees: Tree[] = [];

  constructor(private readonly treeTypeFactory = new TreeTypeFactory()) {}

  plantTree(x: number, y: number, name: string, color: TreeColor, texture: string): Tree {
    const type = this.treeTypeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);

    this.trees.push(tree);

    return tree;
  }

  draw(): TreeDrawing[] {
    return this.trees.map((tree) => tree.draw());
  }

  treeCount(): number {
    return this.trees.length;
  }

  treeTypeCount(): number {
    return this.treeTypeFactory.count();
  }
}
