'use client';

import { useState, useMemo } from 'react';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

extend([a11yPlugin]);

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default function Page() {
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');

  const contrastRatio = useMemo(() => {
    return colord(textColor).contrast(bgColor);
  }, [textColor, bgColor]);

  const results = useMemo(() => {
    return {
      aaLarge: contrastRatio >= 3,
      aaNormal: contrastRatio >= 4.5,
      aaaLarge: contrastRatio >= 4.5,
      aaaNormal: contrastRatio >= 7,
    };
  }, [contrastRatio]);

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contrast Checker</h2>

      {/* Preview */}
      <div 
        className="w-full h-32 rounded-lg flex items-center justify-center text-center p-4 mb-6 border border-gray-200"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div>
          <p className="text-lg">The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm">(Sample Text)</p>
        </div>
      </div>

      {/* Color Inputs */}
      <div className="flex justify-around items-center mb-6">
        <div className="flex flex-col items-center space-y-2">
          <label className="text-sm font-medium text-gray-600">Text Color</label>
          <input type="color" value={colord(textColor).toHex()} onChange={(e) => setTextColor(e.target.value)} className="w-16 h-16 p-1 border-none rounded-full cursor-pointer" />
          <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-28 mt-2 px-2 py-1 bg-gray-50 border border-gray-300 rounded-md text-center text-sm" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <label className="text-sm font-medium text-gray-600">Background Color</label>
          <input type="color" value={colord(bgColor).toHex()} onChange={(e) => setBgColor(e.target.value)} className="w-16 h-16 p-1 border-none rounded-full cursor-pointer" />
          <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-28 mt-2 px-2 py-1 bg-gray-50 border border-gray-300 rounded-md text-center text-sm" />
        </div>
      </div>

      {/* Results */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Contrast Ratio</h3>
        <p className={`text-5xl font-bold ${contrastRatio >= 4.5 ? 'text-green-600' : 'text-red-600'}`}>{contrastRatio.toFixed(2)}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-md font-semibold text-gray-700 text-center">WCAG Standards</h4>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">AA (Normal Text)</span>
          <div className="flex items-center">{results.aaNormal ? <CheckIcon /> : <XIcon />}<span className="ml-2 text-sm text-gray-500">(4.5:1)</span></div>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">AA (Large Text)</span>
          <div className="flex items-center">{results.aaLarge ? <CheckIcon /> : <XIcon />}<span className="ml-2 text-sm text-gray-500">(3:1)</span></div>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">AAA (Normal Text)</span>
          <div className="flex items-center">{results.aaaNormal ? <CheckIcon /> : <XIcon />}<span className="ml-2 text-sm text-gray-500">(7:1)</span></div>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">AAA (Large Text)</span>
          <div className="flex items-center">{results.aaaLarge ? <CheckIcon /> : <XIcon />}<span className="ml-2 text-sm text-gray-500">(4.5:1)</span></div>
        </div>
      </div>
    </div>
  );
}