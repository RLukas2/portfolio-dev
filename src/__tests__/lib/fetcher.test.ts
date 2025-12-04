import fetcher from '@/lib/fetcher';

describe('fetcher', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch and parse JSON response', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => mockData,
    });

    const result = await fetcher('/api/test');
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/test', undefined);
  });

  it('should handle 204 No Content response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 204,
      json: async () => {
        throw new Error('No content');
      },
    });

    const result = await fetcher('/api/delete');
    expect(result).toEqual({});
  });

  it('should pass request options', async () => {
    const mockData = { success: true };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => mockData,
    });

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'test' }),
    };

    await fetcher('/api/create', options);
    expect(global.fetch).toHaveBeenCalledWith('/api/create', options);
  });

  it('should handle different response types', async () => {
    const mockArray = [1, 2, 3];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => mockArray,
    });

    const result = await fetcher<number[]>('/api/numbers');
    expect(result).toEqual(mockArray);
  });
});
