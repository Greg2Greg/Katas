export class Stack<T> {
  private _elements: Array<T> = [];

  get length() {
    return this._elements.length;
  }

  push(element: T) {
    this._elements.push(element);
  }

  pop(): T | undefined {
    if (this._elements.length === 0) {
      return undefined;
    }

    return this._elements.pop();
  }

  peek(): T | undefined {
    return this._elements[this._elements.length - 1];
  }
}
