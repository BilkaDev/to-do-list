import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme.ts';
import { CssBaseline } from '@mui/material';

type AppProvidersTypes = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: AppProvidersTypes) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
