import { NoStockPipe } from './no-stock.pipe';

describe('NoStockPipe', () => {
  it('create an instance', () => {
    const pipe = new NoStockPipe();
    expect(pipe).toBeTruthy();
  });
});
