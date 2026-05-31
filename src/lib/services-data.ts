    /**
     * Apex Energy — Services Data
     * Single source of truth for all service content.
     * Used by /services overview grid and /services/[slug] detail pages.
     */

    export interface Service {
    slug:        string
    title:       string
    shortTitle:  string
    tag:         string
    tagline:     string
    description: string
    longDesc:    string[]
    deliverables: string[]
    process:     { step: string; desc: string }[]
    }

    export const services: Service[] = [
    {
        slug:       'upravljanje-projektom',
        title:      'Upravljanje projektom i nadzor izgradnje',
        shortTitle: 'Upravljanje projektom',
        tag:        'Project Management',
        tagline:    'Od ideje do predaje — jedan tim, potpuna odgovornost.',
        description: 'Kompletan paket upravljanja projektom od početne ideje do završetka, sa fokusom na rokove, budžete i kvalitet.',
        longDesc: [
        'Upravljanje projektom nije samo praćenje rokova — to je koordinacija između investitora, projektanata, izvođača i inspekcija uz stalnu brigu o kvalitetu i budžetu.',
        'APEX energy preuzima potpunu odgovornost za projekt od trenutka angažovanja. Postavljamo jasnu strukturu komunikacije, definišemo KPI-jeve i pratimo svaki aspekt realizacije.',
        'Naš pristup kombinuje metodologije upravljanja projektima sa dubokim tehničkim znanjem — što znači da prepoznajemo probleme pre nego što postanu skupi.',
        ],
        deliverables: [
        'Detaljan plan projekta sa milestones i KPI-jevima',
        'Nadzor izvođenja radova na terenu',
        'Koordinacija između svih disciplina',
        'IPR (Inženjer Projektant Revizor) kontrola',
        'Periodični izveštaji o napretku i budžetu',
        'Finalni tehnički izveštaj i primopredaja',
        ],
        process: [
        { step: 'Kick-off i scope', desc: 'Definišemo obim, ciljeve, tim i ugovorni okvir.' },
        { step: 'Planiranje',       desc: 'Izrada WBS-a, gantograma i matrice odgovornosti.' },
        { step: 'Izvođenje',        desc: 'Nadzor radova, koordinacija i rešavanje problema.' },
        { step: 'Kontrola',         desc: 'Praćenje budžeta, rokova i kvaliteta u realnom vremenu.' },
        { step: 'Zatvaranje',       desc: 'Tehnički izveštaj, lessons learned i primopredaja.' },
        ],
    },
    {
        slug:       'tehnicko-savetovanje',
        title:      'Tehničko savetovanje za građevinske projekte',
        shortTitle: 'Tehničko savetovanje',
        tag:        'Engineering',
        tagline:    'Tehnička preciznost koja štiti vaš investicioni budžet.',
        description: 'Detaljno tehničko savetovanje prilikom pripreme projektne dokumentacije, revizije nacrta i izbora materijala.',
        longDesc: [
        'Greška u tehničkoj dokumentaciji može koštati višestruko više od troška konsultacije. APEX energy pomaže investitorima i projektantima da identifikuju rizike pre izvođenja.',
        'Pružamo nezavisni tehnički pregled projektne dokumentacije, identifikujemo neusklađenosti sa propisima i predlažemo optimizacije koje štede vreme i novac.',
        ],
        deliverables: [
        'Revizija projektne dokumentacije',
        'Izveštaj o tehničkim neusklađenostima',
        'Preporuke za optimizaciju rešenja',
        'Usklađivanje sa važećim propisima i standardima',
        'Podrška u odabiru materijala i opreme',
        'Tehnički due diligence za investitore',
        ],
        process: [
        { step: 'Analiza dokumentacije', desc: 'Pregled dostavljene projektne dokumentacije.' },
        { step: 'Identifikacija rizika',  desc: 'Mapiranje tehničkih i regulatornih neusklađenosti.' },
        { step: 'Izveštaj i preporuke',   desc: 'Detaljan izveštaj sa prioritizovanim akcijama.' },
        { step: 'Implementacija',         desc: 'Praćenje primene preporuka i verifikacija.' },
        ],
    },
    {
        slug:       'energetska-efikasnost',
        title:      'Energetska efikasnost i sertifikacija zgrada',
        shortTitle: 'Energetska efikasnost',
        tag:        'Energy',
        tagline:    'Smanjite troškove energije uz usklađenost sa standardima.',
        description: 'Analize potrošnje energije, identifikacija mogućnosti poboljšanja i priprema za sertifikacije EPC i ISO 50001.',
        longDesc: [
        'Energetska efikasnost nije samo ekološka odgovornost — to je direktan udar na operativne troškove. Prosečna poslovna zgrada može smanjiti potrošnju energije za 20-40% kroz ciljane intervencije.',
        'APEX energy sprovodi detaljne energetske auditove, identifikuje najisplativije prilike za poboljšanje i pruža podršku u sertifikacionim procesima prema lokalnim i međunarodnim standardima.',
        ],
        deliverables: [
        'Energetski audit i analiza potrošnje',
        'Identifikacija prioritetnih intervencija',
        'Ekonomska analiza ROI za svaku meru',
        'Priprema za EPC sertifikaciju',
        'Dokumentacija za ISO 50001',
        'Plan praćenja i verifikacije ušteda',
        ],
        process: [
        { step: 'Prikupljanje podataka', desc: 'Analiza računa za energiju, merenja i tehničke dokumentacije.' },
        { step: 'Energetski audit',      desc: 'Terenska inspekcija i identifikacija gubitaka.' },
        { step: 'Izveštaj i ROI',        desc: 'Prioritizovane preporuke sa ekonomskom analizom.' },
        { step: 'Sertifikacija',         desc: 'Podrška u procesu dobijanja EPC ili ISO 50001.' },
        ],
    },
    {
        slug:       'bim-digitalizacija',
        title:      'BIM i digitalizacija projektne dokumentacije',
        shortTitle: 'BIM & Digitalizacija',
        tag:        'Digital',
        tagline:    'Digitalni model koji prati projekat kroz čitav životni ciklus.',
        description: 'Implementacija i upravljanje BIM modelom za efikasnije planiranje, simulacije, koordinaciju i kolaboraciju.',
        longDesc: [
        'BIM (Building Information Modeling) nije samo 3D crtanje — to je centralni repozitorijum svih informacija o projektu koji eliminiše greške nastale lošom koordinacijom između disciplina.',
        'APEX energy implementira BIM procese prilagođene veličini i tipu projekta, obučava timove i osigurava da svi akteri rade sa istim, ažuriranim informacijama.',
        ],
        deliverables: [
        'BIM model prema LOD specifikaciji',
        'BEP (BIM Execution Plan)',
        'Koordinacija modela i clash detection',
        'Konverzija postojeće dokumentacije u BIM',
        'Izveštaji iz modela za inspekcije i dozvole',
        'Obuka tima za rad sa BIM platformama',
        ],
        process: [
        { step: 'BIM assessment',     desc: 'Procena trenutnog stanja i definisanje BIM ciljeva.' },
        { step: 'BEP izrada',         desc: 'Plan implementacije prilagođen projektu i timu.' },
        { step: 'Modelovanje',        desc: 'Izrada modela prema dogovorenom LOD nivou.' },
        { step: 'Koordinacija',       desc: 'Clash detection i koordinacioni sastanci.' },
        { step: 'Isporuka',           desc: 'Finalni model i dokumentacija za operativnu upotrebu.' },
        ],
    },
    {
        slug:       'procena-rizika',
        title:      'Procena rizika i bezbednost na radu',
        shortTitle: 'Bezbednost na radu',
        tag:        'Safety',
        tagline:    'Zaštitite ljude, projekat i reputaciju vaše kompanije.',
        description: 'Identifikacija i procena rizika u projektnom i operativnom okruženju, izrada planova zaštite na radu.',
        longDesc: [
        'Bezbednost na radu nije samo zakonska obaveza — to je temelj operativne izvrsnosti. Incident na gradilištu ne košta samo novac, košta ljude i reputaciju.',
        'APEX energy izrađuje sveobuhvatne procene rizika usklađene sa srpskim zakonodavstvom, pruža obuke i pomaže kompanijama da uspostave kulturu sigurnosti.',
        ],
        deliverables: [
        'Procena rizika na radnom mestu',
        'Plan zaštite na radu (PZR)',
        'Planovi za vanredne situacije',
        'Priprema za inspekciju rada',
        'Obuka zaposlenih i rukovodilaca',
        'Periodični pregledi i ažuriranja',
        ],
        process: [
        { step: 'Identifikacija hazarda',  desc: 'Terenska procena radnog okruženja i aktivnosti.' },
        { step: 'Analiza rizika',          desc: 'Kvantifikacija rizika i prioritizacija mera.' },
        { step: 'Dokumentacija',           desc: 'Izrada PZR-a i pratećih procedura.' },
        { step: 'Implementacija',          desc: 'Podrška u uvođenju mera i obuka zaposlenih.' },
        { step: 'Praćenje',               desc: 'Periodični pregledi i ažuriranje dokumentacije.' },
        ],
    },
    {
        slug:       'kvalitet-standardi',
        title:      'Kvalitet i usklađenost sa standardima',
        shortTitle: 'Kvalitet & Standardi',
        tag:        'Quality',
        tagline:    'Sistemi kvaliteta koji rade za vas, ne protiv vas.',
        description: 'Evaluacija i implementacija sistema upravljanja kvalitetom prema ISO 9001 i ISO 14001 standardima.',
        longDesc: [
        'Sertifikacija prema ISO standardima ne treba da bude birokratski teret — treba da bude alat koji poboljšava poslovne procese i otvara nova tržišta.',
        'APEX energy pomaže kompanijama da implementiraju sisteme kvaliteta koji su praktični, ne samo formalni. Fokus je na procesima koji stvarno funkcionišu i donose vrednost.',
        ],
        deliverables: [
        'Gap analiza prema ISO standardu',
        'Dokumentacija sistema kvaliteta (QMS)',
        'Interni audit prema ISO 9001 / 14001',
        'Priprema za eksternu sertifikaciju',
        'Obuka internih auditora',
        'Kontinuirano unapređenje procesa',
        ],
        process: [
        { step: 'Gap analiza',        desc: 'Procena trenutnog stanja u odnosu na standard.' },
        { step: 'Plan implementacije', desc: 'Prioritizovani plan usklađivanja.' },
        { step: 'Dokumentacija',      desc: 'Izrada QMS dokumentacije i procedura.' },
        { step: 'Interni audit',      desc: 'Verifikacija usklađenosti pre eksternog audita.' },
        { step: 'Sertifikacija',      desc: 'Podrška tokom eksternog audita i sertifikacije.' },
        ],
    },
    ]

    export function getService(slug: string): Service | undefined {
    return services.find(s => s.slug === slug)
    }