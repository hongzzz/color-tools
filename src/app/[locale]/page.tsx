import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        {t('title')}
      </h1>
      <p className="text-lg text-zinc-600 mt-8">
        {t('subtitle')} 
      </p>
    </div>
  );
}
