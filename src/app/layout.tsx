
import { DashboardLayout } from '@toolpad/core';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { ApolloWrapper } from "./ApolloWrapper";
import { BRANDING } from './branding';
import "./globals.css";
import { NAVIGATION } from './navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <AppProvider navigation={NAVIGATION} branding={BRANDING}>
            <ApolloWrapper>
              <DashboardLayout>
                {children}
              </DashboardLayout>
            </ApolloWrapper>
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
