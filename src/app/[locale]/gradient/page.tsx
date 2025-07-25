'use client';

import { useState, useMemo } from 'react';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import ColorPickerInput from '@/components/ColorPickerInput';
import { useTranslations } from 'next-intl';

extend([mixPlugin]);

export default function Page() {
  const t = useTranslations('Gradient');
  const [startColor, setStartColor] = useState('#ff0000');
  const [endColor, setEndColor] = useState('#0000ff');
  const [steps, setSteps] = useState(10);

  const gradient = useMemo(() => {
    const start = colord(startColor);
    const end = colord(endColor);
    if (!start.isValid() || !end.isValid() || steps < 2) return [];

    return Array.from({ length: steps }, (_, i) => {
      const ratio = i / (steps - 1);
      return start.mix(end, ratio).toHex();
    });
  }, [startColor, endColor, steps]);

  const gradientCss = useMemo(() => {
    return `linear-gradient(to right, ${startColor}, ${endColor})`;
  }, [startColor, endColor]);

  return (
    <div className="p-4 sm:p-8 bg-white rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-800">{t('title')}</h2>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex flex-col items-center space-y-2">
          <label className="text-sm font-medium text-zinc-600">{t('startColor')}</label>
          <ColorPickerInput value={startColor} onChange={setStartColor} className="w-20 h-20" />
          <input 
            type="text" 
            value={startColor} 
            onChange={(e) => setStartColor(e.target.value)} 
            className="w-28 mt-2 px-2 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-center text-sm" 
          />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <label className="text-sm font-medium text-zinc-600">{t('endColor')}</label>
          <ColorPickerInput value={endColor} onChange={setEndColor} className="w-20 h-20" />
          <input 
            type="text" 
            value={endColor} 
            onChange={(e) => setEndColor(e.target.value)} 
            className="w-28 mt-2 px-2 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-center text-sm" 
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="steps" className="block text-sm font-medium text-zinc-600 mb-1">{t('steps')}</label>
        <input
          type="number"
          id="steps"
          min="2"
          max="50"
          value={steps}
          onChange={(e) => setSteps(Math.max(2, parseInt(e.target.value, 10) || 2))}
          className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-transparent sm:text-sm"
        />
      </div>

      {/* Gradient Preview */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-700 mb-2">{t('preview')}</h3>
        <div className="w-full h-24 rounded-lg" style={{ background: gradientCss }}></div>
      </div>

      {/* Gradient Steps */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-700 mb-2">{t('colors')}</h3>
        <div className="flex flex-wrap gap-2 justify-between">
          {gradient.map((color, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border border-gray-200 mr-2" style={{ backgroundColor: color }}></div>
                <span className="font-mono text-sm">{color}</span>
              </div>
              <CopyToClipboardButton textToCopy={color} className="ml-4"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
