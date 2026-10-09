import { TextStyle } from 'react-native';

export const TYPOGRAPHY: Record<string, TextStyle> = {
  h1: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  h3: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  body: {
    fontSize: 15,
    color: '#B3B3B3',
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    color: '#666666',
  },
  button: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
};
