import type { INodeProperties } from 'n8n-workflow';

export const DEFAULT_BASE_URL = 'https://use.apiindonesia.id';

export const resourceOptions: INodeProperties['options'] = [
  { name: 'Wilayah', value: 'wilayah' },
  { name: 'Sholat', value: 'sholat' },
  { name: 'Gempa', value: 'gempa' },
  { name: 'Cuaca', value: 'cuaca' },
  { name: 'Kurs', value: 'kurs' },
  { name: 'Libur', value: 'libur' },
  { name: 'Kodepos', value: 'kodepos' },
  { name: 'Sekolah', value: 'sekolah' },
  { name: 'Kampus', value: 'kampus' },
  { name: 'Rumah Sakit', value: 'rs' },
  { name: 'Quran', value: 'quran' },
  { name: 'Alkitab', value: 'alkitab' },
  { name: 'KBBI', value: 'kbbi' },
  { name: 'Plates', value: 'plates' },
  { name: 'UMP', value: 'ump' },
  { name: 'Halal', value: 'halal' },
  { name: 'BPOM', value: 'bpom' },
  { name: 'Hijriah', value: 'hijriah' },
  { name: 'Astronomi', value: 'astronomi' },
  { name: 'OJK Invest', value: 'ojkInvest' },
  { name: 'Peringatan Dini', value: 'peringatanDini' },
  { name: 'Kurs BI', value: 'kursBi' },
  { name: 'Validasi', value: 'validasi' },
  { name: 'Util', value: 'util' },
];