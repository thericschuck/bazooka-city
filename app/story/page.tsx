import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Story | Bazooka City',
  description: 'Entstehung der Marke BAZOOKA CITY© und Gründer Sven Zöller.',
};

export default function StoryPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative h-[75vh] min-h-140 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/concrete.jpg"
            alt="Bazooka City Story"
            fill
            className="object-cover brightness-40"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <span
            className="inline-block text-[10px] font-bold tracking-[0.45em] uppercase text-white px-3 py-1 mb-6"
            style={{ background: 'var(--bc-steel)' }}
          >
            Die Herkunft
          </span>
          <h1
            className="text-7xl sm:text-9xl font-black uppercase text-white leading-none tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Story
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-lg leading-relaxed border-l-4 pl-5 mb-8"
            style={{ borderColor: 'var(--bc-steel)' }}>
            Die Marke BAZOOKA CITY© steht für mentale Stärke und den unerschütterlichen
            Glauben, dass man trotz aller Widrigkeiten weiterkämpfen kann.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px" style={{ background: 'var(--bc-steel)' }} />
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: 'var(--bc-steel)' }}>
              Est. 2020
            </span>
          </div>
        </div>
      </section>

      {/* ── Entstehung ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-5">
              <p className="text-[10px] font-bold tracking-[0.45em] uppercase mb-3" style={{ color: 'var(--bc-steel)' }}>
                Die Marke
              </p>
              <h2
                className="text-4xl sm:text-5xl font-black uppercase text-gray-900 leading-tight"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Die Entstehung<br />
                <span style={{ color: 'var(--bc-steel)' }}>der Marke</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <p className="text-gray-600 leading-relaxed">
                Ursprünglich aus der Idee heraus, eigene Designs für Freunde und Bekannte auf
                T-Shirts zu drucken, welche mit der Zeit immer mehr an Beliebtheit gewann,
                entstand der Gedanke – ein eigener Name muss her.
              </p>

              {/* Quote box */}
              <div className="relative border border-gray-200 p-7 sm:p-8 bg-gray-50">
                <div
                  className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center text-white text-lg font-black"
                  style={{ background: 'var(--bc-steel)', fontFamily: 'var(--font-barlow-condensed)' }}
                >
                  ⚡
                </div>
                <p className="text-gray-800 italic text-base sm:text-lg leading-relaxed mb-4">
                  "Der Vorschlag der Namensgebung kam von Christian L. –
                  BAZOOKA CITY© war geboren."
                </p>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--bc-steel)' }}>
                  Gegründet 2020 · Sven Zöller
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                Seit dem 09.02.2021 ist BAZOOKA CITY© eine eingetragene Marke.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gründer ── */}
      <section style={{ background: '#1a1a22' }} className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Photo */}
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full"
                style={{ border: '1px solid rgba(80,109,141,0.35)' }}
              />
              <div className="relative aspect-3/4 overflow-hidden">
                <Image
                  src="/sven.png"
                  alt="Sven Zöller – Gründer Bazooka City"
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.45em] uppercase mb-3" style={{ color: 'var(--bc-steel)' }}>
                Der Gründer
              </p>
              <h2
                className="text-5xl sm:text-6xl font-black uppercase text-white leading-tight mb-8"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Sven Zöller
              </h2>

              <div className="space-y-5 mb-10">
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  Sven Zöller war ca. 20 Jahre im Ehrenamt als Helfer und Führungskraft
                  beim THW tätig. Nach Ausbildungen, verschiedener Einsätze und Situationen
                  erkannte er, dass man auch in schwierigen Lebenssituationen nicht aufgeben darf.
                </p>
                <p className="leading-relaxed text-sm sm:text-base border-l-2 pl-5" style={{ color: 'rgba(255,255,255,0.45)', borderColor: 'rgba(80,109,141,0.4)' }}>
                  Als Krav Maga – Instruktor sowie Deeskalations- und Kommunikationstrainer
                  lernte er physische und psychische Verteidigung auf höchstem Niveau. Seine
                  Erfahrung als Peer in SbE-Teams (Stressbewältigung nach belasteten Einsätzen)
                  prägt bis heute die unnachgiebige Philosophie der Marke.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border p-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <span
                    className="block text-2xl sm:text-3xl font-black uppercase text-white mb-1"
                    style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                  >
                    20+ Jahre
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Rescue Service
                  </span>
                </div>
                <div className="border p-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <span
                    className="block text-2xl sm:text-3xl font-black uppercase text-white mb-1"
                    style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                  >
                    Krav Maga
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Instructor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophie ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.45em] uppercase mb-3" style={{ color: 'var(--bc-steel)' }}>
              Was wir vertreten
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black uppercase text-gray-900"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Die Philosophie
            </h2>
          </div>

          {/* 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">

            <div className="border border-gray-200 p-7 group hover:border-bc-steel transition-colors duration-200">
              <div
                className="w-10 h-10 flex items-center justify-center mb-6 text-white text-lg"
                style={{ background: 'var(--bc-steel)' }}
              >
                ◈
              </div>
              <h3
                className="text-xl font-black uppercase text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Mentale Stärke
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                BAZOOKA CITY© steht primär für den Glauben daran, dass man trotz Schwierigkeiten
                weiterhin kämpfen kann. Ein Symbol für Resilienz.
              </p>
            </div>

            <div className="border border-gray-200 p-7 group hover:border-bc-steel transition-colors duration-200">
              <div
                className="w-10 h-10 flex items-center justify-center mb-6 text-white text-lg"
                style={{ background: 'var(--bc-steel)' }}
              >
                ▲
              </div>
              <h3
                className="text-xl font-black uppercase text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Potential
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Wir ermutigen Menschen, sich ihren Ängsten zu stellen, Hindernisse zu überwinden
                und ihr volles Potential auszuschöpfen.
              </p>
            </div>

            <div className="border border-gray-200 p-7 group hover:border-bc-steel transition-colors duration-200">
              <div
                className="w-10 h-10 flex items-center justify-center mb-6 text-white text-lg"
                style={{ background: 'var(--bc-steel)' }}
              >
                ✦
              </div>
              <h3
                className="text-xl font-black uppercase text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Verantwortung
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Unsere Marke fokussiert sich auf Stärke ohne Gewalt zu verherrlichen.
                Wir vermitteln positive Botschaften zur persönlichen Stärkung.
              </p>
            </div>
          </div>

          {/* Big quote */}
          <div className="border-y-2 py-10 sm:py-12 text-center" style={{ borderColor: 'var(--bc-steel)' }}>
            <p
              className="text-xl sm:text-2xl font-black uppercase text-gray-900 max-w-4xl mx-auto leading-tight"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              "BAZOOKA CITY© erinnert Menschen daran, dass sie die Kontrolle über ihre
              eigene Situation haben und die Fähigkeit besitzen, diese zu verändern."
            </p>
          </div>

          {/* Note */}
          <div className="mt-10 p-6 bg-gray-50 border border-gray-200">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">Anmerkung</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Auch wenn die Namensgebung und das Logo aus der Historie heraus nicht mit positiven
              Ereignissen verknüpft werden, legt die Marke BAZOOKA CITY© ihren Fokus auf Stärke,
              Resilienz und Durchhaltevermögen, ohne Gewalt zu verherrlichen oder politische
              Botschaften zu transportieren.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#1a1a22' }} className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.45em] uppercase mb-2" style={{ color: 'var(--bc-steel)' }}>
              Kollektion
            </p>
            <h3
              className="text-3xl sm:text-4xl font-black uppercase text-white"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Trage die Philosophie.
            </h3>
          </div>
          <Link
            href="/shop"
            className="shrink-0 inline-flex items-center text-xs font-bold tracking-[0.3em] uppercase text-white px-8 py-4 hover:opacity-85 transition-opacity"
            style={{ background: 'var(--bc-steel)' }}
          >
            Zum Shop →
          </Link>
        </div>
      </section>

    </main>
  );
}
