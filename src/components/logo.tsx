import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  color?: string;
  size?: number;
};

export function Logo({ className, color = "currentColor", size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="2" />
      <path
        d="M0.799988 18.6079C5.39999 20.1343 7.67999 22.2543 11.28 21.4063C17.08 20.0401 20.8 0.800003 20.8 0.800003"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M0.799988 13.3921C5.39999 11.8657 7.67999 9.74572 11.28 10.5937C17.08 11.9599 20.8 31.2 20.8 31.2"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}

