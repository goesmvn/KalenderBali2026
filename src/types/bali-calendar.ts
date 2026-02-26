// Types for Bali Calendar

import type { Pewatekan, BantenPenebusan } from '../utils/pewatekan-penebusan-data';

export interface Wewaran {
  name: string;
  urip: number;
  dewata: string;
  letak: string;
  description?: string;
}

export interface Wuku {
  name: string;
  urip: number;
  dewata: string;
  letak: string;
}

export interface Sasih {
  name: string;
  month: number; // 1-12
  dewata: string;
  masehiMonth: string;
}

export interface PurnamaTilem {
  type: 'Purnama' | 'Tilem';
  date: Date;
  name: string;
}

export interface PenanggalPangelong {
  status: 'Penanggal' | 'Pangelong';
  day: number; // 1-15
}

export interface BaliDate {
  gregorianDate: Date;

  // Wewaran
  ekawara: Wewaran | null;
  dwiwara: Wewaran;
  triwara: Wewaran;
  caturwara: Wewaran;
  pancawara: Wewaran;
  sadwara: Wewaran;
  saptawara: Wewaran;
  astawara: Wewaran;
  sangawara: Wewaran;
  dasawara: Wewaran;

  // Wuku
  wuku: Wuku;
  wukuNumber: number;

  // Sasih
  sasih: Sasih;

  // Purnama/Tilem
  purnamaTilem: PurnamaTilem | null;

  // Ala Ayuning Dewasa (Hari Baik/Buruk)
  dewasaAyu?: import('../utils/dewasa-ayu-data').AlaAyuningDewasa[];

  // Jam Baik / Dauh Ayu
  dauhAyu?: import('../utils/dauh-ayu').DauhAyuResult | null;

  // Saka year
  sakaYear: number;

  // Lunar Phase
  penanggalPangelong: PenanggalPangelong | null;

  // Extra Elements
  watekAlit: string;
  watekMadya: string;
  ingkel: string;
  jejepan: string;
  pancasuda: string;
  rakam: string;
  ekajalaresi: string;
  lintang: string;
  pararasan: string;
  zodiak: string;

  // Events
  events: string[];

  // Pewatekan Rare
  pewatekan?: Pewatekan;
  penebusan?: BantenPenebusan[];
}

export interface CalendarDay {
  date: Date;
  baliDate: BaliDate | null;
  isCurrentMonth: boolean;
  isToday: boolean;
}
