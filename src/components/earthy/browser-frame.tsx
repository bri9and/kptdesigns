export function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-earthy-stone-300 bg-earthy-cream shadow-[var(--earthy-shadow-lg)]">
      <div className="flex items-center gap-2 border-b border-earthy-stone-200 bg-earthy-stone-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 truncate rounded-full border border-earthy-stone-200 bg-earthy-cream px-3.5 py-1 font-[family-name:var(--font-earthy-body)] text-xs text-earthy-stone-600">
          {url}
        </span>
      </div>
      <div className="flex min-h-[260px] items-center justify-center bg-earthy-sand p-8">
        {children}
      </div>
    </div>
  );
}
