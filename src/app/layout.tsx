
import { DashboardLayout } from '@toolpad/core';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { Providers } from "./Providers";
import "./globals.css";
import { Suspense } from 'react';
import { auth, signIn, signOut } from '@/auth';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  const authentication = {
    signIn: async () => {
      "use server"
      await signIn();
    },
    signOut: async () => {
      "use server"
      await signOut();
    },
  };

  return (
    <html>
      <body>
        <Suspense>
          <AppRouterCacheProvider>
            <Providers authentication={authentication} session={session}>
              <DashboardLayout>
                {children}
              </DashboardLayout>
            </Providers>
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
