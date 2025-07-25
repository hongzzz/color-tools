'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: "Converter", href: "/converter" },
  { name: "Blender", href: "/blender" },
  { name: "Contrast", href: "/contrast" },
  { name: "Gradient", href: "/gradient" },
  { name: "Palette", href: "/palette" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-5 space-y-4 sm:space-y-0">
          <Link href="/" className="text-2xl font-bold text-zinc-900 hover:text-zinc-700 transition-colors">
            Color Tools
          </Link>
          <nav className="flex flex-wrap justify-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
