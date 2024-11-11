import { useState, useEffect, useRef } from "react";

export function Toggle({
  defaultValue = false,
  values,
  labels,
  onChange = () => {},
}: {
  defaultValue?: string | boolean;
  values?: string[];
  labels?: string[];
  onChange?: (isEnabled: boolean, value: string) => void;
}) {
  if (typeof defaultValue === "string") {
    defaultValue = !!Math.max(0, (values || []).indexOf(defaultValue));
  }

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggleValue = () => {
    const v = !value;
    const index = +v;
    setValue(v);
    onChange(v, (values || [])[index]);
  };

  useEffect(() => {
    const leftEl = leftRef.current;
    const rightEl = rightRef.current;
    const bgEl = bgRef.current;
    if (leftEl && rightEl && bgEl) {
      if (value) {
        bgEl.style.left = rightEl.offsetLeft + "px";
        bgEl.style.width = rightEl.offsetWidth + "px";
      } else {
        bgEl.style.left = "";
        bgEl.style.width = leftEl.offsetWidth + "px";
      }
    }
  }, [value]);

  return (
    <div
      data-component="Toggle"
      onClick={toggleValue}
      data-enabled={value.toString()}
      className="relative flex items-center gap-2 cursor-pointer overflow-hidden bg-[#211d26] h-10 text-white border border-[#D6CBFF4D] rounded-full"
    >
      {labels && (
        <div
          ref={leftRef}
          className="relative text-white px-4 z-10 transition-all duration-100 ease-in-out"
        >
          {labels[0]}
        </div>
      )}
      {labels && (
        <div
          ref={rightRef}
          className="relative text-white px-4 z-10 transition-all duration-100 ease-in-out"
        >
          {labels[1]}
        </div>
      )}
      <div
        ref={bgRef}
        className={`absolute top-0 left-0 h-full bg-[#D6CBFF4D] rounded-full transition-all duration-100 ease-in-out`}
      ></div>
    </div>
  );
}
