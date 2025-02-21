describe('TDD Playground', () => {
  it('should pass', () => {
    const input = [
      { name: 'Bank1', webauth: true },
      { name: 'Bank2', webauth: true },
      { name: 'Bank3', webauth: false },
      { name: 'Bank3', webauth: false },
    ];

    const filteredInput = input.filter((bank) => bank.webauth === true);

    expect(filteredInput).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Bank1' }),
        expect.objectContaining({ name: 'Bank2' }),
      ])
    );

    expectArrayOfObjectNotContainingAnyOf(
      filteredInput,
      [
        { key: 'name', value: 'Bank4' },
        { key: 'name', value: 'Bank1' },
      ],
      expect
    );
  });
});

function expectArrayOfObjectNotContainingAnyOf(
  input: any[],
  elementsToLookFor: { key: string; value: unknown }[],
  expect: (test: boolean) => { toBeFalsy: () => void }
) {
  const doesInputContainsElementsToLookFor = input.some((inputElement) => {
    return elementsToLookFor.find(
      (elementToLookFor) => elementToLookFor.value === inputElement[elementToLookFor.key]
    );
  });

  expect(doesInputContainsElementsToLookFor).toBeFalsy();
}
