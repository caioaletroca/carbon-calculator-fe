import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';
import { CarbonDataProvider, ReportProvider } from 'core/providers';
import App from './App';
import './index.scss';
import theme from 'styles';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
            <QueryClientProvider client={queryClient}>
              <CarbonDataProvider>
                <ReportProvider>
                  <App />
                </ReportProvider>
              </CarbonDataProvider>
            </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
