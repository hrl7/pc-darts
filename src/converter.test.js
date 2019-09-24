const convert = require('./converter');

test('buffer to point string', () => {
  expect(convert(Buffer.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('20-1');
  expect(convert(Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('12-1');
  expect(convert(Buffer.from([4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('14-1');
  expect(convert(Buffer.from([8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('8-1');
  expect(convert(Buffer.from([16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('7-1');
  expect(convert(Buffer.from([32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('19-1');
  expect(convert(Buffer.from([64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('16-1');
  expect(convert(Buffer.from([128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('11-1');

  expect(convert(Buffer.from([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('20-1');
  expect(convert(Buffer.from([0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('12-1');
  expect(convert(Buffer.from([0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('14-1');
  expect(convert(Buffer.from([0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('8-1');
  expect(convert(Buffer.from([0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('7-1');
  expect(convert(Buffer.from([0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('19-1');
  expect(convert(Buffer.from([0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('16-1');
  expect(convert(Buffer.from([0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('11-1');

  expect(convert(Buffer.from([0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('20-2');
  expect(convert(Buffer.from([0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('12-2');
  expect(convert(Buffer.from([0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('14-2');
  expect(convert(Buffer.from([0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('8-2');
  expect(convert(Buffer.from([0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('7-2');
  expect(convert(Buffer.from([0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('19-2');
  expect(convert(Buffer.from([0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('16-2');
  expect(convert(Buffer.from([0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('11-2');

  expect(convert(Buffer.from([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('20-3');
  expect(convert(Buffer.from([0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('12-3');
  expect(convert(Buffer.from([0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('14-3');
  expect(convert(Buffer.from([0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('8-3');
  expect(convert(Buffer.from([0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('7-3');
  expect(convert(Buffer.from([0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('19-3');
  expect(convert(Buffer.from([0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('16-3');
  expect(convert(Buffer.from([0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('11-3');

  expect(convert(Buffer.from([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('1-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('4-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('6-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('15-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('17-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('3-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('2-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0]), true)).toBe('10-3');

  expect(convert(Buffer.from([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]), true)).toBe('1-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0]), true)).toBe('4-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0]), true)).toBe('6-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0]), true)).toBe('15-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0]), true)).toBe('17-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0]), true)).toBe('3-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0]), true)).toBe('2-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0]), true)).toBe('10-2');

  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]), true)).toBe('1-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0]), true)).toBe('4-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0]), true)).toBe('6-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0]), true)).toBe('15-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0]), true)).toBe('17-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0]), true)).toBe('3-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0]), true)).toBe('2-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0]), true)).toBe('10-1');

  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]), true)).toBe('1-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0]), true)).toBe('4-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0]), true)).toBe('6-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0]), true)).toBe('15-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0]), true)).toBe('17-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0]), true)).toBe('3-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0]), true)).toBe('2-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0]), true)).toBe('10-1');

  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]), true)).toBe('9-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0]), true)).toBe('9-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0]), true)).toBe('9-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0]), true)).toBe('9-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0]), true)).toBe('13-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0]), true)).toBe('13-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0]), true)).toBe('13-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0]), true)).toBe('13-1');

  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]), true)).toBe('5-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0]), true)).toBe('5-1');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0]), true)).toBe('5-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0]), true)).toBe('5-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0]), true)).toBe('18-3');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0]), true)).toBe('18-2');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0]), true)).toBe('18-1');

  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]), true)).toBe('DB');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0]), true)).toBe('SB');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0]), true)).toBe(undefined);
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0]), true)).toBe(undefined);
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0]), true)).toBe(undefined);
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0]), true)).toBe(undefined);
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0]), true)).toBe(undefined);

  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]), true)).toBe('reset');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]), true)).toBe('reset');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4]), true)).toBe('change');
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]), true)).toBe(undefined);
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]), true)).toBe(undefined);
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32]), true)).toBe(undefined);
  expect(convert(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64]), true)).toBe(undefined);
});
