export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nimbus-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C9B7F2" />
          <stop offset="50%" stopColor="#9CCFD8" />
          <stop offset="100%" stopColor="#F6D8A8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="16" fill="url(#nimbus-grad)" />
      <path
        d="M24 11L34 16.5V27.5L24 33L14 27.5V16.5L24 11Z"
        fill="white"
        fillOpacity="0.55"
      />
      <path
        d="M24 11V22M24 22L34 16.5M24 22L14 16.5M24 22V33"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="22" r="2.6" fill="white" />
    </svg>
  );
}

export function Logo({ size = 40, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-semibold tracking-tight text-[var(--ink)]">
            Nimbus3D
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Dublin Print Studio
          </span>
        </span>
      )}
    </span>
  );
}
