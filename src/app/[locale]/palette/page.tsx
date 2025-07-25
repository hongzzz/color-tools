'use client';

import { useState, useMemo } from 'react';
import { colord, extend } from 'colord';
import harmoniesPlugin, { HarmonyType } from 'colord/plugins/harmonies';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import ColorPickerInput from '@/components/ColorPickerInput';
import { useTranslations } from 'next-intl';

extend([harmoniesPlugin]);

export default function PaletteGenerator() {
  const t = useTranslations('Palette');
  const paletteTypes = [
    { id: 'analogous', name: t('analogous') },
    { id: 'complementary', name: t('complementary') },
    { id: 'split-complementary', name: t('splitComplementary') },
    { id: 'triadic', name: t('triadic') },
    { id: 'tetradic', name: t('tetradic') },
  ];
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [paletteType, setPaletteType] = useState<HarmonyType>('analogous');

  const palette = useMemo(() => {
    const color = colord(baseColor);
    if (!color.isValid()) return [];
    // The harmonies plugin returns the base color as part of the array
    return color.harmonies(paletteType).map(c => c.toHex());
  }, [baseColor, paletteType]);

  return (
    <div className="p-4 sm:p-8 bg-white rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-800">{t('title')}</h2>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-4 bg-zinc-50 rounded-lg">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-zinc-600">{t('baseColor')}</label>
          <ColorPickerInput value={baseColor} onChange={setBaseColor} className="w-12 h-12" />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-32 px-3 py-2 bg-white border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="paletteType" className="text-sm font-medium text-zinc-600">{t('harmony')}</label>
          <select
            id="paletteType"
            value={paletteType}
            onChange={(e) => setPaletteType(e.target.value as HarmonyType)}
            className="w-48 px-3 py-2 bg-white border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 sm:text-sm"
          >
            {paletteTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Palette Display */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {palette.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-full h-32 rounded-lg shadow-inner" style={{ backgroundColor: color }}></div>
            <div className="text-center mt-4">
              <span className="font-mono text-sm text-zinc-700">{color}</span>
              <CopyToClipboardButton textToCopy={color} className="ml-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
