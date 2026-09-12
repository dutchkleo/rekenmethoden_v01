# Rekenmethode 0.1 — adequate woningvoorraad én basisinkomen

**Dit is een methode om woningtekort en armoede bespreekbaar te maken, zodat er naar oplossingen gezocht wordt. Het is geen oordeel over Nederland.**

Woningnood en bestaanszekerheid worden vaak in slogans gevoerd: te weinig woningen, te lage inkomens, wel of geen basisinkomen. Daarmee verdwijnt het gesprek over *wat we eigenlijk meten* — en dus over wat er wél te doen is.

Deze publicatie zet daar een open rekenwijze tegenover. Versie 0.1 is een eerste werkversie ter toetsing. Ze rekent in woningen, huishoudens en euro’s, niet in rapportcijfers.

## Waarom publiceren

Bestaande maten zijn nuttig, maar ze praten langs elkaar heen.

- Het **woningtekort** (ABF/Primos 2026: 4,6%, ongeveer 384.000 woningen) is een kwantitatief model. Het zegt niet of een woning past, toegankelijk is of betaalbaar.
- **Armoede** (CBS/Nibud/SCP 2024: 3,1% van de mensen; circa 1,1 miljoen bijna-arm) is iets anders dan toereikend restinkomen ná woon- en energielasten.

Wie 4,6% tekort omdraait naar “95,4% dekking”, meet iets anders dan deze methode. Een lege, te dure of ontoegankelijke woning telt hier niet mee.

De waarde van deze app is de **vraag die hij afdwingt**. Hij koppelt drie dingen die in het debat meestal door elkaar lopen:

1. Past de woning bij het huishouden (beschikbaar, geschikt, betaalbaar)?
2. Blijft er na woonlasten genoeg over om van te leven?
3. Geldt dat voor **dezelfde** huishoudens?

Die derde vraag — de gezamenlijke bestaansbasis — maakt zichtbaar waar een gemiddelde uitsluiting verbergt. Oplossingen worden dan concreet: extra passende woningen in een groep, lagere woonlasten, of inkomen. Niet “meer in het algemeen”.

Publiceer dit daarom als **v0.1 ter toetsing**: dit rekent; dit is geen landscijfer. Screenshots van 73,2% of €61 mln reizen zonder toelichting. De belofte hoort in de eerste zin te staan.

## Wat de voorbeeldcijfers wél en niet zijn

De webapp opent met een **illustratief voorbeeldgebied**, niet met Nederland. Bij scenario Laag (€800 per volwassene, €0 per kind):

| Maat | Voorbeeld | Betekenis |
| --- | --- | --- |
| Adequate woningtoewijzing | 73,2% | 2.510 van 3.430 gevraagde woningen matchen |
| Toereikend inkomen | 96,5% | gewogen aandeel huishoudens met restinkomen ≥ 0 |
| Gezamenlijke bestaansbasis | 84,8% | adequate woning én toereikend inkomen |
| Laagste groep | 44,4% | huishouden met beperking, Regio Oost |
| Netto publieke kosten | €61 mln | speelgeld op kleine aantallen, geen Rijksbegroting |

Nederland heeft geen nationaal basisinkomen. De reeks is te klein en de groepen zijn verzonnen. Zonder echte data van één gemeente of regio blijft het een rekenmachine, geen landsbeeld.

De eerste serieuze casus — een gemeente, een regio, een VvE — tilt dit van denkoefening naar instrument. Wacht niet op perfecte landelijke data. Begin klein, met exclusieve groepen en één peildatum.

## Hoe de methode rekent

**Woningkant.** Per groep: vraag → beschikbaar → kwaliteit/geschikt → betaalbaar. De trechter neemt het minimum. Een woning telt alleen als die er is, past én betaalbaar is.

**Inkomenskant.** Restinkomen:

`R = overig inkomen + basisinkomen − woon/energie − overig minimum`

Toereikend als `R ≥ 0`.

**Gezamenlijk.** Alleen huishoudens mét adequate woning én toereikend inkomen tellen mee voor de bestaansbasis. Lees de totaalscore altijd samen met de **laagste groepsdekking**.

**Financiering.** Bruto uitgaven min extra belasting en besparing op vervallen regelingen. Geen voorspelling van gedrag (werk, huur, migratie). Dat valt buiten v0.1.

Gele cellen zijn invoer. De rest rekent mee. Wijzigingen blijven op het apparaat (lokale opslag).

## Wat nog nodig is voor een echte score

- Eén populatie, één peildatum, één prijspeil.
- Exclusieve groepen: elk huishouden en elke woning één keer.
- Woningvraag per type × regio × bijzondere behoefte (WoON, Woonbase, CBS).
- Aanbod uit BAG + leegstand; kwaliteit via EP-Online, oppervlak, toegankelijkheid, locatie.
- Nibud-minimum voor niet-woongebonden uitgaven.
- Vlag of het huishouden al een adequate woning heeft — anders bestaat de gezamenlijke score niet.
- Zwakke groepen niet weglaten: starters, alleenstaande ouderen, huishoudens met beperking, grote gezinnen.
- Per cel: feit, schatting of norm, plus jaartal. Onbekend is niet nul.

Bronnen om op voort te bouwen: OHCHR adequate housing, Eurostat, CBS Woonbase, WoON, BAG, EP-Online, Nibud.

## Gebruik

Interactieve webapp: de gele cellen invullen, scenario’s vergelijken (Zonder / Laag / Midden / Hoog / Ruim), rijen toevoegen of schrappen. Rechts staat de toelichting.

Zelf draaien:

```bash
npm install
npm run dev
```

In deze map staan ook de methodenbeschrijving en het Excel-rekenmodel:

- [`public/downloads/rekenmethode-v0.1.docx`](public/downloads/rekenmethode-v0.1.docx)
- [`public/downloads/rekenmodel-v0.1.xlsx`](public/downloads/rekenmodel-v0.1.xlsx)

## Status

Eerste openbare werkversie voor toetsing. Initiatief en denklijn: ir. Kleo Rem.

De belofte van deze publicatie is beperkt en daarom bruikbaar: **maak woningtekort en armoede meetbaar in dezelfde eenheden, zodat het gesprek over oplossingen ergens kan beginnen.**
