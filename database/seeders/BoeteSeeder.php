<?php

namespace Database\Seeders;

use App\Models\Boete;
use Illuminate\Database\Seeder;

class BoeteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verwijder bestaande boetes
        Boete::truncate();

        // Boetes uit Titel I - Vermogensdelicten
        // Artikel I-1 Diefstal (310 SR)
        $this->createBoete('I-1', 'Diefstal (310 SR)', 'Een persoon is schuldig aan diefstal wanneer hij of zij een goed of voertuig wegneemt zonder toestemming of enig recht daartoe te hebben.', 'Vermogensdelicten', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('I-1', 'Diefstal (310 SR)', 'Een persoon is schuldig aan diefstal wanneer hij of zij een goed of voertuig wegneemt zonder toestemming of enig recht daartoe te hebben.', 'Vermogensdelicten', 12500.00, 'Tweede Veroordeling');
        $this->createBoete('I-1', 'Diefstal (310 SR)', 'Een persoon is schuldig aan diefstal wanneer hij of zij een goed of voertuig wegneemt zonder toestemming of enig recht daartoe te hebben.', 'Vermogensdelicten', 15000.00, 'Meerdere Veroordelingen');

        // Artikel I-2 Gekwalificeerde Diefstal (311 SR)
        $this->createBoete('I-2', 'Gekwalificeerde Diefstal (311 SR)', 'Als een persoon een diefstal pleegt in een woning of op een besloten erf waarop een woning staat, terwijl hij of zij zich daar zonder toestemming of tegen de wil van de eigenaar bevindt, wordt deze persoon als schuldig beschouwd.', 'Vermogensdelicten', 15000.00, 'Eerste Veroordeling');
        $this->createBoete('I-2', 'Gekwalificeerde Diefstal (311 SR)', 'Als een persoon een diefstal pleegt in een woning of op een besloten erf waarop een woning staat, terwijl hij of zij zich daar zonder toestemming of tegen de wil van de eigenaar bevindt, wordt deze persoon als schuldig beschouwd.', 'Vermogensdelicten', 17500.00, 'Tweede Veroordeling');
        $this->createBoete('I-2', 'Gekwalificeerde Diefstal (311 SR)', 'Als een persoon een diefstal pleegt in een woning of op een besloten erf waarop een woning staat, terwijl hij of zij zich daar zonder toestemming of tegen de wil van de eigenaar bevindt, wordt deze persoon als schuldig beschouwd.', 'Vermogensdelicten', 25000.00, 'Meerdere Veroordelingen');

        // Artikel I-3 Diefstal met geweld / Overval (312 SR)
        $this->createBoete('I-3', 'Diefstal met geweld / Overval (312 SR)', 'Wanneer iemand zonder toestemming of recht een goed wegneemt en daarbij geweld gebruikt in welke vorm dan ook, wordt deze persoon als schuldig beschouwd.', 'Vermogensdelicten', 20000.00, 'Eerste Veroordeling');
        $this->createBoete('I-3', 'Diefstal met geweld / Overval (312 SR)', 'Wanneer iemand zonder toestemming of recht een goed wegneemt en daarbij geweld gebruikt in welke vorm dan ook, wordt deze persoon als schuldig beschouwd.', 'Vermogensdelicten', 25000.00, 'Tweede Veroordeling');
        $this->createBoete('I-3', 'Diefstal met geweld / Overval (312 SR)', 'Wanneer iemand zonder toestemming of recht een goed wegneemt en daarbij geweld gebruikt in welke vorm dan ook, wordt deze persoon als schuldig beschouwd.', 'Vermogensdelicten', 30000.00, 'Meerdere Veroordelingen');

        // Artikel I-4 Afpersing (317 SR)
        $this->createBoete('I-4', 'Afpersing (317 SR)', 'Een persoon die met dwang gegevens of goederen opeist van een derde, wordt als schuldig beschouwd.', 'Vermogensdelicten', 7500.00, 'Eerste Veroordeling');
        $this->createBoete('I-4', 'Afpersing (317 SR)', 'Een persoon die met dwang gegevens of goederen opeist van een derde, wordt als schuldig beschouwd.', 'Vermogensdelicten', 10000.00, 'Tweede Veroordeling');
        $this->createBoete('I-4', 'Afpersing (317 SR)', 'Een persoon die met dwang gegevens of goederen opeist van een derde, wordt als schuldig beschouwd.', 'Vermogensdelicten', 15000.00, 'Meerdere Veroordelingen');

        // Artikel I-5 Afdreiging / Chantage (318 SR)
        $this->createBoete('I-5', 'Afdreiging / Chantage (318 SR)', 'Een persoon die gegevens of goederen opeist van een derde door bedreiging met smaad of openbaring van een geheim, wordt als schuldig beschouwd.', 'Vermogensdelicten', 7500.00, 'Eerste Veroordeling');
        $this->createBoete('I-5', 'Afdreiging / Chantage (318 SR)', 'Een persoon die gegevens of goederen opeist van een derde door bedreiging met smaad of openbaring van een geheim, wordt als schuldig beschouwd.', 'Vermogensdelicten', 10000.00, 'Tweede Veroordeling');
        $this->createBoete('I-5', 'Afdreiging / Chantage (318 SR)', 'Een persoon die gegevens of goederen opeist van een derde door bedreiging met smaad of openbaring van een geheim, wordt als schuldig beschouwd.', 'Vermogensdelicten', 15000.00, 'Meerdere Veroordelingen');

        // Artikel I-6 Heling (416 SR)
        $this->createBoete('I-6', 'Heling (416 SR)', 'Een persoon die een goed verkrijgt dat afkomstig is uit een misdrijf, of er aanspraak op maakt, wordt beschouwd als schuldig.', 'Vermogensdelicten', 2000.00, 'Eerste Veroordeling');
        $this->createBoete('I-6', 'Heling (416 SR)', 'Een persoon die een goed verkrijgt dat afkomstig is uit een misdrijf, of er aanspraak op maakt, wordt beschouwd als schuldig.', 'Vermogensdelicten', 4000.00, 'Tweede Veroordeling');
        $this->createBoete('I-6', 'Heling (416 SR)', 'Een persoon die een goed verkrijgt dat afkomstig is uit een misdrijf, of er aanspraak op maakt, wordt beschouwd als schuldig.', 'Vermogensdelicten', 5000.00, 'Meerdere Veroordelingen');

        // Artikel I-7 Witwassen (420bis SR)
        $this->createBoete('I-7', 'Witwassen (420bis SR)', 'Een persoon wordt als schuldig beschouwd wanneer hij of zij geld of goederen afkomstig van een misdrijf mengt of probeert te mengen met het normale circuit van geld en goederen.', 'Vermogensdelicten', 15000.00, 'Eerste Veroordeling');
        $this->createBoete('I-7', 'Witwassen (420bis SR)', 'Een persoon wordt als schuldig beschouwd wanneer hij of zij geld of goederen afkomstig van een misdrijf mengt of probeert te mengen met het normale circuit van geld en goederen.', 'Vermogensdelicten', 20000.00, 'Tweede Veroordeling');
        $this->createBoete('I-7', 'Witwassen (420bis SR)', 'Een persoon wordt als schuldig beschouwd wanneer hij of zij geld of goederen afkomstig van een misdrijf mengt of probeert te mengen met het normale circuit van geld en goederen.', 'Vermogensdelicten', 25000.00, 'Meerdere Veroordelingen');

        // Boetes uit Titel II - Geweldsdelicten
        // Artikel II-1 Wederspannigheid/verzet (180 SR)
        $this->createBoete('II-1', 'Wederspannigheid/verzet (180 SR)', 'Een persoon die geweld pleegt of zich gewelddadig verzet tegen een ambtenaar in functie, wordt als schuldig beschouwd.', 'Geweldsdelicten', 1000.00, 'Eerste Veroordeling');
        $this->createBoete('II-1', 'Wederspannigheid/verzet (180 SR)', 'Een persoon die geweld pleegt of zich gewelddadig verzet tegen een ambtenaar in functie, wordt als schuldig beschouwd.', 'Geweldsdelicten', 1500.00, 'Tweede Veroordeling');
        $this->createBoete('II-1', 'Wederspannigheid/verzet (180 SR)', 'Een persoon die geweld pleegt of zich gewelddadig verzet tegen een ambtenaar in functie, wordt als schuldig beschouwd.', 'Geweldsdelicten', 2000.00, 'Meerdere Veroordelingen');

        // Artikel II-2 Gijzeling (282 SR)
        $this->createBoete('II-2', 'Gijzeling (282 SR)', 'Een persoon die de vrijheid van een derde wederrechtelijk berooft, wordt beschouwd als schuldig.', 'Geweldsdelicten', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('II-2', 'Gijzeling (282 SR)', 'Een persoon die de vrijheid van een derde wederrechtelijk berooft, wordt beschouwd als schuldig.', 'Geweldsdelicten', 15000.00, 'Tweede Veroordeling');
        $this->createBoete('II-2', 'Gijzeling (282 SR)', 'Een persoon die de vrijheid van een derde wederrechtelijk berooft, wordt beschouwd als schuldig.', 'Geweldsdelicten', 20000.00, 'Meerdere Veroordelingen');

        // Artikel II-3 Bedreiging (285 SR)
        $this->createBoete('II-3', 'Bedreiging (285 SR)', 'Een persoon die dreigt met geweld of een misdrijf tegen personen of eigendommen, wordt beschouwd als schuldig.', 'Geweldsdelicten', 3000.00, 'Eerste Veroordeling');
        $this->createBoete('II-3', 'Bedreiging (285 SR)', 'Een persoon die dreigt met geweld of een misdrijf tegen personen of eigendommen, wordt beschouwd als schuldig.', 'Geweldsdelicten', 4000.00, 'Tweede Veroordeling');
        $this->createBoete('II-3', 'Bedreiging (285 SR)', 'Een persoon die dreigt met geweld of een misdrijf tegen personen of eigendommen, wordt beschouwd als schuldig.', 'Geweldsdelicten', 5000.00, 'Meerdere Veroordelingen');

        // Artikel II-4 Doodslag/Moord (287 SR)
        $this->createBoete('II-4', 'Doodslag/Moord (287 SR)', 'Een persoon die opzettelijk een ander van het leven berooft, wordt beschouwd als schuldig.', 'Geweldsdelicten', 15000.00, 'Eerste Veroordeling');
        $this->createBoete('II-4', 'Doodslag/Moord (287 SR)', 'Een persoon die opzettelijk een ander van het leven berooft, wordt beschouwd als schuldig.', 'Geweldsdelicten', 20000.00, 'Tweede Veroordeling');
        $this->createBoete('II-4', 'Doodslag/Moord (287 SR)', 'Een persoon die opzettelijk een ander van het leven berooft, wordt beschouwd als schuldig.', 'Geweldsdelicten', 25000.00, 'Meerdere Veroordelingen');

        // Artikel II-5 Eenvoudige mishandeling (300 SR)
        $this->createBoete('II-5', 'Eenvoudige mishandeling (300 SR)', 'Indien iemand met opzet en zonder rechtmatige reden een ander licht lichamelijk of geestelijk letsel toebrengt, dan wordt diegene als schuldig beschouwd.', 'Geweldsdelicten', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('II-5', 'Eenvoudige mishandeling (300 SR)', 'Indien iemand met opzet en zonder rechtmatige reden een ander licht lichamelijk of geestelijk letsel toebrengt, dan wordt diegene als schuldig beschouwd.', 'Geweldsdelicten', 7500.00, 'Tweede Veroordeling');
        $this->createBoete('II-5', 'Eenvoudige mishandeling (300 SR)', 'Indien iemand met opzet en zonder rechtmatige reden een ander licht lichamelijk of geestelijk letsel toebrengt, dan wordt diegene als schuldig beschouwd.', 'Geweldsdelicten', 10000.00, 'Meerdere Veroordelingen');

        // Artikel II-6 Zware mishandeling (302 SR)
        $this->createBoete('II-6', 'Zware mishandeling (302 SR)', 'Indien een persoon opzettelijk en wederrechtelijk een ander mishandelt, waarbij er sprake is van zwaar lichamelijk of geestelijk letsel, dan wordt deze persoon als schuldig beschouwd.', 'Geweldsdelicten', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('II-6', 'Zware mishandeling (302 SR)', 'Indien een persoon opzettelijk en wederrechtelijk een ander mishandelt, waarbij er sprake is van zwaar lichamelijk of geestelijk letsel, dan wordt deze persoon als schuldig beschouwd.', 'Geweldsdelicten', 12500.00, 'Tweede Veroordeling');
        $this->createBoete('II-6', 'Zware mishandeling (302 SR)', 'Indien een persoon opzettelijk en wederrechtelijk een ander mishandelt, waarbij er sprake is van zwaar lichamelijk of geestelijk letsel, dan wordt deze persoon als schuldig beschouwd.', 'Geweldsdelicten', 15000.00, 'Meerdere Veroordelingen');

        // Artikel II-7 Vernieling (350 SR)
        $this->createBoete('II-7', 'Vernieling (350 SR)', 'Een persoon wordt als schuldig beschouwd wanneer deze opzettelijk en wederrechtelijk een goed dat geheel of gedeeltelijk toebehoort aan een ander, vernielt, beschadigt, onbruikbaar maakt of wegneemt.', 'Geweldsdelicten', 3000.00, 'Eerste Veroordeling');
        $this->createBoete('II-7', 'Vernieling (350 SR)', 'Een persoon wordt als schuldig beschouwd wanneer deze opzettelijk en wederrechtelijk een goed dat geheel of gedeeltelijk toebehoort aan een ander, vernielt, beschadigt, onbruikbaar maakt of wegneemt.', 'Geweldsdelicten', 4500.00, 'Tweede Veroordeling');
        $this->createBoete('II-7', 'Vernieling (350 SR)', 'Een persoon wordt als schuldig beschouwd wanneer deze opzettelijk en wederrechtelijk een goed dat geheel of gedeeltelijk toebehoort aan een ander, vernielt, beschadigt, onbruikbaar maakt of wegneemt.', 'Geweldsdelicten', 6000.00, 'Meerdere Veroordelingen');

        // Artikel II-8 Terroristisch misdrijf (134a 142a SR)
        $this->createBoete('II-8', 'Terroristisch misdrijf (134a 142a SR)', 'Een terroristisch misdrijf/daad houdt in dat er sprake is van de intentie om de bevolking of een deel van de bevolking van een land ernstige angst aan te jagen.', 'Geweldsdelicten', 30000.00, 'Eerste Veroordeling');
        $this->createBoete('II-8', 'Terroristisch misdrijf (134a 142a SR)', 'Een terroristisch misdrijf/daad houdt in dat er sprake is van de intentie om de bevolking of een deel van de bevolking van een land ernstige angst aan te jagen.', 'Geweldsdelicten', 37500.00, 'Tweede Veroordeling');
        $this->createBoete('II-8', 'Terroristisch misdrijf (134a 142a SR)', 'Een terroristisch misdrijf/daad houdt in dat er sprake is van de intentie om de bevolking of een deel van de bevolking van een land ernstige angst aan te jagen.', 'Geweldsdelicten', 45000.00, 'Meerdere Veroordelingen');

        // Artikel II-9 Dood door schuld (307 SR)
        $this->createBoete('II-9', 'Dood door schuld (307 SR)', 'Een persoon die door zijn eigen handelen een ander het leven ontneemt, zonder opzet of voorbedachte rade, wordt als schuldig beschouwd.', 'Geweldsdelicten', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('II-9', 'Dood door schuld (307 SR)', 'Een persoon die door zijn eigen handelen een ander het leven ontneemt, zonder opzet of voorbedachte rade, wordt als schuldig beschouwd.', 'Geweldsdelicten', 15000.00, 'Tweede Veroordeling');
        $this->createBoete('II-9', 'Dood door schuld (307 SR)', 'Een persoon die door zijn eigen handelen een ander het leven ontneemt, zonder opzet of voorbedachte rade, wordt als schuldig beschouwd.', 'Geweldsdelicten', 20000.00, 'Meerdere Veroordelingen');

        // Boetes uit Titel III - Verkeersdelicten
        // Artikel III-1 Verkeersovertredingen in algemene zin (5 WVW)
        $this->createBoete('III-1', 'Verkeersovertredingen in algemene zin (5 WVW)', 'Bij verkeersovertredingen in het algemeen, zonder verdere specificatie van zwaardere misdrijven, wordt een boete opgelegd.', 'Verkeersdelicten', 500.00, 'Algemeen');

        // Artikel III-2 Roekeloos rijgedrag (5 WVW)
        $this->createBoete('III-2', 'Roekeloos rijgedrag (5 WVW)', 'Er is sprake van schuldig gedrag in het verkeer wanneer iemand gevaar of mogelijke hinder veroorzaakt op de openbare weg.', 'Verkeersdelicten', 3000.00, 'Eerste Veroordeling');
        $this->createBoete('III-2', 'Roekeloos rijgedrag (5 WVW)', 'Er is sprake van schuldig gedrag in het verkeer wanneer iemand gevaar of mogelijke hinder veroorzaakt op de openbare weg.', 'Verkeersdelicten', 4000.00, 'Tweede Veroordeling');
        $this->createBoete('III-2', 'Roekeloos rijgedrag (5 WVW)', 'Er is sprake van schuldig gedrag in het verkeer wanneer iemand gevaar of mogelijke hinder veroorzaakt op de openbare weg.', 'Verkeersdelicten', 5000.00, 'Meerdere Veroordelingen');

        // Artikel III-3 Opzettelijk veroorzaken van ernstig gevaar of hinder (5a WvW)
        $this->createBoete('III-3', 'Opzettelijk veroorzaken van ernstig gevaar of hinder (5a WvW)', 'Het is verboden om opzettelijk het verkeersgedrag dusdanig te schenden dat de verkeersregels ernstig worden overtreden en daarmee levensgevaar of risico op zwaar lichamelijk letsel voor anderen veroorzaakt wordt.', 'Verkeersdelicten', 3000.00, 'Eerste Veroordeling');
        $this->createBoete('III-3', 'Opzettelijk veroorzaken van ernstig gevaar of hinder (5a WvW)', 'Het is verboden om opzettelijk het verkeersgedrag dusdanig te schenden dat de verkeersregels ernstig worden overtreden en daarmee levensgevaar of risico op zwaar lichamelijk letsel voor anderen veroorzaakt wordt.', 'Verkeersdelicten', 7500.00, 'Tweede Veroordeling');
        $this->createBoete('III-3', 'Opzettelijk veroorzaken van ernstig gevaar of hinder (5a WvW)', 'Het is verboden om opzettelijk het verkeersgedrag dusdanig te schenden dat de verkeersregels ernstig worden overtreden en daarmee levensgevaar of risico op zwaar lichamelijk letsel voor anderen veroorzaakt wordt.', 'Verkeersdelicten', 10500.00, 'Meerdere Veroordelingen');

        // Artikel III-4 Veroorzaken ongeval, met al dan niet licht lichamelijk letsel tot gevolg (6 WVW)
        $this->createBoete('III-4', 'Veroorzaken ongeval, met al dan niet licht lichamelijk letsel tot gevolg (6 WVW)', 'Wanneer iemand door een gevaarlijke of hinderlijke deelname aan het verkeer een ongeval veroorzaakt met al dan niet licht lichamelijk letsel aan een derde tot gevolg, wordt deze persoon beschouwd als schuldig.', 'Verkeersdelicten', 4000.00, 'Eerste Veroordeling');
        $this->createBoete('III-4', 'Veroorzaken ongeval, met al dan niet licht lichamelijk letsel tot gevolg (6 WVW)', 'Wanneer iemand door een gevaarlijke of hinderlijke deelname aan het verkeer een ongeval veroorzaakt met al dan niet licht lichamelijk letsel aan een derde tot gevolg, wordt deze persoon beschouwd als schuldig.', 'Verkeersdelicten', 5000.00, 'Tweede Veroordeling');
        $this->createBoete('III-4', 'Veroorzaken ongeval, met al dan niet licht lichamelijk letsel tot gevolg (6 WVW)', 'Wanneer iemand door een gevaarlijke of hinderlijke deelname aan het verkeer een ongeval veroorzaakt met al dan niet licht lichamelijk letsel aan een derde tot gevolg, wordt deze persoon beschouwd als schuldig.', 'Verkeersdelicten', 6000.00, 'Meerdere Veroordelingen');

        // Artikel III-5 Veroorzaken ongeval, met zwaar lichamelijk letsel tot gevolg (6 WVW)
        $this->createBoete('III-5', 'Veroorzaken ongeval, met zwaar lichamelijk letsel tot gevolg (6 WVW)', 'Een persoon die door gevaarlijk of hinderlijk rijgedrag een ongeval veroorzaakt met zwaar lichamelijk letsel tot gevolg bij een derde, wordt als schuldig beschouwd.', 'Verkeersdelicten', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('III-5', 'Veroorzaken ongeval, met zwaar lichamelijk letsel tot gevolg (6 WVW)', 'Een persoon die door gevaarlijk of hinderlijk rijgedrag een ongeval veroorzaakt met zwaar lichamelijk letsel tot gevolg bij een derde, wordt als schuldig beschouwd.', 'Verkeersdelicten', 11000.00, 'Tweede Veroordeling');
        $this->createBoete('III-5', 'Veroorzaken ongeval, met zwaar lichamelijk letsel tot gevolg (6 WVW)', 'Een persoon die door gevaarlijk of hinderlijk rijgedrag een ongeval veroorzaakt met zwaar lichamelijk letsel tot gevolg bij een derde, wordt als schuldig beschouwd.', 'Verkeersdelicten', 12000.00, 'Meerdere Veroordelingen');

        // Artikel III-6 Veroorzaken ongeval, met de dood tot gevolg (6 WVW)
        $this->createBoete('III-6', 'Veroorzaken ongeval, met de dood tot gevolg (6 WVW)', 'Als gevolg van gevaarlijke of hinderlijke deelname aan het verkeer waardoor een derde persoon overlijdt, wordt iemand schuldig verklaard aan een ongeval.', 'Verkeersdelicten', 16000.00, 'Eerste Veroordeling');
        $this->createBoete('III-6', 'Veroorzaken ongeval, met de dood tot gevolg (6 WVW)', 'Als gevolg van gevaarlijke of hinderlijke deelname aan het verkeer waardoor een derde persoon overlijdt, wordt iemand schuldig verklaard aan een ongeval.', 'Verkeersdelicten', 17000.00, 'Tweede Veroordeling');
        $this->createBoete('III-6', 'Veroorzaken ongeval, met de dood tot gevolg (6 WVW)', 'Als gevolg van gevaarlijke of hinderlijke deelname aan het verkeer waardoor een derde persoon overlijdt, wordt iemand schuldig verklaard aan een ongeval.', 'Verkeersdelicten', 18000.00, 'Meerdere Veroordelingen');

        // Artikel III-7 Verlaten plaats van verkeersongeval (7 WVW)
        $this->createBoete('III-7', 'Verlaten plaats van verkeersongeval (7 WVW)', 'Indien een persoon na een verkeersongeval de plaats verlaat, ongeacht of deze persoon schuldig was aan het ongeval, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 15000.00, 'Eerste Veroordeling');
        $this->createBoete('III-7', 'Verlaten plaats van verkeersongeval (7 WVW)', 'Indien een persoon na een verkeersongeval de plaats verlaat, ongeacht of deze persoon schuldig was aan het ongeval, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 16000.00, 'Tweede Veroordeling');
        $this->createBoete('III-7', 'Verlaten plaats van verkeersongeval (7 WVW)', 'Indien een persoon na een verkeersongeval de plaats verlaat, ongeacht of deze persoon schuldig was aan het ongeval, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 18000.00, 'Meerdere Veroordelingen');

        // Artikel III-8 Rijden onder invloed (8 WVW)
        $this->createBoete('III-8', 'Rijden onder invloed (8 WVW)', 'Een persoon die deelneemt aan het verkeer onder invloed van alcohol, verdovende middelen of medicijnen die de rijvaardigheid beïnvloeden, wordt beschouwd als schuldig.', 'Verkeersdelicten', 4000.00, 'Eerste Veroordeling');
        $this->createBoete('III-8', 'Rijden onder invloed (8 WVW)', 'Een persoon die deelneemt aan het verkeer onder invloed van alcohol, verdovende middelen of medicijnen die de rijvaardigheid beïnvloeden, wordt beschouwd als schuldig.', 'Verkeersdelicten', 5000.00, 'Tweede Veroordeling');
        $this->createBoete('III-8', 'Rijden onder invloed (8 WVW)', 'Een persoon die deelneemt aan het verkeer onder invloed van alcohol, verdovende middelen of medicijnen die de rijvaardigheid beïnvloeden, wordt beschouwd als schuldig.', 'Verkeersdelicten', 6000.00, 'Meerdere Veroordelingen');

        // Artikel III-9 Rijden zonder bevoegdheid (9 WVW)
        $this->createBoete('III-9', 'Rijden zonder bevoegdheid (9 WVW)', 'Een persoon wordt als schuldig beschouwd wanneer hij of zij op de hoogte is of redelijkerwijs zou moeten weten dat de rijbevoegdheid is ontzegd en toch deelneemt aan het verkeer.', 'Verkeersdelicten', 4000.00, 'Eerste Veroordeling');
        $this->createBoete('III-9', 'Rijden zonder bevoegdheid (9 WVW)', 'Een persoon wordt als schuldig beschouwd wanneer hij of zij op de hoogte is of redelijkerwijs zou moeten weten dat de rijbevoegdheid is ontzegd en toch deelneemt aan het verkeer.', 'Verkeersdelicten', 4000.00, 'Tweede Veroordeling');
        $this->createBoete('III-9', 'Rijden zonder bevoegdheid (9 WVW)', 'Een persoon wordt als schuldig beschouwd wanneer hij of zij op de hoogte is of redelijkerwijs zou moeten weten dat de rijbevoegdheid is ontzegd en toch deelneemt aan het verkeer.', 'Verkeersdelicten', 6000.00, 'Meerdere Veroordelingen');

        // Artikel III-10 Fout parkeren (25 RVV 1990)
        $this->createBoete('III-10', 'Fout parkeren (25 RVV 1990)', 'Een persoon die zijn of haar voertuig op een wijze parkeert die niet overeenkomt met de aangegeven parkeersituatie, wordt als schuldig beschouwd.', 'Verkeersdelicten', 1750.00, 'Algemeen');

        // Artikel III-11 Snelheidsovertredingen
        $this->createBoete('III-11', 'Snelheidsovertredingen', 'Wanneer iemand tijdens deelname aan het verkeer de wettelijk bepaalde snelheden niet in acht neemt, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 7500.00, '0-50km/h');
        $this->createBoete('III-11', 'Snelheidsovertredingen', 'Wanneer iemand tijdens deelname aan het verkeer de wettelijk bepaalde snelheden niet in acht neemt, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 10000.00, '51-100km/h');
        $this->createBoete('III-11', 'Snelheidsovertredingen', 'Wanneer iemand tijdens deelname aan het verkeer de wettelijk bepaalde snelheden niet in acht neemt, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 15000.00, '101-150km/h');
        $this->createBoete('III-11', 'Snelheidsovertredingen', 'Wanneer iemand tijdens deelname aan het verkeer de wettelijk bepaalde snelheden niet in acht neemt, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 20000.00, '151-200km/h');
        $this->createBoete('III-11', 'Snelheidsovertredingen', 'Wanneer iemand tijdens deelname aan het verkeer de wettelijk bepaalde snelheden niet in acht neemt, wordt deze persoon als schuldig beschouwd.', 'Verkeersdelicten', 25000.00, 'vanaf 200km/h');

        // Artikel III-12 Voertuigeisen
        $this->createBoete('III-12', 'Rijden zonder kentekenplaten', 'Een voertuig, behalve fietsen, moet ten minste één nummerplaat hebben.', 'Verkeersdelicten', 750.00, 'Algemeen');
        $this->createBoete('III-12', 'Ramen dusdanig donker getint zodat de bestuurder en passagier voor in niet zichtbaar zijn', 'Indien een voertuig ramen heeft, moet het gezicht van de bestuurder en passagier(s) duidelijk zichtbaar zijn.', 'Verkeersdelicten', 2500.00, 'Algemeen');
        $this->createBoete('III-12', 'Verlichting(NEON) onder het voertuig', 'Verlichting onder het voertuig is niet toegestaan bij deelname aan het verkeer.', 'Verkeersdelicten', 1500.00, 'Algemeen');
        $this->createBoete('III-12', 'Rijden met koplampen met een andere lichtkleur dan wit of geel', 'De koplampen van het voertuig moeten een witte of gele kleur hebben.', 'Verkeersdelicten', 2500.00, 'Algemeen');

        // Artikel III-13 Overige verkeersboetes
        $this->createBoete('III-13', 'Blokkeren van de weg', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 720.00, 'Algemeen');
        $this->createBoete('III-13', 'Maken van een U-turn daar waar dat niet is toegestaan', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 420.00, 'Algemeen');
        $this->createBoete('III-13', 'Rijden in een voertuig dat niet toegestaan is op de openbare weg', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 2500.00, 'Algemeen');
        $this->createBoete('III-13', 'Onnodig Claxoneren', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 150.00, 'Algemeen');
        $this->createBoete('III-13', 'Over een doorgestrokken streep rijden', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 480.00, 'Algemeen');
        $this->createBoete('III-13', 'Aan de verkeerde kant van de weg rijden (spookrijden)', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 1860.00, 'Algemeen');
        $this->createBoete('III-13', 'Illegaal off road rijden', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 420.00, 'Algemeen');
        $this->createBoete('III-13', 'Stilstaan waar dit niet is toegestaan', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 420.00, 'Algemeen');
        $this->createBoete('III-13', 'Onnodig links rijden', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 420.00, 'Algemeen');
        $this->createBoete('III-13', 'Doorrijden bij een stopbord', 'Ter bevordering van transparantie is dit artikel met gespecificeerde boetes opgenomen.', 'Verkeersdelicten', 420.00, 'Algemeen');

        // Boetes uit Titel IV - Opiumwet
        // Artikel IV-1 Harddrugs (2 OW)
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1-25 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 2000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1-25 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 3000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1-25 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 4000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 26-200 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 26-200 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 6000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 26-200 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 7000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 201-250 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 8000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 201-250 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 9000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 201-250 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 10000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 251-500 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 20000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 501-750 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 21000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 751-1000 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 22000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1001-1500 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 23000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1501-2500 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 24000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 2501-5000 ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 25500.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 5001 en meer ingrediënten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 30000.00, 'Algemeen');

        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1-50 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1-50 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 6000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 1-50 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 7000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 50-100 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 8000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 50-100 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 9000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 50-100 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 10000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 51-100 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 13000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 101-150 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 14000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 151-250 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 15500.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 251-500 eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 25000.00, 'Algemeen');
        $this->createBoete('IV-1', 'Harddrugs (2 OW) - 501+ eindproducten', 'Schuldig is een persoon die harddrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 50000.00, 'Algemeen');

        // Artikel IV-2 Softdrugs (3 OW)
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 6-25 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 500.00, 'Eerste Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 6-25 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 1000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 6-25 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 1500.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 26-200 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 2000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 26-200 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 3000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 26-200 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 4000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 201-250 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 201-250 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 6000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 201-250 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 7000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 251-500 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 6750.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 501-750 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 7500.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 751-1000 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 9000.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 1001-1500 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 11500.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 1501-2500 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 13500.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 2501-5000 ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 17500.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 5001 en meer ingrediënten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 20000.00, 'Algemeen');

        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 2-5 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 2000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 2-5 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 3000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 2-5 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 4000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 6-40 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 6-40 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 6000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 6-40 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 7000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 41-50 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 8000.00, 'Eerste Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 41-50 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 9000.00, 'Tweede Veroordeling');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 41-50 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 10000.00, 'Meerdere Veroordelingen');

        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 51-100 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 9500.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 101-150 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 10500.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 151-250 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 11500.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 251-500 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 15000.00, 'Algemeen');
        $this->createBoete('IV-2', 'Softdrugs (3 OW) - 501-1000 eindproducten', 'Schuldig is een persoon die softdrugs vergaart, in bezit heeft, vervoert, of verkoopt.', 'Opiumwet', 19500.00, 'Algemeen');

        // Boetes uit Titel V - Wet Wapens en Munitie
        // Artikel V-1 Tasers (26 WWM)
        $this->createBoete('V-1', 'Tasers (26 WWM)', 'Strafbaar is een persoon die een stroomstootwapen voorhanden heeft, bij zich draagt, opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('V-1', 'Tasers (26 WWM)', 'Strafbaar is een persoon die een stroomstootwapen voorhanden heeft, bij zich draagt, opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 7500.00, 'Tweede Veroordeling');
        $this->createBoete('V-1', 'Tasers (26 WWM)', 'Strafbaar is een persoon die een stroomstootwapen voorhanden heeft, bij zich draagt, opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 10000.00, 'Meerdere Veroordelingen');

        // Artikel V-2 Vuurwapens en Explosieven (26 WWM)
        $this->createBoete('V-2', 'Vuurwapens en Explosieven (26 WWM) - Categorie 1', 'Strafbaar is een persoon die een vuurwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('V-2', 'Vuurwapens en Explosieven (26 WWM) - Categorie 1', 'Strafbaar is een persoon die een vuurwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 12500.00, 'Tweede Veroordeling');
        $this->createBoete('V-2', 'Vuurwapens en Explosieven (26 WWM) - Categorie 1', 'Strafbaar is een persoon die een vuurwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 15000.00, 'Meerdere Veroordelingen');

        $this->createBoete('V-2', 'Vuurwapens en Explosieven (26 WWM) - Categorie 2', 'Strafbaar is een persoon die een vuurwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 20000.00, 'Eerste Veroordeling');
        $this->createBoete('V-2', 'Vuurwapens en Explosieven (26 WWM) - Categorie 2', 'Strafbaar is een persoon die een vuurwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 25000.00, 'Tweede Veroordeling');
        $this->createBoete('V-2', 'Vuurwapens en Explosieven (26 WWM) - Categorie 2', 'Strafbaar is een persoon die een vuurwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 27500.00, 'Meerdere Veroordelingen');

        // Artikel V-3 Steek- en slagwapens (27 WWM)
        $this->createBoete('V-3', 'Steek- en slagwapens (27 WWM)', 'Strafbaar is een persoon die een steekwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('V-3', 'Steek- en slagwapens (27 WWM)', 'Strafbaar is een persoon die een steekwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 7500.00, 'Tweede Veroordeling');
        $this->createBoete('V-3', 'Steek- en slagwapens (27 WWM)', 'Strafbaar is een persoon die een steekwapen voorhanden heeft, bij zich draagt, of opgeslagen heeft in huis of in de laadruimte van zijn of haar vervoersmiddel.', 'Wet Wapens en Munitie', 10000.00, 'Meerdere Veroordelingen');

        // Artikel V-4 Nepwapens, holsters en replica's (26 WWM)
        $this->createBoete('V-4', 'Nepwapens, holsters en replica\'s (26 WWM)', 'Strafbaar is een persoon die een holster draagt met daarin een nepwapen of replica die, van dichtbij of op enige afstand, niet gemakkelijk van echt te onderscheiden is.', 'Wet Wapens en Munitie', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('V-4', 'Nepwapens, holsters en replica\'s (26 WWM)', 'Strafbaar is een persoon die een holster draagt met daarin een nepwapen of replica die, van dichtbij of op enige afstand, niet gemakkelijk van echt te onderscheiden is.', 'Wet Wapens en Munitie', 7500.00, 'Tweede Veroordeling');
        $this->createBoete('V-4', 'Nepwapens, holsters en replica\'s (26 WWM)', 'Strafbaar is een persoon die een holster draagt met daarin een nepwapen of replica die, van dichtbij of op enige afstand, niet gemakkelijk van echt te onderscheiden is.', 'Wet Wapens en Munitie', 10000.00, 'Meerdere Veroordelingen');

        // Artikel V-5 Wapenhandel (14-20 WWM)
        $this->createBoete('V-5', 'Wapenhandel (14-20 WWM)', 'Strafbaar is een persoon die wapens, aangemerkt als niet legaal, invoert, uitvoert, of doorvoert zonder hiervoor een geldig consent te hebben.', 'Wet Wapens en Munitie', 25000.00, 'Eerste Veroordeling');
        $this->createBoete('V-5', 'Wapenhandel (14-20 WWM)', 'Strafbaar is een persoon die wapens, aangemerkt als niet legaal, invoert, uitvoert, of doorvoert zonder hiervoor een geldig consent te hebben.', 'Wet Wapens en Munitie', 30000.00, 'Tweede Veroordeling');
        $this->createBoete('V-5', 'Wapenhandel (14-20 WWM)', 'Strafbaar is een persoon die wapens, aangemerkt als niet legaal, invoert, uitvoert, of doorvoert zonder hiervoor een geldig consent te hebben.', 'Wet Wapens en Munitie', 45000.00, 'Meerdere Veroordelingen');

        // Artikel V-6 Munitiebezit
        $this->createBoete('V-6', 'Munitiebezit - Categorie 1', 'Strafbaar is een persoon die munitie voorhanden heeft.', 'Wet Wapens en Munitie', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('V-6', 'Munitiebezit - Categorie 1', 'Strafbaar is een persoon die munitie voorhanden heeft.', 'Wet Wapens en Munitie', 15000.00, 'Tweede Veroordeling');
        $this->createBoete('V-6', 'Munitiebezit - Categorie 1', 'Strafbaar is een persoon die munitie voorhanden heeft.', 'Wet Wapens en Munitie', 20000.00, 'Meerdere Veroordelingen');

        $this->createBoete('V-6', 'Munitiebezit - Categorie 2', 'Strafbaar is een persoon die munitie voorhanden heeft.', 'Wet Wapens en Munitie', 15000.00, 'Eerste Veroordeling');
        $this->createBoete('V-6', 'Munitiebezit - Categorie 2', 'Strafbaar is een persoon die munitie voorhanden heeft.', 'Wet Wapens en Munitie', 20000.00, 'Tweede Veroordeling');
        $this->createBoete('V-6', 'Munitiebezit - Categorie 2', 'Strafbaar is een persoon die munitie voorhanden heeft.', 'Wet Wapens en Munitie', 25000.00, 'Meerdere Veroordelingen');

        // Boetes uit Titel VI - Wet op Kansspelen
        // Artikel VI-1 Algemeen verbod (1 Wok)
        $this->createBoete('VI-1', 'Algemeen verbod (1 Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om mee te dingen naar prijzen of geld, in de vorm van een kansspel.', 'Wet op Kansspelen', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('VI-1', 'Algemeen verbod (1 Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om mee te dingen naar prijzen of geld, in de vorm van een kansspel.', 'Wet op Kansspelen', 7500.00, 'Tweede Veroordeling');
        $this->createBoete('VI-1', 'Algemeen verbod (1 Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om mee te dingen naar prijzen of geld, in de vorm van een kansspel.', 'Wet op Kansspelen', 10000.00, 'Meerdere Veroordelingen');

        // Artikel VI-2 Casinospelen (27g Wok)
        $this->createBoete('VI-2', 'Casinospelen (27g Wok)', 'Schuldig is een persoon die zonder geldige vergunning casinospelen op basis van kansbepaling publiekelijk of bedrijfsmatig aanbiedt.', 'Wet op Kansspelen', 5000.00, 'Eerste Veroordeling');
        $this->createBoete('VI-2', 'Casinospelen (27g Wok)', 'Schuldig is een persoon die zonder geldige vergunning casinospelen op basis van kansbepaling publiekelijk of bedrijfsmatig aanbiedt.', 'Wet op Kansspelen', 10000.00, 'Tweede Veroordeling');
        $this->createBoete('VI-2', 'Casinospelen (27g Wok)', 'Schuldig is een persoon die zonder geldige vergunning casinospelen op basis van kansbepaling publiekelijk of bedrijfsmatig aanbiedt.', 'Wet op Kansspelen', 15000.00, 'Meerdere Veroordelingen');

        // Artikel VI-3 Loterijen (27 Wok)
        $this->createBoete('VI-3', 'Loterijen (27 Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om mededingers een aantal symbolen te doen voorspellen, die door loting of trekking worden verkregen uit een van tevoren opgegeven aantal symbolen.', 'Wet op Kansspelen', 7500.00, 'Eerste Veroordeling');
        $this->createBoete('VI-3', 'Loterijen (27 Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om mededingers een aantal symbolen te doen voorspellen, die door loting of trekking worden verkregen uit een van tevoren opgegeven aantal symbolen.', 'Wet op Kansspelen', 10000.00, 'Tweede Veroordeling');
        $this->createBoete('VI-3', 'Loterijen (27 Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om mededingers een aantal symbolen te doen voorspellen, die door loting of trekking worden verkregen uit een van tevoren opgegeven aantal symbolen.', 'Wet op Kansspelen', 12500.00, 'Meerdere Veroordelingen');

        // Artikel VI-4 Verdubbelaar en pyramidespel (1a Wok)
        $this->createBoete('VI-4', 'Verdubbelaar en pyramidespel (1a Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om geld of goederen te verdubbelen door het afgeven of overmaken van een voorgesteld bedrag of goed.', 'Wet op Kansspelen', 2500.00, 'Eerste Veroordeling');
        $this->createBoete('VI-4', 'Verdubbelaar en pyramidespel (1a Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om geld of goederen te verdubbelen door het afgeven of overmaken van een voorgesteld bedrag of goed.', 'Wet op Kansspelen', 5000.00, 'Tweede Veroordeling');
        $this->createBoete('VI-4', 'Verdubbelaar en pyramidespel (1a Wok)', 'Schuldig is een persoon die zonder geldige vergunning een gelegenheid biedt om geld of goederen te verdubbelen door het afgeven of overmaken van een voorgesteld bedrag of goed.', 'Wet op Kansspelen', 10000.00, 'Meerdere Veroordelingen');

        // Boetes uit Titel VIII - Overige
        // Artikel VIII-1 Niet voldoen aan een bevel of vordering (184 SR)
        $this->createBoete('VIII-1', 'Niet voldoen aan een bevel of vordering (184 SR)', 'Schuldig is een persoon die opzettelijk niet voldoet aan een bevel of vordering dat krachtens wettelijk voorschrift wordt gegeven door een ambtenaar in functie.', 'Overige', 1500.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-1', 'Niet voldoen aan een bevel of vordering (184 SR)', 'Schuldig is een persoon die opzettelijk niet voldoet aan een bevel of vordering dat krachtens wettelijk voorschrift wordt gegeven door een ambtenaar in functie.', 'Overige', 2500.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-1', 'Niet voldoen aan een bevel of vordering (184 SR)', 'Schuldig is een persoon die opzettelijk niet voldoet aan een bevel of vordering dat krachtens wettelijk voorschrift wordt gegeven door een ambtenaar in functie.', 'Overige', 5000.00, 'Meerdere Veroordelingen');

        // Artikel VIII-2 Belediging (266 SR)
        $this->createBoete('VIII-2', 'Belediging (266 SR)', 'Schuldig is een persoon die opzettelijk een ander belegdigt.', 'Overige', 1500.00, 'Algemeen');

        // Artikel VIII-3 Opgeven valse gegevens (435 SR)
        $this->createBoete('VIII-3', 'Opgeven valse gegevens (435 SR)', 'Schuldig is een persoon die bij vordering van een ambtenaar in functie valse gegevens opgeeft.', 'Overige', 250.00, 'Algemeen');

        // Artikel VIII-4 Niet op eerste vordering tonen van identiteitsbewijs (447e SR)
        $this->createBoete('VIII-4', 'Niet op eerste vordering tonen van identiteitsbewijs (447e SR)', 'Schuldig is een persoon die geen gehoor geeft aan een vordering tot inzage van het identiteitsbewijs door een ambtenaar in functie.', 'Overige', 320.00, 'Algemeen');

        // Artikel VIII-5 Openbare dronkenschap (453 SR)
        $this->createBoete('VIII-5', 'Openbare dronkenschap (453 SR)', 'Schuldig is een persoon die zich begeeft in de openbare ruimte terwijl hij of zij in kennelijke staat van dronkenschap verkeert.', 'Overige', 120.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-5', 'Openbare dronkenschap (453 SR)', 'Schuldig is een persoon die zich begeeft in de openbare ruimte terwijl hij of zij in kennelijke staat van dronkenschap verkeert.', 'Overige', 120.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-5', 'Openbare dronkenschap (453 SR)', 'Schuldig is een persoon die zich begeeft in de openbare ruimte terwijl hij of zij in kennelijke staat van dronkenschap verkeert.', 'Overige', 120.00, 'Meerdere Veroordelingen');

        // Artikel VIII-6 Dragen van gezichtsbedekkende kledij (1 Wet gedeeltelijk verbod gezichtsbedekkende kleding)
        $this->createBoete('VIII-6', 'Dragen van gezichtsbedekkende kledij', 'Schuldig is een persoon die kleding draagt, die het gezicht geheel bedekt of zodanig bedekt dat alleen de ogen onbedekt zijn, dan wel onherkenbaar maakt.', 'Overige', 200.00, 'Algemeen');

        // Artikel VIII-7 Identiteitsfraude
        $this->createBoete('VIII-7', 'Identiteitsfraude', 'Schuldig is een persoon die zich uitgeeft als iemand anders, onder naam van iemand anders, in naam van iemand anders, of gelieerd aan iemand anders met als doel daaruit een gewin te behalen in brede zin.', 'Overige', 2000.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-7', 'Identiteitsfraude', 'Schuldig is een persoon die zich uitgeeft als iemand anders, onder naam van iemand anders, in naam van iemand anders, of gelieerd aan iemand anders met als doel daaruit een gewin te behalen in brede zin.', 'Overige', 4000.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-7', 'Identiteitsfraude', 'Schuldig is een persoon die zich uitgeeft als iemand anders, onder naam van iemand anders, in naam van iemand anders, of gelieerd aan iemand anders met als doel daaruit een gewin te behalen in brede zin.', 'Overige', 6000.00, 'Meerdere Veroordelingen');

        // Artikel VIII-8 Deelname aan een criminele organisatie
        $this->createBoete('VIII-8', 'Deelname aan een criminele organisatie', 'Schuldig is een persoon die deelneemt aan, steun verleent aan, of gelieerd is aan een organisatie die tot doel heeft het plegen van misdrijven.', 'Overige', 3000.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-8', 'Deelname aan een criminele organisatie', 'Schuldig is een persoon die deelneemt aan, steun verleent aan, of gelieerd is aan een organisatie die tot doel heeft het plegen van misdrijven.', 'Overige', 6000.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-8', 'Deelname aan een criminele organisatie', 'Schuldig is een persoon die deelneemt aan, steun verleent aan, of gelieerd is aan een organisatie die tot doel heeft het plegen van misdrijven.', 'Overige', 9000.00, 'Meerdere Veroordelingen');

        // Artikel VIII-9 Lokaalvredebreuk (139 SR)
        $this->createBoete('VIII-9', 'Lokaalvredebreuk (139 SR)', 'Schuldig is een persoon die in een voor de openbare dienst bestemd lokaal, besloten erf of openbare ruimte, wederrechtelijk binnendringt, of, wederrechtelijk aldaar vertoevende, zich niet op de vordering van de bevoegde ambtenaar aanstonds verwijdert.', 'Overige', 7500.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-9', 'Lokaalvredebreuk (139 SR)', 'Schuldig is een persoon die in een voor de openbare dienst bestemd lokaal, besloten erf of openbare ruimte, wederrechtelijk binnendringt, of, wederrechtelijk aldaar vertoevende, zich niet op de vordering van de bevoegde ambtenaar aanstonds verwijdert.', 'Overige', 10000.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-9', 'Lokaalvredebreuk (139 SR)', 'Schuldig is een persoon die in een voor de openbare dienst bestemd lokaal, besloten erf of openbare ruimte, wederrechtelijk binnendringt, of, wederrechtelijk aldaar vertoevende, zich niet op de vordering van de bevoegde ambtenaar aanstonds verwijdert.', 'Overige', 12500.00, 'Meerdere Veroordelingen');

        // Artikel VIII-10 Huisvredebreuk (138 SR)
        $this->createBoete('VIII-10', 'Huisvredebreuk (138 SR)', 'Schuldig is een persoon die een woning of besloten lokaal of erf bij een ander in gebruik, wederrechtelijk binnendringt of, wederrechtelijk aldaar vertoevende, zich niet op de vordering van of vanwege de rechthebbende aanstonds verwijdert.', 'Overige', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-10', 'Huisvredebreuk (138 SR)', 'Schuldig is een persoon die een woning of besloten lokaal of erf bij een ander in gebruik, wederrechtelijk binnendringt of, wederrechtelijk aldaar vertoevende, zich niet op de vordering van of vanwege de rechthebbende aanstonds verwijdert.', 'Overige', 12500.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-10', 'Huisvredebreuk (138 SR)', 'Schuldig is een persoon die een woning of besloten lokaal of erf bij een ander in gebruik, wederrechtelijk binnendringt of, wederrechtelijk aldaar vertoevende, zich niet op de vordering van of vanwege de rechthebbende aanstonds verwijdert.', 'Overige', 15000.00, 'Meerdere Veroordelingen');

        // Artikel VIII-11 Betreden van verboden domein
        $this->createBoete('VIII-11', 'Betreden van verboden domein', 'Schuldig is een persoon die zonder daartoe gerechtigd is, over iemand anders zijn grond waarvan de toegang op een voor hem blijkbare wijze door den rechthebbende is verboden, loopt, rijdt of vee laat lopen.', 'Overige', 7500.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-11', 'Betreden van verboden domein', 'Schuldig is een persoon die zonder daartoe gerechtigd is, over iemand anders zijn grond waarvan de toegang op een voor hem blijkbare wijze door den rechthebbende is verboden, loopt, rijdt of vee laat lopen.', 'Overige', 10000.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-11', 'Betreden van verboden domein', 'Schuldig is een persoon die zonder daartoe gerechtigd is, over iemand anders zijn grond waarvan de toegang op een voor hem blijkbare wijze door den rechthebbende is verboden, loopt, rijdt of vee laat lopen.', 'Overige', 15000.00, 'Meerdere Veroordelingen');

        // Artikel VIII-13 Misdrijven tegen de openbare orde (131 SR)
        $this->createBoete('VIII-13', 'Misdrijven tegen de openbare orde (131 SR)', 'Hij die in het openbaar, mondeling of bij geschrift of afbeelding, tot enig strafbaar feit of tot gewelddadig optreden tegen het openbaar gezag opruit, wordt gestraft volgens onderstaande tabel.', 'Overige', 2500.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-13', 'Misdrijven tegen de openbare orde (131 SR)', 'Hij die in het openbaar, mondeling of bij geschrift of afbeelding, tot enig strafbaar feit of tot gewelddadig optreden tegen het openbaar gezag opruit, wordt gestraft volgens onderstaande tabel.', 'Overige', 5000.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-13', 'Misdrijven tegen de openbare orde (131 SR)', 'Hij die in het openbaar, mondeling of bij geschrift of afbeelding, tot enig strafbaar feit of tot gewelddadig optreden tegen het openbaar gezag opruit, wordt gestraft volgens onderstaande tabel.', 'Overige', 10000.00, 'Meerdere Veroordelingen');

        // Artikel VIII-14 Misdrijven tegen het openbaar gezag (189 SR)
        $this->createBoete('VIII-14', 'Misdrijven tegen het openbaar gezag (189 SR)', 'Een persoon wordt als schuldig beschouwd wanneer hij opzettelijk iemand helpt die schuldig is aan of verdacht wordt van een misdrijf om te ontsnappen aan de opsporing of aanhouding door ambtenaren in functie.', 'Overige', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('VIII-14', 'Misdrijven tegen het openbaar gezag (189 SR)', 'Een persoon wordt als schuldig beschouwd wanneer hij opzettelijk iemand helpt die schuldig is aan of verdacht wordt van een misdrijf om te ontsnappen aan de opsporing of aanhouding door ambtenaren in functie.', 'Overige', 15000.00, 'Tweede Veroordeling');
        $this->createBoete('VIII-14', 'Misdrijven tegen het openbaar gezag (189 SR)', 'Een persoon wordt als schuldig beschouwd wanneer hij opzettelijk iemand helpt die schuldig is aan of verdacht wordt van een misdrijf om te ontsnappen aan de opsporing of aanhouding door ambtenaren in functie.', 'Overige', 20000.00, 'Meerdere Veroordelingen');

        // Titel X - Algemene douanewet
        // Artikel X-1 Negeren van controle grensinspectiepost (1:1 - 1:31 Algemene Douanewet)
        $this->createBoete('X-1', 'Negeren van controle grensinspectiepost (1:1 - 1:31 Algemene Douanewet)', 'Schuldig is een persoon die opzettelijk en wederrechtelijk een grensinspectiepost ontwijkt, daar waar hij redelijkerwijs deze grensinspectiepost zou moeten passeren.', 'Algemene douanewet', 10000.00, 'Eerste Veroordeling');
        $this->createBoete('X-1', 'Negeren van controle grensinspectiepost (1:1 - 1:31 Algemene Douanewet)', 'Schuldig is een persoon die opzettelijk en wederrechtelijk een grensinspectiepost ontwijkt, daar waar hij redelijkerwijs deze grensinspectiepost zou moeten passeren.', 'Algemene douanewet', 15000.00, 'Meerdere Veroordelingen');
    }

    private function createBoete($artikelNummer, $titel, $beschrijving, $categorie, $bedrag, $veroordeling)
    {
        Boete::create([
            'artikel_nummer' => $artikelNummer,
            'titel' => $titel,
            'beschrijving' => $beschrijving,
            'categorie' => $categorie,
            'bedrag' => $bedrag,
            'veroordeling' => $veroordeling,
        ]);
    }
}
