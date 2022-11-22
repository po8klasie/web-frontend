/* global beforeEach */

beforeEach(() => {
  fetch.resetMocks();
});

it('finds exchange', async () => {
  fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));

  const rate = await convert('USD', 'CAD');

  expect(rate).toEqual(1.42);
  expect(fetch).toHaveBeenCalledTimes(1);
});
