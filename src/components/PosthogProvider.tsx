// app/providers.tsx
"use client";

import { useCookiesConsent } from "@/hooks/useCookieConsent";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

/**
 * Provides PostHog analytics context to child components, initializing PostHog on the client side based on user cookie consent.
 *
 * Initializes the PostHog client with configuration determined by environment variables and the user's cookie consent status. Tracks page views and ensures analytics are only enabled when the required API key is present.
 *
 * @param children - The React components to be wrapped with PostHog analytics context
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { cookiesAccepted } = useCookiesConsent();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      if (!posthogKey) {
        console.warn("NEXT_PUBLIC_POSTHOG_KEY environment variable is not set");
        return;
      }
      posthog.init(posthogKey, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        persistence: cookiesAccepted ? "localStorage+cookie" : "memory",
        person_profiles: "always",
        capture_pageview: false,
        capture_pageleave: true,
      });
    }
  }, [cookiesAccepted]); // Add cookiesAccepted as dependency

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

/**
 * Sends a `$pageview` event to PostHog with the current URL whenever the route or query parameters change.
 *
 * This component does not render any UI.
 */
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
/**
 * Renders the PostHogPageView component within a React Suspense boundary to prevent client-side rendering de-optimization in Next.js.
 *
 * This ensures that usage of navigation hooks inside PostHogPageView does not trigger full client-side rendering.
 */
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
