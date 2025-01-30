"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { useErrorToast } from "@/shared/hooks/useErrorToast";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const showErrorToast = useErrorToast();

  useEffect(() => {
    Sentry.captureException(error);
    showErrorToast("⚠️ 오류 발생", error);
  }, [error, showErrorToast]);

  return null;
}
