export const mockAxiosRequest = jest.fn();

export const mockUserRequestInterceptor = jest.fn();

export const create = jest.fn(() => ({
  request: mockAxiosRequest,
  interceptors: {
    request: {
      use: mockUserRequestInterceptor,
    }
  }
}));

export default {
  create,
}
