export const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontWeight: 600,
    lineHeight: 1.25,
  },
  p: {
    marginBottom: '1rem',
  },
  a: {
    color: '#0070f3',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
} as const;
