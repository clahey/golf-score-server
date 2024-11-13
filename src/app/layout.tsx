
import { DashboardLayout } from '@toolpad/core';
import { AppProvider } from '@toolpad/core/nextjs';

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
        <AppProvider navigation={NAVIGATION} branding={BRANDING}>
          <ApolloWrapper>
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </ApolloWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
