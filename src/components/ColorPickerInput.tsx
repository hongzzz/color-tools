'use client';

import { colord } from 'colord';

type ColorPickerInputProps = {
  value: string;
  onChange: (newColor: string) => void;
  className?: string;
};

export default function ColorPickerInput({ value, onChange, className = '' }: ColorPickerInputProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    if (newColor !== value) {
      onChange(newColor);
    }
  };

  const hexValue = colord(value).isValid() ? colord(value).toHex() : '#000000';

  return (
    <div className={`relative w-16 h-16 flex-shrink-0 ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden shadow-md ring-1 ring-offset-2 ring-zinc-200">
        <input
          type="color"
          value={hexValue}
          onChange={handleColorChange}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
        />
        <div
          className="w-full h-full rounded-full border-4 border-white"
          style={{ backgroundColor: hexValue }}
        ></div>
      </div>
    </div>
  );
}
