'use client';

import { useState, useMemo, useEffect } from 'react';
import { colord } from 'colord';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import ColorPickerInput from '@/components/ColorPickerInput';

export default function Page() {
  const [color, setColor] = useState('#000000');

  const [hexInput, setHexInput] = useState(colord(color).toHex());
  const [rgbInput, setRgbInput] = useState(() => {
    const { r, g, b } = colord(color).toRgb();
    return `${r}, ${g}, ${b}`;
  });
  const [hslInput, setHslInput] = useState(() => {
    const { h, s, l } = colord(color).toHsl();
    return `${h}, ${s}%, ${l}%`;
  });

  useEffect(() => {
    const c = colord(color);
    if (c.isValid()) {
      setHexInput(c.toHex());
      const rgb = c.toRgb();
      setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
      const hsl = c.toHsl();
      setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
    }
  }, [color]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const handleInputBlur = (value: string, type: 'hex' | 'rgb' | 'hsl') => {
    let colorString = value;
    if (type === 'rgb') {
      colorString = `rgb(${value})`;
    } else if (type === 'hsl') {
      const parts = value.split(',').map(p => p.trim());
      if (parts.length === 3) {
        const h = parts[0];
        const s = parts[1].endsWith('%') ? parts[1] : `${parts[1]}%`;
        const l = parts[2].endsWith('%') ? parts[2] : `${parts[2]}%`;
        colorString = `hsl(${h}, ${s}, ${l})`;
      } else {
        colorString = `hsl(${value})`;
      }
    }

    const c = colord(colorString);
    if (c.isValid()) {
      setColor(c.toHex());
    }
  };

  const colorData = useMemo(() => {
    return colord(color);
  }, [color]);

  return (
    <div className="p-4 sm:p-8 bg-white rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-800">Color Converter</h2>
      <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 mb-8">
        <ColorPickerInput value={color} onChange={setColor} />
        <div
          className="w-full h-16 rounded-xl"
          style={{ backgroundColor: colorData.toHex() }}
        ></div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="hex" className="block text-sm font-medium text-zinc-600 mb-1">
            HEX
          </label>
          <input
            type="text"
            id="hex"
            value={hexInput}
            onChange={(e) => handleInputChange(e, setHexInput)}
            onBlur={(e) => handleInputBlur(e.target.value, 'hex')}
            className="mt-1 block w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent sm:text-sm"
          />
          <CopyToClipboardButton textToCopy={hexInput} className="absolute right-2 top-8 px-3 py-1.5" />
        </div>
        <div className="relative">
          <label htmlFor="rgb" className="block text-sm font-medium text-zinc-600 mb-1">
            RGB
          </label>
          <input
            type="text"
            id="rgb"
            value={rgbInput}
            placeholder="e.g., 255, 99, 71"
            onChange={(e) => handleInputChange(e, setRgbInput)}
            onBlur={(e) => handleInputBlur(e.target.value, 'rgb')}
            className="mt-1 block w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent sm:text-sm"
          />
          <CopyToClipboardButton textToCopy={`rgb(${rgbInput})`} className="absolute right-2 top-8 px-3 py-1.5" />
        </div>
        <div className="relative">
          <label htmlFor="hsl" className="block text-sm font-medium text-zinc-600 mb-1">
            HSL
          </label>
          <input
            type="text"
            id="hsl"
            value={hslInput}
            placeholder="e.g., 0, 100%, 50%"
            onChange={(e) => handleInputChange(e, setHslInput)}
            onBlur={(e) => handleInputBlur(e.target.value, 'hsl')}
            className="mt-1 block w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent sm:text-sm"
          />
          <CopyToClipboardButton textToCopy={`hsl(${hslInput})`} className="absolute right-2 top-8 px-3 py-1.5" />
        </div>
      </div>
    </div>
  );
}
