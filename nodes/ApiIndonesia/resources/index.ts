import type { INodeProperties } from 'n8n-workflow';
import { wilayahOperations } from './wilayah';
import { sholatOperations } from './sholat';
import { gempaOperations } from './gempa';
import { cuacaOperations } from './cuaca';
import { kursOperations } from './kurs';
import { liburOperations } from './libur';
import { kodeposOperations } from './kodepos';
import { sekolahOperations } from './sekolah';
import { kampusOperations } from './kampus';
import { rsOperations } from './rs';
import { quranOperations } from './quran';
import { alkitabOperations } from './alkitab';
import { kbbiOperations } from './kbbi';
import { platesOperations } from './plates';
import { umpOperations } from './ump';
import { halalOperations } from './halal';
import { bpomOperations } from './bpom';
import { hijriahOperations } from './hijriah';
import { astronomiOperations } from './astronomi';
import { ojkInvestOperations } from './ojkInvest';
import { peringatanDiniOperations } from './peringatanDini';
import { kursBiOperations } from './kursBi';
import { validasiOperations } from './validasi';
import { utilOperations } from './util';

export const resourceProperties: INodeProperties[] = [
  ...wilayahOperations,
  ...sholatOperations,
  ...gempaOperations,
  ...cuacaOperations,
  ...kursOperations,
  ...liburOperations,
  ...kodeposOperations,
  ...sekolahOperations,
  ...kampusOperations,
  ...rsOperations,
  ...quranOperations,
  ...alkitabOperations,
  ...kbbiOperations,
  ...platesOperations,
  ...umpOperations,
  ...halalOperations,
  ...bpomOperations,
  ...hijriahOperations,
  ...astronomiOperations,
  ...ojkInvestOperations,
  ...peringatanDiniOperations,
  ...kursBiOperations,
  ...validasiOperations,
  ...utilOperations,
];