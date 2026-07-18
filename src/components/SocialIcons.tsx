export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8.9 19.7L4 20Z" />
      <path d="M8.7 9.3c-.2.9 0 1.9.9 3 .9 1.1 1.9 1.8 3 2.2.4.1.8 0 1-.3l.6-.8c.2-.3.5-.3.8-.2l1.6.8c.3.2.4.5.3.8-.3.9-1.2 1.5-2.2 1.4-2-.2-4-1.3-5.4-2.9-1.4-1.6-2.1-3.5-2-5.4 0-1 .7-1.8 1.6-2 .3-.1.6.1.7.4l.6 1.7c.1.3.1.6-.1.8l-.4.5Z" />
    </svg>
  );
}

export function ZaloIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.5C4 7.8 7.8 4 12.5 4S21 7.8 21 12.5 17.2 21 12.5 21c-1.3 0-2.6-.3-3.7-.9L4 21l1.1-4.2c-.7-1.2-1.1-2.7-1.1-4.3Z" />
      <path d="M9 10.2h3.6M9 13.8h4.8" strokeWidth={1.4} />
    </svg>
  );
}

export function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path
        d="M13.6 9.1h1.6V6.6h-1.8c-1.7 0-2.9 1.2-2.9 2.9v1.4H8.9v2.5h1.6V18h2.5v-4.6h1.7l.3-2.5h-2v-1.1c0-.4.3-.7.6-.7z"
        fill="currentColor"
      />
    </svg>
  );
}
