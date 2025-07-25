'use client';

import { useState } from 'react';

type CopyToClipboardButtonProps = {
  textToCopy: string;
  className?: string;
};

export default function CopyToClipboardButton({ textToCopy, className }: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const baseClasses = 'text-sm font-semibold text-white bg-zinc-800 rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all px-2 py-1 ';

  return (
    <button 
      onClick={handleCopy}
      className={`${baseClasses} ${className}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
