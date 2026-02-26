import type { BaliDate } from '../types/bali-calendar';
import { calculateDewasaAyu } from './dewasa-ayu';

/**
 * Result of the score calculation
 */
export interface YadnyaScoreResult {
  score: number; // 0 to 100
  goodMatches: string[]; // Names of good ala ayuning dewasa
  badMatches: string[]; // Names of bad ala ayuning dewasa (larangan)
}

/**
 * Calculates the percentage of "goodness" (0-100) for a specific category on a given date.
 * 
 * @param baliDate The BaliDate to evaluate
 * @param category The category to evaluate (e.g. 'Dewa Yadnya', 'Pertanian')
 * @returns Object containing the score, lists of good and bad matches
 */
export function calculateYadnyaScore(baliDate: BaliDate, category: string): YadnyaScoreResult {
  if (!category) {
    return { score: 0, goodMatches: [], badMatches: [] };
  }

  const dewasaAyuList = calculateDewasaAyu(baliDate);
  const goodMatches: string[] = [];
  const badMatches: string[] = [];

  const targetTag = category;
  const laranganTag = `Larangan ${category}`;

  for (const rule of dewasaAyuList) {
    // Check if the rule is good for this category
    if (rule.tags.includes(targetTag)) {
      goodMatches.push(rule.name);
    }
    
    // Check if the rule is a specific prohibition for this category
    if (rule.tags.includes(laranganTag)) {
      badMatches.push(rule.name);
    }
    
    // Check if the rule is a general prohibition
    if (rule.tags.includes('Larangan Umum')) {
      badMatches.push(rule.name);
    }
  }

  let score = 0;
  
  if (goodMatches.length === 0 && badMatches.length === 0) {
    // Netral - No special good or bad meanings for this category
    score = 0;
  } else if (goodMatches.length > 0 && badMatches.length === 0) {
    // Sangat Baik - Good things without any prohibitions
    score = 100;
  } else if (goodMatches.length === 0 && badMatches.length > 0) {
    // Sangat Buruk - Only prohibitions
    score = 0;
  } else {
    // Campuran - Ada baik ada buruk.
    // Kita berikan penalti besar jika ada larangan umum/spesifik.
    // Score maksimal jika ada larangan mungkin hanya 50%, atau berdasarkan rasio.
    // Misal: (good / (good + bad)) * 100
    score = Math.round((goodMatches.length / (goodMatches.length + badMatches.length)) * 100);
    
    // Pastikan jika ada larangan, score tidak pernah 100 (maks 99)
    if (score === 100) score = 99;
  }

  return {
    score,
    goodMatches,
    badMatches
  };
}
