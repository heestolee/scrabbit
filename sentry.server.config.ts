// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://9341031cd09af03ae6d3eb95d6e661b2@o4508490958045184.ingest.us.sentry.io/4508490990157824",

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: process.env.NODE_ENV === "production" ? 1.0 : 0.0,
    integrations: (integrations) => {
      return integrations.filter(
        (integration) =>
          integration.name !== "Prisma" && integration.name !== "OpenTelemetry",
      );
    },
    environment: process.env.NODE_ENV,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
