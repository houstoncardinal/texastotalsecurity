const items = [
  "Locally Owned & Operated",
  "Houston Local",
  "Licensed & Insured — LIC# B03066901",
  "Residential & Commercial",
  "24/7 Local Dispatch",
  "Locally Owned & Operated",
];

const TrustBar = () => (
  <div className="bg-white border-b border-gray-100/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-3">
            {i > 0 && <span className="text-gray-200 hidden lg:inline select-none" aria-hidden>·</span>}
            <span className="text-[11px] font-semibold text-gray-500 tracking-[0.1em] uppercase whitespace-nowrap">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustBar;
