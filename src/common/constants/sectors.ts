export enum Sector {
  'Bilgisayar ve İletişim Teknolojileri' = 0,
  'Elektronik' = 1,
  'Danışmanlık' = 2,
  'Enerji' = 3,
  'Gıda ve Hayvancılık' = 4, // Veterinerlik etc.
  'İnşaat, Mühendislik ve Mimarlık' = 5,
  'Kimya, Kozmetik ve Temizlik' = 6,
  'Madencilik' = 7,
  'Medya ve İletişim' = 8,
  'Otomotiv, Makine ve Techizat İmalatı' = 9,
  'Sağlık, İlaç ve Medikal' = 10,
  'Savunma Sanayi ve Havacılık' = 11,
  'Telekomünikasyon' = 12,
  'Diğer' = 13,
}

const sectorAliases: { [key: string]: Sector } = {
  'eael-cf-yazÄ±lÄ±m': Sector['Bilgisayar ve İletişim Teknolojileri'],
  'eael-cf-ziraat--veteriner': Sector['Gıda ve Hayvancılık'],
  'eael-cf-mÃ¼hendislik': Sector['İnşaat, Mühendislik ve Mimarlık'],
  'eael-cf-tÄ±p-ve-eczacÄ±lÄ±': Sector['Sağlık, İlaç ve Medikal'],
  'eael-cf-savunma': Sector['Savunma Sanayi ve Havacılık'],
  Makina: Sector['Otomotiv, Makine ve Techizat İmalatı'],
  Makine: Sector['Otomotiv, Makine ve Techizat İmalatı'],
  Mühendislik: Sector['İnşaat, Mühendislik ve Mimarlık'],
  'Savunma Sanayii': Sector['Savunma Sanayi ve Havacılık'],
  Medikal: Sector['Sağlık, İlaç ve Medikal'],
  Hizmet: Sector['Danışmanlık'],
  Bilişim: Sector['Bilgisayar ve İletişim Teknolojileri'],
  'Elektrik- Elektronik': Sector['Elektronik'],
  Havacılık: Sector['Savunma Sanayi ve Havacılık'],
  Metal: Sector['Otomotiv, Makine ve Techizat İmalatı'],
  Yazılım: Sector['Bilgisayar ve İletişim Teknolojileri'],
  Bilgisayar: Sector['Bilgisayar ve İletişim Teknolojileri'],
};

export const getSector = (sector: string): Sector => {
  if (Sector[sector]) return Sector[sector];
  if (sectorAliases[sector]) return sectorAliases[sector];
  return Sector['Diğer'];
};
