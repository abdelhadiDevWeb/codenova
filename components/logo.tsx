import Image from "next/image";
import Link from "next/link";

export function Logo({
  href,
  label,
  variant = "light",
  priority = false,
}: {
  href: string;
  label: string;
  variant?: "light" | "dark";
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={480}
        height={257}
        priority={priority}
        className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
      />
      <span dir="ltr" className="text-xl font-extrabold tracking-tight">
        <span className={variant === "light" ? "text-navy-900" : "text-white"}>Code</span>
        <span className={variant === "light" ? "text-brand-500" : "text-aqua-300"}>Nova</span>
      </span>
    </Link>
  );
}
