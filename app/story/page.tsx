import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Story | Bazooka City',
  description:
    'Entstehung der Marke BAZOOKA CITY© und Gründer Sven Zöller.',
};

export default function StoryPage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
            <Image
              src="/Kleineslogo_Homepage.jpg"
              alt="Bazooka City Logo"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-2">
              Die Marke
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Story
            </h1>
            <p className="text-white/70 mt-3 text-sm leading-relaxed">
              Entstehung der Marke BAZOOKA CITY© und Gründer Sven Zöller
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Lead */}
        <p className="text-brand-blue font-semibold text-base sm:text-lg leading-relaxed border-l-4 border-brand-blue pl-5 mb-14">
          Die Marke BAZOOKA CITY© wurde im Jahr 2020 von Sven Zöller gegründet
          und ist seit 09.02.2021 eine eingetragene Marke.
        </p>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground tracking-tight mb-4">
            Die Entstehung der Marke
          </h2>
          <p className="text-brand-grey leading-relaxed text-sm sm:text-base">
            Ursprünglich aus der Idee heraus, eigene Designs für Freunde und
            Bekannte auf T-Shirts zu drucken, welche mit der Zeit immer mehr an
            Beliebtheit gewann, entstand der Gedanke – ein eigener Name muss her.
            Der Vorschlag der Namensgebung kam von Christian L. – BAZOOKA CITY©
            war geboren.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground tracking-tight mb-4">
            Zum Gründer selbst
          </h2>
          <p className="text-brand-grey leading-relaxed text-sm sm:text-base">
            Sven Zöller war ca. 20 Jahre im Ehrenamt als Helfer und Führungskraft
            beim THW tätig. Nach Ausbildungen, verschiedener Einsätze und
            Situationen erkannte er, dass man auch in schwierigen
            Lebenssituationen nicht aufgeben darf. Auch die Ausbildung zum Peer
            und die Zugehörigkeit bei einem SbE-Team für Einsatzkräfte
            (Stressbewältigung nach belasteten Einsätzen) prägten diese
            Einstellung.
          </p>
          <p className="text-brand-grey leading-relaxed text-sm sm:text-base mt-4">
            Seine langjährige Erfahrung als Krav Maga – Instruktor, Deeskalations-/
            Antiaggressions- und Kommunikationstrainer für Konfliktmanagement hat
            er gelernt, wie man mit Herausforderungen umgeht und sich selbst oder
            andere verteidigt – sowohl physisch als auch psychisch.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground tracking-tight mb-4">
            Die Marke
          </h2>
          <p className="text-brand-grey leading-relaxed text-sm sm:text-base">
            Es ist wichtig zu betonen, dass die Marke BAZOOKA CITY© nicht nur
            für physische Stärke steht, sondern auch in erster Linie für mentale
            Stärke und den Glauben daran, dass man trotz Schwierigkeiten
            weiterhin kämpfen kann. Die Marke soll als Symbol für Resilienz und
            des Durchhaltevermögens betrachtet werden, das Menschen daran
            erinnert, dass sie die Kontrolle über ihre eigene Situation haben und
            die Fähigkeit besitzen, diese zu verändern.
          </p>
          <p className="text-brand-grey leading-relaxed text-sm sm:text-base mt-4">
            BAZOOKA CITY© soll Menschen ermutigen, sich ihren Ängsten zu stellen,
            Hindernisse zu überwinden und ihr volles Potential auszuschöpfen. Die
            Marke will positive Botschaften, die zur persönlichen Stärkung und
            Motivation dienen, vermitteln.
          </p>
        </section>

        {/* Note */}
        <section className="bg-card border border-border p-6 sm:p-8">
          <h2 className="text-sm font-bold text-foreground tracking-[0.15em] uppercase mb-3">
            Anmerkung
          </h2>
          <p className="text-brand-grey leading-relaxed text-sm">
            Auch wenn die Namensgebung und das Logo aus der Historie heraus nicht
            mit positiven Ereignissen verknüpft werden, legt die Marke BAZOOKA
            CITY© ihren Fokus auf Stärke, Resilienz und Durchhaltevermögen, ohne
            Gewalt zu verherrlichen oder politische Botschaften zu transportieren.
          </p>
        </section>
      </article>
    </main>
  );
}
