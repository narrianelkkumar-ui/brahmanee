import { ComparisonFeature } from '../types';

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    featureEn: 'Tippon Drawing Method',
    featureTe: 'టిప్పన్ పటం వేసే విధానం',
    bhumithi: {
      status: 'poor',
      descriptionEn: 'Slow manual coordinate typing or cumbersome multi-step dialogs.',
      descriptionTe: 'మాన్యువల్‌గా కోఆర్డినేట్స్ టైప్ చేయడం లేదా క్లిష్టమైన డైలాగ్ బాక్స్‌లు నింపాలి.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'Instant Numpad Direction Drawing (8=Up, 2=Down, 4=Left, 6=Right) right in AutoCAD.',
      descriptionTe: 'కీబోర్డ్ నంపాడ్ (8, 2, 4, 6) ద్వారా కేవలం కొలత కొట్టి బాణం గుర్తులతో క్షణాల్లో వేయవచ్చు.'
    }
  },
  {
    featureEn: 'Rupee-Annas Input System',
    featureTe: 'రూపాయిలు-ఆణాల ఎంట్రీ విధానం',
    bhumithi: {
      status: 'poor',
      descriptionEn: 'Requires manual pre-conversion using external charts or calculator.',
      descriptionTe: 'బయట క్యాలిక్యులేటర్ లేదా చార్ట్ చూసి మీటర్లలోకి మార్చుకొని ఎంటర్ చేయాలి.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'Direct "15-5" or "12-8" entry. LISP automatically calculates exact Links & Meters.',
      descriptionTe: 'నేరుగా "15-5" లేదా "12-8" అని టైప్ చేస్తే ఆటోమేటిక్‌గా లింకులు & మీటర్లు లెక్కించబడతాయి.'
    }
  },
  {
    featureEn: 'Fixing Corner Gaps & Overlaps',
    featureTe: 'మూలల గ్యాప్‌లు, ఓవర్‌ల్యాప్‌లు సరిచేయడం',
    bhumithi: {
      status: 'poor',
      descriptionEn: 'Modifying line length ruins labels or distorts entire survey drawing.',
      descriptionTe: 'లైన్ జాయిన్ చేస్తే టెక్స్ట్ మిస్ అవుతుంది లేదా పటం మొత్తం పాడవుతుంది.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'TFC Command stretches/cuts lines while auto-updating nearby Rs-Annas text up to 50m!',
      descriptionTe: 'TFC కమాండ్ ద్వారా జాయిన్ చేస్తే 50 మీటర్ల పరిధిలోని రూపాయి-ఆణాలు టెక్స్ట్ ఆటోమేటిక్‌గా రీ-క్యాలిక్యులేట్ అవుతుంది.'
    }
  },
  {
    featureEn: 'AutoCAD Native Compatibility',
    featureTe: 'ఆటోక్యాడ్ సాఫ్ట్‌వేర్ అనుకూలత',
    bhumithi: {
      status: 'average',
      descriptionEn: 'Separate external application; export issues with standard CAD layers.',
      descriptionTe: 'బయట వేరే సాఫ్ట్‌వేర్ వాడుకోవాలి; ఆటోక్యాడ్‌లోకి ఇంపోర్ట్ చేయడానికి ఇబ్బందులు.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'Runs directly inside any AutoCAD version (2010 to 2026+) using simple APPLOAD.',
      descriptionTe: 'ఏ ఆటోక్యాడ్ వెర్షన్‌లోనైనా (2010 నుండి 2026+) APPLOAD ద్వారా రన్ అవుతుంది.'
    }
  },
  {
    featureEn: 'Survey Coordinate Tables',
    featureTe: 'కోఆర్డినేట్స్ టేబుల్ జనరేషన్ (X, Y)',
    bhumithi: {
      status: 'poor',
      descriptionEn: 'Manual table drawing or limited table export formats.',
      descriptionTe: 'టేబుల్స్ చేతితో గీసుకోవడం లేదా టేబుల్ ఫార్మాట్స్ పరిమితంగా ఉండటం.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'CTABLE generates automated grid table with S.No, X, Y coordinates in 3 styles.',
      descriptionTe: 'CTABLE ద్వారా పాయింట్లపై క్లిక్ చేస్తే చాలు... S.No, X, Y టేబుల్ ఆటోమేటిక్‌గా తయారవుతుంది.'
    }
  },
  {
    featureEn: 'Land Legend & Classification Tables',
    featureTe: 'భూమి వర్గీకరణ లెజెండ్ టేబుల్స్',
    bhumithi: {
      status: 'poor',
      descriptionEn: 'No automatic legend color hatch or classification table tool.',
      descriptionTe: 'పట్టా/గైరాన్/లావణి భూముల కలర్ హ్యాచ్ లెజెండ్ టేబుల్స్ సౌకర్యం లేదు.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'LGTABLE auto-builds revenue legend tables with Sy.No, Extent, and color hatches.',
      descriptionTe: 'LGTABLE ద్వారా సర్వే నంబర్, క్లాసిఫికేషన్, ఎక్స్‌టెంట్ వివరాలతో రంగుల హ్యాచ్ టేబుల్ రెడీ.'
    }
  },
  {
    featureEn: 'Area Calculation & Units',
    featureTe: 'విస్తీర్ణం గుంటలు & ఎకరాలలో',
    bhumithi: {
      status: 'average',
      descriptionEn: 'Basic area display, limited Telangana revenue terminology support.',
      descriptionTe: 'సాధారణ విస్తీర్ణం మాత్రమే చూపిస్తుంది; తెలంగాణ గుంటల ఫార్మాట్ ఉండదు.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'ACGT, CHKAREA, SQAREA give instant Acres-Gunthas (Ac 02-10 Gts) & Sq.m/Sq.ft.',
      descriptionTe: 'ACGT మరియు CHKAREA లతో ఎకరాలు - గుంటలు (Ac 02 - 10 Gts) & చదరపు మీటర్లలో నిమిషాల్లో లెక్కింపు.'
    }
  },
  {
    featureEn: 'Labeling & Unit Flexibility',
    featureTe: 'మీటర్లు, ఫీట్లు, రూపాయి-ఆణాలు లేబులింగ్',
    bhumithi: {
      status: 'poor',
      descriptionEn: 'Single unit view; requires manual text typing for below-line measurements.',
      descriptionTe: 'ఒకే యూనిట్ లో చూపిస్తుంది; లైన్ కింద టెక్స్ట్ రాయడానికి చాలా సమయం పడుతుంది.'
    },
    seedCad: {
      status: 'excellent',
      descriptionEn: 'RAM, MF, FT, DALL, PDALL, LMF2 give multi-unit parallel & stacked labels.',
      descriptionTe: 'RAM, MF, FT, DALL ద్వారా రూపాయి-ఆణాలు, మీటర్లు, ఫీట్లను లైన్ కింద అలైన్ చేసి చూపిస్తుంది.'
    }
  }
];
