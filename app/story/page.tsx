import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Story | Bazooka City',
  description: 'Entstehung der Marke BAZOOKA CITY© und Gründer Sven Zöller.',
};

export default function StoryPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0)), url(/concrete.jpg)',
        backgroundSize: 'auto, cover',
        backgroundAttachment: 'local, fixed',
        backgroundPosition: 'center',
      }}
    >

      {/* Breadcrumb + header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-700">Story</span>
          </nav>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-2">Die Marke</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
            Story
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Entstehung der Marke BAZOOKA CITY© und Gründer Sven Zöller
          </p>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Lead */}
        <p className="text-sm sm:text-base font-semibold leading-relaxed border-l-4 pl-5 mb-12 text-gray-700"
          style={{ borderColor: 'var(--bc-steel)' }}>
          Die Marke BAZOOKA CITY© wurde im Jahr 2020 von Sven Zöller gegründet
          und ist seit 09.02.2021 eine eingetragene Marke.
        </p>

        {/* Sections */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8 mb-4">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">
            Die Entstehung der Marke
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Ursprünglich aus der Idee heraus, eigene Designs für Freunde und
            Bekannte auf T-Shirts zu drucken, welche mit der Zeit immer mehr an
            Beliebtheit gewann, entstand der Gedanke – ein eigener Name muss her.
            Der Vorschlag der Namensgebung kam von Christian L. – BAZOOKA CITY©
            war geboren.
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 sm:p-8 mb-4">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">
            Zum Gründer selbst
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Sven Zöller war ca. 20 Jahre im Ehrenamt als Helfer und Führungskraft
            beim THW tätig. Nach Ausbildungen, verschiedener Einsätze und
            Situationen erkannte er, dass man auch in schwierigen
            Lebenssituationen nicht aufgeben darf. Auch die Ausbildung zum Peer
            und die Zugehörigkeit bei einem SbE-Team für Einsatzkräfte
            (Stressbewältigung nach belasteten Einsätzen) prägten diese
            Einstellung.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base mt-4">
            Seine langjährige Erfahrung als Krav Maga – Instruktor, Deeskalations-/
            Antiaggressions- und Kommunikationstrainer für Konfliktmanagement hat
            er gelernt, wie man mit Herausforderungen umgeht und sich selbst oder
            andere verteidigt – sowohl physisch als auch psychisch.
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 sm:p-8 mb-4">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">
            Die Marke
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Es ist wichtig zu betonen, dass die Marke BAZOOKA CITY© nicht nur
            für physische Stärke steht, sondern auch in erster Linie für mentale
            Stärke und den Glauben daran, dass man trotz Schwierigkeiten
            weiterhin kämpfen kann. Die Marke soll als Symbol für Resilienz und
            des Durchhaltevermögens betrachtet werden, das Menschen daran
            erinnert, dass sie die Kontrolle über ihre eigene Situation haben und
            die Fähigkeit besitzen, diese zu verändern.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base mt-4">
            BAZOOKA CITY© soll Menschen ermutigen, sich ihren Ängsten zu stellen,
            Hindernisse zu überwinden und ihr volles Potential auszuschöpfen. Die
            Marke will positive Botschaften, die zur persönlichen Stärkung und
            Motivation dienen, vermitteln.
          </p>
        </div>

        {/* Note */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xs font-bold text-gray-900 tracking-[0.15em] uppercase mb-3">
            Anmerkung
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Auch wenn die Namensgebung und das Logo aus der Historie heraus nicht
            mit positiven Ereignissen verknüpft werden, legt die Marke BAZOOKA
            CITY© ihren Fokus auf Stärke, Resilienz und Durchhaltevermögen, ohne
            Gewalt zu verherrlichen oder politische Botschaften zu transportieren.
          </p>
        </div>
      </article>
    </main>
  );
}
