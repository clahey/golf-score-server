
import { DashboardLayout } from '@toolpad/core';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { ApolloWrapper } from "./ApolloWrapper";
import { BRANDING } from './branding';
import "./globals.css";
import { NAVIGATION } from './navigation';
import { Suspense } from 'react';
import { auth, signIn, signOut } from '@/auth';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  const authentication = {
    signIn: async () => {
      await signIn()
    },
    signOut: async () => {
      await signOut()
    },
  };

  return (
    <html>
      <body>
        <Suspense>
          <AppRouterCacheProvider>
            <AppProvider navigation={NAVIGATION} branding={BRANDING} authentication={authentication} session={session}>
              <ApolloWrapper>
                <DashboardLayout>
                  {children}
                </DashboardLayout>
              </ApolloWrapper>
            </AppProvider>
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
