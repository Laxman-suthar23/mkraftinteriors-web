export const Whatsapp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Outer circle */}
    <circle cx="12" cy="12" r="10" />
    {/* Chat bubble tail */}
    <path d="M7 17l-2 5 5-2" />
    {/* Phone-like inner shape */}
    <path d="M15.5 13.5c-.5.7-1.4 1.2-2.2 1-1-.2-2.3-1-3.3-2s-1.8-2.3-2-3.3c-.2-.8.3-1.7 1-2.2.3-.2.7-.3 1-.1l1 .6c.3.2.5.6.4 1-.1.4-.3.8-.6 1.1l-.2.2c.4.8 1.1 1.5 1.9 1.9l.2-.2c.3-.3.7-.5 1.1-.6.4-.1.8.1 1 .4l.6 1c.2.3.1.7-.1 1z" />
  </svg>
);