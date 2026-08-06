import { LispCommand } from '../types';

export const LISP_COMMANDS: LispCommand[] = [
  {
    id: 'tippon',
    name: 'TIPPON',
    category: 'tippon',
    shortDescEn: 'Numpad Directional Tippon Drawing in Rupee-Annas',
    shortDescTe: 'నంపాడ్ దిశలతో (8,2,4,6) రూపాయిలు-ఆణాలలో టిప్పన్ డ్రాయింగ్ వేయుటకు',
    longDescEn: 'Draw Tippon field survey lines seamlessly using keypad directions (8=UP, 2=DOWN, 4=LEFT, 6=RIGHT). Input dimensions directly as Rupees-Annas (e.g. 15-5 or 12-8), and the LISP automatically converts them to Links and exact Meters, drawing lines and placing labels.',
    longDescTe: 'కంప్యూటర్ కీబోర్డ్ నంపాడ్ (8=పైకి, 2=కిందికి, 4=ఎడమ, 6=కుడి) ఉపయోగించి సులభంగా టిప్పన్ పటం వేయవచ్చు. కొలతలు నేరుగా "15-5" (15 రూపాయిల 5 ఆణాలు) రూపంలో టైప్ చేస్తే, అది ఆటోమేటిక్‌గా లింకులు, మీటర్లుగా మారి లైన్ & లేబుల్ డ్రా అవుతుంది.',
    syntax: 'TIPPON -> Click Start Point -> Enter Rs-Annas (e.g. 15-5) -> Press Numpad Key (8/2/4/6)',
    exampleUsage: 'Command: TIPPON\nPick Start Point\nEnter value: 15-5\nPress 8 (UP) -> Draws line upwards with label "15-5 (30.40m)"',
    keyFeatures: [
      'Direct Rupees-Annas input (e.g. 15-5, 12-8, 10-0)',
      'Numpad controls: 8 (Up), 2 (Down), 4 (Left), 6 (Right)',
      'Automatic Links to Meters calculation: Links = Total Annas * 3.1432, Meters = Links / 5',
      'Auto line labeling with Rupees-Annas & Meters format'
    ],
    iconName: 'Compass'
  },
  {
    id: 'tfc',
    name: 'TFC',
    category: 'tippon',
    shortDescEn: 'Tippon Fix & Connect with Dynamic Label Update (up to 50m)',
    shortDescTe: 'టిప్పన్ గ్యాప్‌లు, ఓవర్‌ల్యాప్‌లు ఫిక్స్ చేస్తూ లేబుల్‌ను ఆటోమేటిక్‌గా అప్‌డేట్ చేస్తుంది',
    longDescEn: 'Fix gaps and overlaps after aligning Tippon drawings. Select line end and target point. TFC stretches/trims the line and dynamically searches up to 50 meters radius to automatically update nearby Rupees-Annas and Meters text labels!',
    longDescTe: 'టిప్పన్ డ్రాయింగ్స్‌లో చివర్లలో వచ్చే గ్యాప్‌లు (Gaps) లేదా ఓవర్‌ల్యాప్‌లను (Overlaps) సరిచేయడానికి ఉపయోగపడుతుంది. లైన్‌ను జాయిన్ చేస్తూ, దాని వద్ద ఉన్న రూపాయి-ఆణాల లేబుల్‌ను 50 మీటర్ల పరిధి వరకు ఆటోమేటిక్‌గా అప్‌డేట్ చేస్తుంది.',
    syntax: 'TFC -> Select Line near loose end -> Click target endpoint to snap',
    exampleUsage: 'Command: TFC\nSelect Line near endpoint\nSnap to target point\nResult: Line endpoint adjusts & label updates from "15-5 (30.40m)" to "15-8 (31.00m)"',
    keyFeatures: [
      'Automatic gap filling & overlap trimming',
      'Dynamic radius label search (3m, 10m, 25m, 50m)',
      'Preserves accuracy of all other survey lines',
      'Re-calculates exact Rupees-Annas & Meters automatically'
    ],
    iconName: 'Unlink'
  },
  {
    id: 'ram',
    name: 'RAM',
    category: 'labeling',
    shortDescEn: 'Below Line Labeling in Rupees-Annas & Meters',
    shortDescTe: 'లైన్ కింద రూపాయిలు-ఆణాలు మరియు మీటర్ల లేబుల్ వేయుటకు',
    longDescEn: 'Select any Line or Polyline segment to place a aligned text label directly below the line showing Rupees-Annas and Meters (e.g. 15-5 (30.40m)).',
    longDescTe: 'లైన్ లేదా పాలిలైన్‌ను సెలెక్ట్ చేస్తే, ఆ లైన్ కింద అలైన్ అవుతూ రూపాయిలు-ఆణాలు మరియు బ్రాకెట్‌లో మీటర్ల లేబుల్ (ఉదా: 15-5 (30.40m)) నిమిషాల్లో ప్రత్యక్షమవుతుంది.',
    syntax: 'RAM -> Enter Text Height -> Select Line / Polyline segment',
    exampleUsage: 'Command: RAM\nEnter Text Height: 0.25\nSelect Line -> Places "15-5 (30.40m)" aligned below the segment.',
    keyFeatures: [
      'Supports both Line and Polyline segments',
      'Auto angle detection (reads left-to-right, non-upside-down)',
      'Adjustable text height parameter',
      'Standard Telangana revenue format: "Rs-Annas (Meters)"'
    ],
    iconName: 'Tag'
  },
  {
    id: 'mf',
    name: 'MF',
    category: 'labeling',
    shortDescEn: 'Below Line Labeling in Meters & Feet-Inches',
    shortDescTe: 'లైన్ కింద మీటర్లు మరియు ఫీట్లు-అంగుళాలు లేబుల్ వేయుటకు',
    longDescEn: 'Places dual unit measurement label below selected line showing meters and feet-inches format (e.g. 10.00m / 32\'-9").',
    longDescTe: 'లైన్ కింద మీటర్లు మరియు ఫీట్లు-అంగుళాల రూపంలో (ఉదా: 10.00m / 32\'-9") ద్వంద్వ కొలతల లేబుల్‌ను ఉంచుతుంది.',
    syntax: 'MF -> Enter Text Height -> Select Line / Polyline segment',
    exampleUsage: 'Command: MF\nSelect Line -> Creates label: "10.00m / 32\'-9\\""',
    keyFeatures: [
      'Exact conversion from Meters to Feet and Inches',
      'Clean readable alignment along line angle',
      'Saves manual conversion time on field site maps'
    ],
    iconName: 'Ruler'
  },
  {
    id: 'ft',
    name: 'FT',
    category: 'labeling',
    shortDescEn: 'Below Line Labeling in Only Feet & Inches',
    shortDescTe: 'కేవలం ఫీట్లు మరియు అంగుళాలలో (Feet & Inches) లేబుల్ వేయుటకు',
    longDescEn: 'Calculates the metric length of line and converts it purely to feet and inches format (e.g., 15\'-5").',
    longDescTe: 'మీటర్లలో ఉన్న కొలతను కేవలం ఫీట్లు మరియు అంగుళాలలో (ఉదా: 15\'-5") లైన్ కింద డిస్ప్లే చేస్తుంది.',
    syntax: 'FT -> Enter Text Height -> Select Line / Polyline segment',
    exampleUsage: 'Command: FT\nSelect Line -> Output: "15\'-5\\""',
    keyFeatures: [
      'Pure Feet & Inches display (Feet\'-Inches")',
      'Rounds inches cleanly for land boundary drawings'
    ],
    iconName: 'CaseSensitive'
  },
  {
    id: 'acgt',
    name: 'ACGT',
    category: 'area',
    shortDescEn: 'Area Labeling in Acres & Gunthas (Ac. 02 - 10.00 Gts.)',
    shortDescTe: 'పాలిలైన్ యొక్క విస్తీర్ణాన్ని ఎకరాలు మరియు గుంటలలో వేయుటకు',
    longDescEn: 'Select any closed polyline plot boundary to automatically compute area in Acres and Gunthas (1 Acre = 40 Gunthas = 4046.85 Sq.m) and place text.',
    longDescTe: 'మూసివున్న పాలిలైన్ (Closed Polyline) స్థలాన్ని సెలెక్ట్ చేస్తే, దాని వైశాల్యాన్ని ఎకరాలు మరియు గుంటలు (ఉదా: Ac. 02 - 10.00 Gts.) గా లెక్కించి డ్రాయింగ్‌లో డిస్ప్లే చేస్తుంది.',
    syntax: 'ACGT -> Select Closed Polyline -> Pick Text Insertion Point',
    exampleUsage: 'Command: ACGT\nSelect Polyline -> Pick Point -> Placed: "Ac. 02 - 10.00 Gts."',
    keyFeatures: [
      'Standard Telangana conversion: 1 Acre = 40 Gunthas',
      'Formatted with leading zeros (e.g. Ac. 01 - 05.50 Gts.)',
      'Instant text placement anywhere inside or outside land polygon'
    ],
    iconName: 'PieChart'
  },
  {
    id: 'chkarea',
    name: 'CHKAREA',
    category: 'area',
    shortDescEn: 'Area Details Dialog Box & Command Line Print',
    shortDescTe: 'స్థలం యొక్క వైశాల్య వివరాలు (Sq.Meters, Acres, Gunthas) అలర్ట్ బాక్స్‌లో చూపిస్తుంది',
    longDescEn: 'Quick verification tool. Select a polyline and instantly see a pop-up alert dialog showing exact area in Sq.Meters, Acres, and Gunthas without modifying drawing.',
    longDescTe: 'డ్రాయింగ్‌ను మార్చకుండా వెంటనే స్థలం విస్తీర్ణాన్ని సరిచూసుకోవడానికి పాలిలైన్‌పై క్లిక్ చేస్తే పాప్‌అప్ విండోలో (Alert Box) చదరపు మీటర్లు, ఎకరాలు & గుంటలు వివరంగా చూపిస్తుంది.',
    syntax: 'CHKAREA -> Select Polyline',
    exampleUsage: 'Command: CHKAREA\nSelect Polyline -> Displays alert box with Acres-Gunthas & Sq.Meters details.',
    keyFeatures: [
      'Instant verification without adding text entities',
      'Prints report to AutoCAD command line log',
      'High precision decimal calculations'
    ],
    iconName: 'Info'
  },
  {
    id: 'sqarea',
    name: 'SQAREA',
    category: 'area',
    shortDescEn: 'Place Centered Area Text in Sq.m & Sq.ft',
    shortDescTe: 'సెంటర్‌లో చదరపు మీటర్లు మరియు చదరపు ఫీట్ల విస్తీర్ణం టెక్స్ట్ రాయడానికి',
    longDescEn: 'Calculates polyline area and automatically places a centered multi-line text (MTEXT) inside the plot showing area in Sq.m and Sq.ft.',
    longDescTe: 'స్థలం పాలిలైన్ సెంటర్‌లో ఆటోమేటిక్‌గా "AREA: 100.00 Sq.m / 1076.39 Sq.ft" టెక్స్ట్‌ను తగిన సైజులో ప్లేస్ చేస్తుంది.',
    syntax: 'SQAREA -> Select Polyline / Rectangle',
    exampleUsage: 'Command: SQAREA\nSelect Rectangle -> Places MTEXT at center with Sq.m and Sq.ft',
    keyFeatures: [
      'Automatic plot center bounding box calculation',
      'Dynamic text sizing based on plot area',
      'Dual unit Sq.m / Sq.ft display'
    ],
    iconName: 'Grid'
  },
  {
    id: 'ctable',
    name: 'CTABLE',
    category: 'tables',
    shortDescEn: 'Survey Coordinate Table Generator (S.No, X, Y)',
    shortDescTe: 'సర్వే పాయింట్ల కోఆర్డినేట్స్ టేబుల్ (S.No, X, Y) స్వయంచాలకంగా తయారు చేయుటకు',
    longDescEn: 'Generate clean AutoCAD tables for survey boundary points. Pick table insertion point, click survey points sequentially, and CTABLE auto-generates S.No, X (Easting), Y (Northing) rows and places POINT markers.',
    longDescTe: 'సర్వే భూమి మూలల (Coordinates) పాయింట్ల టేబుల్‌ను క్షణాల్లో తయారు చేస్తుంది. టేబుల్ లొకేషన్ పిక్ చేసి, డ్రాయింగ్‌లోని పాయింట్లపై క్లిక్ చేసుకుంటూ వెళ్తే S.No, X, Y కోఆర్డినేట్స్ టేబుల్ తయారవుతుంది.',
    syntax: 'CTABLE -> Select Style (Simple/Survey/Equals) -> Enter Text Height -> Pick Table Location -> Click Points',
    exampleUsage: 'Command: CTABLE\nChoice: 2 (Survey N/E)\nPick Table Top-Left\nClick Points on boundary -> Auto builds grid table!',
    keyFeatures: [
      '3 Display Styles: 1) Simple, 2) Survey (E/N), 3) Equals (X=/Y=)',
      'Auto S.No numbering and POINT entity creation',
      'Customizable text height and grid row heights'
    ],
    iconName: 'Table'
  },
  {
    id: 'lgtable',
    name: 'LGTABLE',
    category: 'tables',
    shortDescEn: 'Survey Legend Table Generator with Color Hatch',
    shortDescTe: 'సర్వే లెజెండ్ టేబుల్ (Sy.No, వర్గీకరణ, విస్తీర్ణం, కలర్ హ్యాచ్) క్రియేట్ చేయడానికి',
    longDescEn: 'Create professional Land Revenue Legend Tables. Inputs S.No, Sy.No, Classification (లావణి/పట్టా/గైరాన్), Extent (Acres-Gunthas), and assigns a solid color hatch to the Legend box.',
    longDescTe: 'రెవెన్యూ సర్వే పటాలలో లెజెండ్ టేబుల్ తయారు చేయడానికి. సర్వే నంబర్, క్లాసిఫికేషన్, ఎక్స్‌టెంట్ వివరాలు ఇస్తే ఆటోమేటిక్‌గా కలర్ హ్యాచ్‌తో సుందరమైన టేబుల్ క్రియేట్ అవుతుంది.',
    syntax: 'LGTABLE -> Enter Text Height -> Enter Total Rows -> Pick Location -> Input Row Data & Choose Hatch Color',
    exampleUsage: 'Command: LGTABLE\nRows: 3\nRow 1: Sy.No 12/A, Class: Patta Land, Extent: Ac 02-10, Color: 3 (Green)',
    keyFeatures: [
      'Pre-drawn clean grid structure',
      'Solid color legend hatch generator (Red, Yellow, Green, Cyan, Blue, Magenta, White)',
      'Sequential interactive prompt for quick survey legend setup'
    ],
    iconName: 'LayoutGrid'
  },
  {
    id: 'dall',
    name: 'DALL',
    category: 'dimensions',
    shortDescEn: 'Dual Unit Dimensioning (Meters & Feet stacked)',
    shortDescTe: 'లైన్ యొక్క మీటర్లు మరియు ఫీట్ల డైమెన్షన్ (Aligned Dimension) ఒకేసారి వేయుటకు',
    longDescEn: 'Creates a native AutoCAD Aligned Dimension entity with override text displaying distance in Meters stacked over Feet (e.g., "10.00 m \\P 32.81 ft").',
    longDescTe: 'లైన్ యొక్క డైమెన్షన్ ఇస్తూ, దానిలో మీటర్లు మరియు ఫీట్లను ఒకే బాక్స్‌లో డ్యూయల్ యూనిట్లుగా డిస్ప్లే చేస్తుంది.',
    syntax: 'DALL -> Select Line segment -> Pick Dimension Line Location',
    exampleUsage: 'Command: DALL\nSelect Line -> Places dimension with "10.00 m / 32.81 ft"',
    keyFeatures: [
      'True AutoCAD Dimension object',
      'Stacked multi-line display',
      'Precision to 2 decimal places'
    ],
    iconName: 'Scaling'
  },
  {
    id: 'pdall',
    name: 'PDALL',
    category: 'dimensions',
    shortDescEn: 'Batch Auto Dimension Polyline with Custom Text Height',
    shortDescTe: 'పాలిలైన్ లోని అన్ని లైన్లకు ఒకేసారి డ్యూయల్ డైమెన్షన్స్ (Meters & Feet) వేయుటకు',
    longDescEn: 'Select any continuous polyline and PDALL automatically loops through every segment, creating dual unit aligned dimensions for all sides in one click!',
    longDescTe: 'పాలిలైన్‌పై ఒక్క క్లిక్ చేస్తే, దానిలోని ప్రతీ లైన్ సెగ్మెంట్‌కు ఒకేసారి మీటర్లు & ఫీట్ల డైమెన్షన్స్ ఆటోమేటిక్‌గా జనరేట్ అవుతాయి.',
    syntax: 'PDALL -> Enter Text Height (e.g. 0.25) -> Select Polyline',
    exampleUsage: 'Command: PDALL\nText Height: 0.25\nSelect Polyline -> Auto dimensions all 6 boundary segments!',
    keyFeatures: [
      'Loops through all polyline vertices automatically',
      'User-defined dimension text height override',
      'Enormous time saver for complex multi-sided boundary plots'
    ],
    iconName: 'Boxes'
  },
  {
    id: 'lmf2',
    name: 'LMF2',
    category: 'dimensions',
    shortDescEn: 'Dual Units Meters/Feet Label Aligned Parallel to Line',
    shortDescTe: 'లైన్ కోణానికి సమాంతరంగా మీటర్లు/ఫీట్లు లేబుల్ అలైన్ చేయుటకు',
    longDescEn: 'Creates single-line text aligned parallel to line angle at comfortable offset showing "10.00m / 32.81ft". Automatically flips text to keep it right-side up.',
    longDescTe: 'లైన్ కోణానికి (Angle) అనుగుణంగా తిరుగుతూ మీటర్లు మరియు ఫీట్ల టెక్స్ట్‌ను పారలల్‌గా అలైన్ చేస్తుంది.',
    syntax: 'LMF2 -> Select Line',
    exampleUsage: 'Command: LMF2\nSelect Line -> Creates inline label: "15.20m / 49.87ft"',
    keyFeatures: [
      'Automatic rotation angle alignment',
      'Flipping logic prevents upside-down text',
      'Proportional text height based on segment length'
    ],
    iconName: 'Maximize2'
  }
];
