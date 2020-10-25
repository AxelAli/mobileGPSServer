// Technically tests fail with the server starting, but testing typescript
const { testFn } = require("../src");

test('Typescript function works in jest', () => {
  expect(testFn()).toBe("jest works");
});
