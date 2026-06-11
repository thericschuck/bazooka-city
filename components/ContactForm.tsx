'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-white border border-gray-200 p-8 text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(80,109,141,0.12)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            style={{ color: 'var(--bc-steel)' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-gray-900 font-bold mb-2">Nachricht gesendet!</h3>
        <p className="text-gray-500 text-sm mb-6">Wir melden uns so schnell wie möglich bei dir.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs tracking-[0.2em] uppercase hover:underline"
          style={{ color: 'var(--bc-steel)' }}
        >
          Weitere Nachricht senden
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm px-4 py-3 outline-none focus:border-bc-steel transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6 sm:p-8">
      <h2 className="text-xs font-bold text-gray-900 tracking-[0.25em] uppercase mb-6">
        Nachricht senden
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold mb-1.5">
            Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Dein Name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold mb-1.5">
            E-Mail *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="deine@email.de"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold mb-1.5">
          Betreff
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => update('subject', e.target.value)}
          placeholder="Worum geht es?"
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold mb-1.5">
          Nachricht *
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Deine Nachricht ..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-xs mb-4">
          Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt per E-Mail.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full text-white text-xs font-bold tracking-[0.25em] uppercase py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ background: 'var(--bc-steel)' }}
      >
        {status === 'sending' ? 'Wird gesendet ...' : 'Nachricht senden →'}
      </button>
    </form>
  );
}
