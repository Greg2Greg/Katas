import { Stack } from './stack.ts';

describe('Stack', () => {
  it('should be empty if no element in it', () => {
    const stack = new Stack();

    expect(stack.length).toBe(0);
  });

  it('should push an element in the stack', () => {
    const stack = new Stack();
    stack.push(10);

    expect(stack.length).toBe(1);
  });

  it('should return undefined if pop on an empty stack', () => {
    const stack = new Stack();
    const elementPopped = stack.pop();

    expect(elementPopped).toBe(undefined);
  });

  it('should pop the last element in the stack', () => {
    const stack = new Stack();
    stack.push(10);
    stack.push(20);
    const elementPopped = stack.pop();

    expect(stack.length).toBe(1);
    expect(elementPopped).toBe(20);
  });

  it('should pop the last element in the stack', () => {
    const stack = new Stack();
    stack.push(10);
    stack.push(20);
    stack.push(30);
    const elementPopped1 = stack.pop();
    const elementPopped2 = stack.pop();

    expect(stack.length).toBe(1);
    expect(elementPopped1).toBe(30);
    expect(elementPopped2).toBe(20);
  });

  it('should return the last element when I peek', () => {
    const stack = new Stack();
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);
    stack.push(50);
    stack.pop();
    stack.pop();

    expect(stack.peek()).toBe(30);
  });
});
