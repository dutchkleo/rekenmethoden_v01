const TOC = [
  { href: "gebruik", label: "Gebruik" },
  { href: "cijfers", label: "Cijfers" },
  { href: "data", label: "Data" },
] as const;

export function GuidePanel({ idPrefix = "gids" }: { idPrefix?: string }) {
  const id = (name: string) => `${idPrefix}-${name}`;
  return (
    <div className="flex flex-col gap-6 px-5 py-5 text-sm leading-normal text-muted sm:px-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-subtle uppercase">Toelichting</p>
        <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-fg">
          Hoe u deze methode leest
        </h2>
        <nav className="mt-3 flex flex-wrap gap-1" aria-label="Onderdelen toelichting">
          {TOC.map((item) => (
            <a
              key={item.href}
              href={`#${id(item.href)}`}
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted transition-colors duration-150 hover:bg-bg hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <section id={id("gebruik")} className="scroll-mt-4">
        <h3 className="font-display text-lg font-medium tracking-tight text-fg">Hoe je de app gebruikt</h3>
        <p className="mt-2">
          Werk van boven naar beneden. Gele cellen zijn invoer, de rest rekent mee.
        </p>
        <ol className="mt-3 list-decimal space-y-2.5 pl-5">
          <li>
            <span className="font-medium text-fg">Afbakening</span> bovenaan: gebied, peildatum
            en prijspeil. Alles moet over hetzelfde moment gaan.
          </li>
          <li>
            <span className="font-medium text-fg">Scenario kiezen:</span> Zonder / Laag / Midden /
            Hoog / Ruim. Dat zet bedragen per volwassene en per kind.
          </li>
          <li>
            <span className="font-medium text-fg">Woningvoorraad:</span> per groep vraag (D
            <sub>g</sub>), beschikbaar, kwaliteit/geschikt, betaalbaar. De trechter neemt het
            minimum: een woning telt alleen als die er is, past én betaalbaar is.
          </li>
          <li>
            <span className="font-medium text-fg">Basisinkomen:</span> per huishoudtype overig
            inkomen, woon/energiekosten, overig minimum, en of ze al een adequate woning hebben.
            Restinkomen:
            <span className="mt-1.5 block rounded-md bg-bg px-3 py-2 font-medium text-fg">
              R = overig inkomen + basisinkomen − woon/energie − overig minimum
            </span>
            Toereikend als R ≥ 0.
          </li>
          <li>
            <span className="font-medium text-fg">Financiering:</span> aantal ontvangers,
            uitvoeringskosten, extra belasting, besparing op bestaande regelingen.
          </li>
          <li>
            Rijen toevoegen of schrappen mag. Wijzigingen blijven op dit apparaat staan (lokale
            opslag). <span className="font-medium text-fg">Voorbeeld</span> zet de dataset van v0.1
            terug.
          </li>
        </ol>
        <p className="mt-3 rounded-md bg-bg px-3 py-2 text-fg">
          Kijk altijd naar twee dingen tegelijk: de totaalscore en de laagste groepsdekking. Een
          gemiddelde kan uitsluiting verbergen.
        </p>
      </section>

      <section id={id("cijfers")} className="scroll-mt-4">
        <h3 className="font-display text-lg font-medium tracking-tight text-fg">
          Wat de cijfers nu wél en niet zijn
        </h3>
        <p className="mt-2">
          In het voorbeeldgebied (niet Nederland) bij scenario Laag (€800 per volwassene, €0 per
          kind):
        </p>
        <div className="-mx-1 mt-3 overflow-x-auto">
          <table className="w-full min-w-[18rem] text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-1.5 pr-2 font-medium">Maat</th>
                <th className="py-1.5 pr-2 font-medium">Voorbeeld</th>
                <th className="py-1.5 font-medium">Betekenis</th>
              </tr>
            </thead>
            <tbody className="text-fg">
              <tr className="border-b border-border align-top">
                <td className="py-2 pr-2">Adequate woningtoewijzing</td>
                <td className="py-2 pr-2 font-medium tabular-nums">73,2%</td>
                <td className="py-2 text-muted">2.510 van 3.430 gevraagde woningen matchen</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="py-2 pr-2">Toereikend inkomen</td>
                <td className="py-2 pr-2 font-medium tabular-nums">96,5%</td>
                <td className="py-2 text-muted">gewogen aandeel huishoudens met R ≥ 0</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="py-2 pr-2">Gezamenlijke bestaansbasis</td>
                <td className="py-2 pr-2 font-medium tabular-nums">84,8%</td>
                <td className="py-2 text-muted">adequate woning én toereikend inkomen</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="py-2 pr-2">Laagste groep</td>
                <td className="py-2 pr-2 font-medium tabular-nums">44,4%</td>
                <td className="py-2 text-muted">huishouden met beperking, Regio Oost</td>
              </tr>
              <tr className="align-top">
                <td className="py-2 pr-2">Netto publieke kosten</td>
                <td className="py-2 pr-2 font-medium tabular-nums">€61 mln</td>
                <td className="py-2 text-muted">op de kleine voorbeeldaantallen, geen Rijksbegroting</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Dat is geen oordeel over Nederland. De reeks is te klein, groepen zijn verzonnen, en
          Nederland heeft geen nationaal basisinkomen.
        </p>
        <p className="mt-3 font-medium text-fg">Wat wél bekend is, met andere definities:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            ABF/Primos 2026: woningtekort 4,6% ≈ 384.000 woningen (was 4,8% / 396.000 in 2025). Dat
            is een modelmatig kwantitatief tekort, geen matching op kwaliteit, locatie,
            toegankelijkheid en betaalbaarheid.
          </li>
          <li>
            CBS: eind 2025 circa 8,3 miljoen woningen; op 1 jan 2026 8,47 miljoen huishoudens.
          </li>
          <li>
            CBS/Nibud/SCP 2024: 3,1% van de mensen arm (551.000); circa 1,1 miljoen bijna-arm.
            Raming 2026 rond 2,6%. Armoede ≠ toereikend restinkomen ná woonlasten in deze methode.
          </li>
        </ul>
        <p className="mt-3">
          Wie 4,6% tekort omdraait naar “95,4% dekking”, meet iets anders. Deze methode is
          strenger: een lege, te dure of ontoegankelijke woning telt niet mee.
        </p>
      </section>

      <section id={id("data")} className="scroll-mt-4">
        <h3 className="font-display text-lg font-medium tracking-tight text-fg">
          Wat je nog nodig hebt voor een echte NL-score
        </h3>
        <p className="mt-2">
          Zonder onderstaande blijft het een rekenmachine, geen landsbeeld.
        </p>

        <h4 className="mt-4 font-medium text-fg">Eerst afbakenen</h4>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Populatie: heel NL, of een regio/gemeente/VvE?</li>
          <li>Eén peildatum en één prijspeil (bijv. 1-1-2026).</li>
          <li>Exclusieve groepen: elk huishouden en elke woning één keer.</li>
        </ul>

        <h4 className="mt-4 font-medium text-fg">Woningkant (trechter)</h4>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Vraag per groep: huishoudtype × regio × bijzondere behoefte (WoON, Woonbase, CBS huishoudens).</li>
          <li>Beschikbaar: BAG + leegstand, niet de hele voorraad.</li>
          <li>Geschikt/kwaliteit: energielabel (EP-Online), oppervlak, toegankelijkheid, locatie, eigendomsvorm.</li>
          <li>Betaalbaar: huur/koop + energie t.o.v. inkomen van díe groep.</li>
        </ul>
        <p className="mt-2">
          Zwakke groepen die je niet mag weglaten: starters, alleenstaande ouderen, huishoudens met
          beperking, grote gezinnen.
        </p>

        <h4 className="mt-4 font-medium text-fg">Inkomenskant</h4>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Overig inkomen per type (loon, uitkering, pensioen, toeslagen).</li>
          <li>Woon- + energielasten.</li>
          <li>Nibud-minimum voor de rest (eten, zorg, vervoer, verzekering).</li>
          <li>Vlag heeft adequate woning — anders kun je de gezamenlijke score niet maken.</li>
        </ul>

        <h4 className="mt-4 font-medium text-fg">Financiering</h4>
        <p className="mt-1.5">Alleen als je een basisinkomen-scenario wilt beprijzen.</p>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Aantal volwassenen en kinderen dat U ontvangt.</li>
          <li>Uitvoeringskosten.</li>
          <li>Extra belastingterugvloeiing.</li>
          <li>Welke regelingen verdwijnen of blijven (bijstand, kinderbijslag, huurtoeslag).</li>
        </ul>

        <h4 className="mt-4 font-medium text-fg">Bronkwaliteit</h4>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Per cel: feit / schatting / norm, plus jaartal.</li>
          <li>Onbekend is niet nul. Laat leeg en noteer waarom.</li>
        </ul>

        <p className="mt-4 rounded-md bg-bg px-3 py-2">
          Praktische volgorde: begin met één gemeente of regio, niet met heel Nederland. Vul eerst
          woninggroepen, dan huishoudtypen, dan financiering. Download desnoods het Word- en
          Excel-bestand onderaan de app als invulsjabloon.
        </p>
      </section>
    </div>
  );
}
