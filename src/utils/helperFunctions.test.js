import { formatNumber } from "./helperFunctions"

describe('formatNumber()',() => {
  describe('Converts numbers to a smaller format', () => {
    test('1000 to 1K', () => {
      const expected = '1K';
      const result = formatNumber(1000);
      expect(result).toStrictEqual(expected);
    })
    test('1200 to 1.2K', () => {
      const expected = '1.2K';
      const result = formatNumber(1200);    
      expect(result).toStrictEqual(expected);
    })
    test('1400000 to 1.4M', () => {
      const expected = '1.4M';
      const result = formatNumber(1400000);
      expect(result).toStrictEqual(expected);
    })
    test('-1500000 to -1.5M', () => {
      const expected = '-1.5M';
      const result = formatNumber(-1500000);
      expect(result).toStrictEqual(expected);
    })
  })
})