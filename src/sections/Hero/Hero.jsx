import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useLang } from '../../context/LangContext';
import { t } from '../../translations';

function Hero() {
  const { lang } = useLang()
  const tr = t[lang].hero

  const [messages, setMessages] = useState(() => {
    const initialLang = localStorage.getItem('lang') || 'es'
    return [{ from: 'IA', text: t[initialLang].hero.chatInitial }]
  })
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null); // preguntas restantes (null = desconocido)

  // Auto-scroll al último mensaje (sobre el propio contenedor, no la página)
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'Tú', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // envía/recibe la cookie de identidad (cid)
        body: JSON.stringify({ message: input })
      });

      // El backend informa de las preguntas restantes por cabecera
      const rem = res.headers.get('RateLimit-Remaining');
      if (rem !== null) setRemaining(Number(rem));

      if (!res.ok) {
        const text =
          res.status === 429 ? tr.chatLimitReached : // límite por cliente
          res.status === 503 ? tr.chatBusy :          // IA ocupada (cola llena)
          tr.chatError;
        setMessages(prev => [...prev, { from: 'IA', text }]);
        if (res.status === 429) setRemaining(0);
        return;
      }

      const data = await res.json();
      setMessages(prev => [...prev, { from: 'IA', text: data.reply || tr.chatError }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: 'IA', text: tr.chatError }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-blue-200/40 dark:bg-blue-900/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-80 w-80 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />

      {/* Content */}
      <div className="text-center max-w-3xl w-full">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 mb-4">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" aria-hidden />
          {tr.badge}
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {tr.greeting}{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Damián
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {tr.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {tr.cta}
          </Link>
        </div>

        {/* Chat */}
        <div className="mt-10 w-full max-w-2xl mx-auto">
          <div
            ref={scrollRef}
            aria-live="polite"
            className="space-y-3 max-h-[55vh] overflow-y-auto pr-1"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.from === 'Tú' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    msg.from === 'Tú' ? 'bg-blue-600 text-white' : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {msg.from === 'Tú' ? 'Tú' : 'IA'}
                </div>
                <div
                  className={`rounded-2xl px-3 py-2 text-sm max-w-[75%] text-left ${
                    msg.from === 'Tú'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-tl-none'
                      : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={tr.placeholder}
              disabled={loading || remaining === 0}
            />
            <button
              onClick={sendMessage}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold disabled:opacity-60 hover:bg-blue-700 transition-colors"
              disabled={loading || remaining === 0}
            >
              {loading ? '...' : tr.send}
            </button>
          </div>

          {remaining !== null && remaining > 0 && (
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              {tr.chatRemaining.replace('{n}', remaining)}
            </p>
          )}
          {remaining === 0 && (
            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
              {tr.chatLimitReached}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
