import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('./src/config/env', () => ({
  getEnv: () => ({
    apiUrl: 'http://localhost:3500/',
  }),
}));

jest.mock('./src/services/http-common.service', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));
