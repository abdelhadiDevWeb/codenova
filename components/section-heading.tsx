export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p
        className={`text-sm font-semibold tracking-widest uppercase rtl:normal-case ${
          tone === "light" ? "text-brand-600" : "text-aqua-300"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl ${
          tone === "light" ? "text-navy-900" : "text-white"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-lg leading-8 ${tone === "light" ? "text-slate-600" : "text-slate-300"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
