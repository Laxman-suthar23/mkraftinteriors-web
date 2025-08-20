"use client";

import { useEffect, useRef, useCallback } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad?: () => void;
  }
}

interface RecaptchaWrapperProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark";
  size?: "compact" | "normal" | "invisible";
  tabIndex?: number;
  className?: string;
}

export default function RecaptchaWrapper({
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = "light",
  size = "normal",
  tabIndex = 0,
  className = "",
}: RecaptchaWrapperProps) {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  const renderRecaptcha = useCallback(() => {
    if (window.grecaptcha && recaptchaRef.current) {
      try {
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          "expired-callback": onExpire,
          "error-callback": onError,
          theme,
          size,
          tabindex: tabIndex,
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        onError?.();
      }
    }
  }, [siteKey, onVerify, onExpire, onError, theme, size, tabIndex]);

  const resetRecaptcha = useCallback(() => {
    if (window.grecaptcha && widgetIdRef.current !== null) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch (error) {
        console.error("Error resetting reCAPTCHA:", error);
      }
    }
  }, []);

  const executeRecaptcha = useCallback(() => {
    if (
      window.grecaptcha &&
      widgetIdRef.current !== null &&
      size === "invisible"
    ) {
      try {
        window.grecaptcha.execute(widgetIdRef.current);
      } catch (error) {
        console.error("Error executing reCAPTCHA:", error);
      }
    }
  }, [size]);

  useEffect(() => {
    const checkRecaptcha = () => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => {
          renderRecaptcha();
        });
      }
    };

    if (window.grecaptcha) {
      checkRecaptcha();
    }

    window.onRecaptchaLoad = checkRecaptcha;

    return () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.error("Error cleaning up reCAPTCHA:", error);
        }
      }
    };
  }, [renderRecaptcha]);

  useEffect(() => {
    if (recaptchaRef.current) {
      (recaptchaRef.current as any).reset = resetRecaptcha;
      (recaptchaRef.current as any).execute = executeRecaptcha;
    }
  }, [resetRecaptcha, executeRecaptcha]);

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
        strategy="afterInteractive"
        onError={() => {
          console.error("Failed to load reCAPTCHA script");
          onError?.();
        }}
      />
      <div ref={recaptchaRef} className={`recaptcha-container ${className}`} />
    </>
  );
}

export function useRecaptcha() {
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    (recaptchaRef.current as any)?.reset?.();
  };

  const execute = () => {
    (recaptchaRef.current as any)?.execute?.();
  };

  return {
    recaptchaRef,
    reset,
    execute,
  };
}
