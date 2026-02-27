import { useLang } from '../../context/LangContext';
import { t } from '../../translations';

export default function About() {
  const { lang } = useLang()
  const tr = t[lang].about

  return (
    <section className="p-8 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{tr.title}</h1>
      <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
        {tr.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">{tr.doingTitle}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {tr.cards.map((card) => (
          <div key={card.title} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{card.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
