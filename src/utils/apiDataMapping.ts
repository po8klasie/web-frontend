export const getLanguageEmoji = (lang: string): string => {
  switch (lang) {
    case 'ang':
      return '🇬🇧';
    case 'niem':
      return '🇩🇪';
    case 'fra':
      return '🇫🇷';
    case 'ros':
      return '🇷🇺';
    case 'hisz':
      return '🇪🇸';
    case 'wlo':
      return '🇮🇹';
    case 'szwe':
      return '🇸🇪';
    default:
      return lang;
  }
};

export const institutionTypes = {
  90: 'Bednarska Szkoła Realna',
  58: 'Biblioteki pedagogiczne',
  93: 'Branżowa szkoła I stopnia',
  94: 'Branżowa szkoła II stopnia',
  55: 'Bursa',
  45: 'Centrum Kształcenia Praktycznego',
  96: 'Centrum Kształcenia Zawodowego',
  56: 'Dom wczasów dziecięcych',
  4: 'Gimnazjum',
  89: 'Inna szkoła artystyczna',
  34: 'Kolegium nauczycielskie',
  65: 'Kolegium Pracowników Służb Społecznych',
  14: 'Liceum ogólnokształcące',
  17: 'Liceum ogólnokształcące uzupełniające dla absolwentów zasadniczych szkół zawodowych',
  15: 'Liceum profilowane',
  27: 'Liceum sztuk plastycznych',
  40: 'Międzyszkolny ośrodek sportowy',
  38: 'Młodzieżowy dom kultury',
  54: 'Młodzieżowy Ośrodek Socjoterapii ze szkołami',
  53: 'Młodzieżowy Ośrodek Wychowawczy',
  35: 'Nauczycielskie Kolegium Języków Obcych',
  75: 'Niepubliczna placówka kształcenia ustawicznego i praktycznego',
  83: 'Niepubliczna placówka kształcenia ustawicznego i praktycznego ze szkołami',
  64: 'Niepubliczna placówka oświatowo-wychowawcza w systemie oświaty',
  39: 'Ognisko pracy pozaszkolnej',
  29: 'Ogólnokształcąca szkoła baletowa',
  21: 'Ogólnokształcąca szkoła muzyczna I stopnia',
  24: 'Ogólnokształcąca szkoła muzyczna II stopnia',
  26: 'Ogólnokształcąca szkoła sztuk pięknych',
  41: 'Ogród jordanowski',
  47: 'Ośrodek dokształcania i doskonalenia zawodowego',
  52: 'Ośrodek Rewalidacyjno-Wychowawczy',
  37: 'Pałac młodzieży',
  57: 'Placówka doskonalenia nauczycieli',
  74: 'Placówka Kształcenia Ustawicznego - bez szkół',
  46: 'Placówka Kształcenia Ustawicznego ze szkołami',
  44: 'Placówki artystyczne (ognisko artystyczne)',
  91: 'Policealna szkoła muzyczna',
  92: 'Policealna szkoła plastyczna',
  48: 'Poradnia psychologiczno-pedagogiczna',
  49: 'Poradnia specjalistyczna',
  42: 'Pozaszkolna placówka specjalistyczna',
  82: 'Poznańska szkoła chóralna',
  1: 'Przedszkole',
  81: 'Punkt przedszkolny',
  51: 'Specjalny Ośrodek Szkolno-Wychowawczy',
  50: 'Specjalny Ośrodek Wychowawczy',
  43: 'Szkolne schronisko młodzieżowe',
  85: 'Szkoła muzyczna I stopnia',
  86: 'Szkoła muzyczna II stopnia',
  3: 'Szkoła podstawowa',
  19: 'Szkoła policealna',
  20: 'Szkoła specjalna przysposabiająca do pracy',
  31: 'Szkoła sztuki cyrkowej',
  87: 'Szkoła sztuki tańca',
  16: 'Technikum',
  100: 'Zespół szkół i placówek oświatowych',
  80: 'Zespół wychowania przedszkolnego',
};

export const getSchoolTypeFromRspoInstitutionTypeId = (id: keyof typeof institutionTypes) => {
  if (Object.keys(institutionTypes).includes(`${id}`)) return institutionTypes[id];
  return '-';
};

export const availableExtendedSubjects = [
  'Technik realizacji nagłośnień',
  'wło',
  'Cukiernik',
  'Technik logistyk',
  'Złotnik',
  'Technik realizacji nagrań',
  'filoz',
  'Fryzjer',
  'Technik inżynierii sanitarnej',
  'Technik spedytor',
  'Technik informatyk',
  'geogr',
  'Technik grafiki i poligrafii cyfrowej',
  'pol',
  'Technik budownictwa',
  'Technik programista',
  'Kelner',
  'Kierowca mechanik',
  'Technik ogrodnik',
  'h.muz.',
  'Technik awionik',
  'Technik geodeta',
  'h.szt.',
  'Technik mechatronik',
  'Technik teleinformatyk',
  'Elektromechanik pojazdów samochodowych',
  'jubiler',
  'Technik żywienia i usług gastronomicznych',
  'Technik urządzeń i systemów energetyki odnawialnej',
  'Technik urządzeń dźwigowych',
  'Sprzedawca',
  'Technik elektryk',
  'wielozawodowa',
  'ang',
  'Technik pojazdów samochodowych',
  'Technik weterynarii',
  'Technik reklamy',
  'Magazynier',
  'Technik szerokopasmowej komunikacji elektronicznej',
  'antyk',
  'Technik renowacji elementów architektury',
  'Technik technologii drewna',
  'Technik technologii żywności',
  'Technik elektronik',
  'wos',
  'Technik eksploatacji portów i terminali',
  'Technik architektury krajobrazu',
  'Technik analityk',
  'Technik ortopeda',
  'fiz',
  'Technik lotniskowych służb operacyjnych',
  'logistyk',
  'Technik telekomunikacji',
  'ros',
  'Monter zabudowy i robót wykończeniowych w budownictwie',
  'niem',
  'obcy',
  'Technik mechanik lotniczy',
  'Technik usług fryzjerskich',
  'Technik robót wykończeniowych w budownictwie',
  'Technik hotelarstwa',
  'Technik stylista',
  'Technik przemysłu mody',
  'mat',
  'franc',
  'chem',
  'Technik rachunkowości',
  'inf',
  'Technik ekonomista',
  'Mechanik pojazdów samochodowych',
  'Fotograf',
  'Technik chłodnictwa i klimatyzacji',
  'Technik handlowiec',
  'Technik procesów drukowania',
  'hiszp',
  'biol',
  'hist',
  'Lakiernik samochodowy',
  'Technik ochrony środowiska',
  'Kucharz',
  'Technik organizacji turystyki',
  'Technik fotografii i multimediów',
  'Technik optyk',
  'Monter sieci i instalacji sanitarnych',
];
