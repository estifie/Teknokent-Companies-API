import { City } from '../interfaces/city.interface';

const CITIES: { [key: number]: City } = {
  1: {
    cityId: 1,
    cityCode: '01',
    cityName: 'ADANA',
    metropolitan: true,
  },
  2: {
    cityId: 2,
    cityCode: '02',
    cityName: 'ADIYAMAN',
    metropolitan: false,
  },
  3: {
    cityId: 3,
    cityCode: '03',
    cityName: 'AFYONKARAHİSAR',
    metropolitan: false,
  },
  4: {
    cityId: 4,
    cityCode: '04',
    cityName: 'AĞRI',
    metropolitan: false,
  },
  5: {
    cityId: 5,
    cityCode: '05',
    cityName: 'AMASYA',
    metropolitan: false,
  },
  6: {
    cityId: 6,
    cityCode: '06',
    cityName: 'ANKARA',
    metropolitan: true,
  },
  7: {
    cityId: 7,
    cityCode: '07',
    cityName: 'ANTALYA',
    metropolitan: true,
  },
  8: {
    cityId: 8,
    cityCode: '08',
    cityName: 'ARTVİN',
    metropolitan: false,
  },
  9: {
    cityId: 9,
    cityCode: '09',
    cityName: 'AYDIN',
    metropolitan: true,
  },
  10: {
    cityId: 10,
    cityCode: '10',
    cityName: 'BALIKESİR',
    metropolitan: true,
  },
  11: {
    cityId: 11,
    cityCode: '11',
    cityName: 'BİLECİK',
    metropolitan: false,
  },
  12: {
    cityId: 12,
    cityCode: '12',
    cityName: 'BİNGÖL',
    metropolitan: false,
  },
  13: {
    cityId: 13,
    cityCode: '13',
    cityName: 'BİTLİS',
    metropolitan: false,
  },
  14: {
    cityId: 14,
    cityCode: '14',
    cityName: 'BOLU',
    metropolitan: false,
  },
  15: {
    cityId: 15,
    cityCode: '15',
    cityName: 'BURDUR',
    metropolitan: false,
  },
  16: {
    cityId: 16,
    cityCode: '16',
    cityName: 'BURSA',
    metropolitan: true,
  },
  17: {
    cityId: 17,
    cityCode: '17',
    cityName: 'ÇANAKKALE',
    metropolitan: false,
  },
  18: {
    cityId: 18,
    cityCode: '18',
    cityName: 'ÇANKIRI',
    metropolitan: false,
  },
  19: {
    cityId: 19,
    cityCode: '19',
    cityName: 'ÇORUM',
    metropolitan: false,
  },
  20: {
    cityId: 20,
    cityCode: '20',
    cityName: 'DENİZLİ',
    metropolitan: true,
  },
  21: {
    cityId: 21,
    cityCode: '21',
    cityName: 'DİYARBAKIR',
    metropolitan: true,
  },
  22: {
    cityId: 22,
    cityCode: '22',
    cityName: 'EDİRNE',
    metropolitan: false,
  },
  23: {
    cityId: 23,
    cityCode: '23',
    cityName: 'ELAZIĞ',
    metropolitan: false,
  },
  24: {
    cityId: 24,
    cityCode: '24',
    cityName: 'ERZİNCAN',
    metropolitan: false,
  },
  25: {
    cityId: 25,
    cityCode: '25',
    cityName: 'ERZURUM',
    metropolitan: true,
  },
  26: {
    cityId: 26,
    cityCode: '26',
    cityName: 'ESKİŞEHİR',
    metropolitan: true,
  },
  27: {
    cityId: 27,
    cityCode: '27',
    cityName: 'GAZİANTEP',
    metropolitan: true,
  },
  28: {
    cityId: 28,
    cityCode: '28',
    cityName: 'GİRESUN',
    metropolitan: false,
  },
  29: {
    cityId: 29,
    cityCode: '29',
    cityName: 'GÜMÜŞHANE',
    metropolitan: false,
  },
  30: {
    cityId: 30,
    cityCode: '30',
    cityName: 'HAKKARİ',
    metropolitan: false,
  },
  31: {
    cityId: 31,
    cityCode: '31',
    cityName: 'HATAY',
    metropolitan: true,
  },
  32: {
    cityId: 32,
    cityCode: '32',
    cityName: 'ISPARTA',
    metropolitan: false,
  },
  33: {
    cityId: 33,
    cityCode: '33',
    cityName: 'MERSİN',
    metropolitan: true,
  },
  34: {
    cityId: 34,
    cityCode: '34',
    cityName: 'İSTANBUL',
    metropolitan: true,
  },
  35: {
    cityId: 35,
    cityCode: '35',
    cityName: 'İZMİR',
    metropolitan: true,
  },
  36: {
    cityId: 36,
    cityCode: '36',
    cityName: 'KARS',
    metropolitan: false,
  },
  37: {
    cityId: 37,
    cityCode: '37',
    cityName: 'KASTAMONU',
    metropolitan: false,
  },
  38: {
    cityId: 38,
    cityCode: '38',
    cityName: 'KAYSERİ',
    metropolitan: true,
  },
  39: {
    cityId: 39,
    cityCode: '39',
    cityName: 'KIRKLARELİ',
    metropolitan: false,
  },
  40: {
    cityId: 40,
    cityCode: '40',
    cityName: 'KIRŞEHİR',
    metropolitan: false,
  },
  41: {
    cityId: 41,
    cityCode: '41',
    cityName: 'KOCAELİ',
    metropolitan: true,
  },
  42: {
    cityId: 42,
    cityCode: '42',
    cityName: 'KONYA',
    metropolitan: true,
  },
  43: {
    cityId: 43,
    cityCode: '43',
    cityName: 'KÜTAHYA',
    metropolitan: false,
  },
  44: {
    cityId: 44,
    cityCode: '44',
    cityName: 'MALATYA',
    metropolitan: true,
  },
  45: {
    cityId: 45,
    cityCode: '45',
    cityName: 'MANİSA',
    metropolitan: true,
  },
  46: {
    cityId: 46,
    cityCode: '46',
    cityName: 'KAHRAMANMARAŞ',
    metropolitan: true,
  },
  47: {
    cityId: 47,
    cityCode: '47',
    cityName: 'MARDİN',
    metropolitan: true,
  },
  48: {
    cityId: 48,
    cityCode: '48',
    cityName: 'MUĞLA',
    metropolitan: true,
  },
  49: {
    cityId: 49,
    cityCode: '49',
    cityName: 'MUŞ',
    metropolitan: false,
  },
  50: {
    cityId: 50,
    cityCode: '50',
    cityName: 'NEVŞEHİR',
    metropolitan: false,
  },
  51: {
    cityId: 51,
    cityCode: '51',
    cityName: 'NİĞDE',
    metropolitan: false,
  },
  52: {
    cityId: 52,
    cityCode: '52',
    cityName: 'ORDU',
    metropolitan: true,
  },
  53: {
    cityId: 53,
    cityCode: '53',
    cityName: 'RİZE',
    metropolitan: false,
  },
  54: {
    cityId: 54,
    cityCode: '54',
    cityName: 'SAKARYA',
    metropolitan: true,
  },
  55: {
    cityId: 55,
    cityCode: '55',
    cityName: 'SAMSUN',
    metropolitan: true,
  },
  56: {
    cityId: 56,
    cityCode: '56',
    cityName: 'SİİRT',
    metropolitan: false,
  },
  57: {
    cityId: 57,
    cityCode: '57',
    cityName: 'SİNOP',
    metropolitan: false,
  },
  58: {
    cityId: 58,
    cityCode: '58',
    cityName: 'SİVAS',
    metropolitan: false,
  },
  59: {
    cityId: 59,
    cityCode: '59',
    cityName: 'TEKİRDAĞ',
    metropolitan: true,
  },
  60: {
    cityId: 60,
    cityCode: '60',
    cityName: 'TOKAT',
    metropolitan: false,
  },
  61: {
    cityId: 61,
    cityCode: '61',
    cityName: 'TRABZON',
    metropolitan: true,
  },
  62: {
    cityId: 62,
    cityCode: '62',
    cityName: 'TUNCELİ',
    metropolitan: false,
  },
  63: {
    cityId: 63,
    cityCode: '63',
    cityName: 'ŞANLIURFA',
    metropolitan: true,
  },
  64: {
    cityId: 64,
    cityCode: '64',
    cityName: 'UŞAK',
    metropolitan: false,
  },
  65: {
    cityId: 65,
    cityCode: '65',
    cityName: 'VAN',
    metropolitan: true,
  },
  66: {
    cityId: 66,
    cityCode: '66',
    cityName: 'YOZGAT',
    metropolitan: false,
  },
  67: {
    cityId: 67,
    cityCode: '67',
    cityName: 'ZONGULDAK',
    metropolitan: false,
  },
  68: {
    cityId: 68,
    cityCode: '68',
    cityName: 'AKSARAY',
    metropolitan: false,
  },
  69: {
    cityId: 69,
    cityCode: '69',
    cityName: 'BAYBURT',
    metropolitan: false,
  },
  70: {
    cityId: 70,
    cityCode: '70',
    cityName: 'KARAMAN',
    metropolitan: false,
  },
  71: {
    cityId: 71,
    cityCode: '71',
    cityName: 'KIRIKKALE',
    metropolitan: false,
  },
  72: {
    cityId: 72,
    cityCode: '72',
    cityName: 'BATMAN',
    metropolitan: false,
  },
  73: {
    cityId: 73,
    cityCode: '73',
    cityName: 'ŞIRNAK',
    metropolitan: false,
  },
  74: {
    cityId: 74,
    cityCode: '74',
    cityName: 'BARTIN',
    metropolitan: false,
  },
  75: {
    cityId: 75,
    cityCode: '75',
    cityName: 'ARDAHAN',
    metropolitan: false,
  },
  76: {
    cityId: 76,
    cityCode: '76',
    cityName: 'IĞDIR',
    metropolitan: false,
  },
  77: {
    cityId: 77,
    cityCode: '77',
    cityName: 'YALOVA',
    metropolitan: false,
  },
  78: {
    cityId: 78,
    cityCode: '78',
    cityName: 'KARABÜK',
    metropolitan: false,
  },
  79: {
    cityId: 79,
    cityCode: '79',
    cityName: 'KİLİS',
    metropolitan: false,
  },
  80: {
    cityId: 80,
    cityCode: '80',
    cityName: 'OSMANİYE',
    metropolitan: false,
  },
  81: {
    cityId: 81,
    cityCode: '81',
    cityName: 'DÜZCE',
    metropolitan: false,
  },
};

export default CITIES;