import {createRootRoute, HeadContent, Scripts, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtoolsPanel} from '@tanstack/react-router-devtools';
import {TanStackDevtools} from '@tanstack/react-devtools';

import appCss from '../styles.css?url';
import {ReactQueryDevtoolsPanel} from "@tanstack/react-query-devtools";
import * as React from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/query";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Toaster} from "sonner";
import {PageNavigation} from "@/components/page-navigation";
import {AudioProvider} from "@/contexts/audio-context";

export const Route = createRootRoute({
    head: () => ({
        title: "Aaron Will Djaba - Full Stack Developer",
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
            {
                rel: "icon",
                href: "/logo.png",
            },
        ],
    }),

    component: RootComponent,
    shellComponent: RootDocument,
});

function RootComponent() {
    return (
        <AudioProvider>
            <PageNavigation />
            <Outlet />
        </AudioProvider>
    );
}

function RootDocument({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                defaultTheme="light"
                storageKey="portfolio-ui-theme"
            >
                <html lang="en">
                <head>
                    <HeadContent/>
                </head>
                <body>
                {children}
                <TanStackDevtools
                    config={{
                        position: 'bottom-right',
                    }}
                    plugins={[
                        {
                            name: 'Tanstack Router',
                            render: <TanStackRouterDevtoolsPanel/>,
                        },
                        {
                            name: 'Tanstack Query',
                            render: <ReactQueryDevtoolsPanel/>,
                        },
                    ]}
                />
                <Toaster richColors/>
                <Scripts/>
                </body>
                </html>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
