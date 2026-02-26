import { getBaliDate } from './src/utils/bali-calendar.ts';

const d = new Date(2026, 1, 24); // Month is 0-indexed, so 1 is February
const baliDate = getBaliDate(d);

console.log('Tanggal:', d.toDateString());
console.log('Ekawara:', baliDate.ekawara?.name || '-');
console.log('Dwiwara:', baliDate.dwiwara?.name || '-');
console.log('Triwara:', baliDate.triwara?.name || '-');
console.log('Caturwara:', baliDate.caturwara?.name || '-');
console.log('Pancawara:', baliDate.pancawara?.name || '-');
console.log('Sadwara:', baliDate.sadwara?.name || '-');
console.log('Saptawara:', baliDate.saptawara?.name || '-');
console.log('Astawara:', baliDate.astawara?.name || '-');
console.log('Sangawara:', baliDate.sangawara?.name || '-');
console.log('Dasawara:', baliDate.dasawara?.name || '-');
