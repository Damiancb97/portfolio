import { Link } from 'react-router-dom';
import { useState } from 'react';

function Hero() {
  const [messages, setMessages] = useState([
    { from: 'IA', text: '¡Hola! Pregúntame lo que quieras sobre Damián.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const aiMsg = { from: 'IA', text: data.reply || data };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: 'IA', text: 'Error: no pude conectar con la IA.' }]);
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

      {/* Content */}
      <div className="text-center max-w-3xl w-full">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-4">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" aria-hidden />
          Integración IA activa
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          ¡Hola! 👋 Soy{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Damián
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Desarrollador full‑stack apasionado por crear aplicaciones eficientes y visualmente atractivas.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Ver proyectos
          </Link>
        </div>

        {/* Chat */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.from === 'Tú' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    msg.from === 'Tú' ? 'bg-blue-600 text-white' : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {msg.from === 'Tú' ? 'Tú' : 'IA'}
                </div>
                <div
                  className={`rounded-2xl px-3 py-2 text-sm max-w-[75%] ${
                    msg.from === 'Tú'
                      ? 'bg-gray-100 text-gray-700 rounded-tl-none'
                      : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
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
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold disabled:opacity-60"
              disabled={loading}
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
