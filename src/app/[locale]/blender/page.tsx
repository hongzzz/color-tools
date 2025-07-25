'use client';

import { useState, useMemo } from 'react';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import ColorPickerInput from '@/components/ColorPickerInput';
import { useTranslations } from 'next-intl';

extend([mixPlugin]);

export default function Page() {
  const t = useTranslations('Blender');
  const [colorA, setColorA] = useState('#ff0000');
  const [colorB, setColorB] = useState('#0000ff');
  const [ratio, setRatio] = useState(0.5);

  const blendedColor = useMemo(() => {
    return colord(colorA).mix(colorB, ratio).toHex();
  }, [colorA, colorB, ratio]);

  const handleColorChange =
    (setter: (color: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      if (colord(newColor).isValid()) {
        setter(newColor);
      }
    };

  return (
    <div className="p-4 sm:p-8 bg-white rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-800">{t('title')}</h2>
      
      <div className="flex flex-col sm:flex-row justify-around items-center mb-4 space-y-4 sm:space-y-0">
        {/* Color A */}
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="colorA-picker" className="text-sm font-medium text-zinc-600">{t('colorA')}</label>
          <ColorPickerInput value={colorA} onChange={setColorA} />
          <input
            type="text"
            value={colorA}
            onChange={handleColorChange(setColorA)}
            className="w-28 mt-2 px-2 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-center text-sm"
          />
        </div>

        <div className="text-4xl font-light text-zinc-400">{t('plus')}</div>

        {/* Color B */}
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="colorB-picker" className="text-sm font-medium text-zinc-600">{t('colorB')}</label>
          <ColorPickerInput value={colorB} onChange={setColorB} />
          <input
            type="text"
            value={colorB}
            onChange={handleColorChange(setColorB)}
            className="w-28 mt-2 px-2 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-center text-sm"
          />
        </div>
      </div>

      {/* Slider */}
      <div className="my-8">
        <label htmlFor="ratio" className="block text-sm font-medium text-zinc-600 mb-2 text-center">{t('ratio', { percent: Math.round(ratio * 100) })}</label>
        <input
          type="range"
          id="ratio"
          min="0"
          max="1"
          step="0.01"
          value={ratio}
          onChange={(e) => setRatio(parseFloat(e.target.value))}
          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Result */}
      <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-zinc-600">{t('result')}</label>
        <div className="w-full h-24 mt-2 rounded-xl border border-zinc-200" style={{ backgroundColor: blendedColor }}></div>
        <div className="mt-2 text-lg font-semibold text-zinc-700">{blendedColor}</div>
      </div>
    </div>
  );
}
