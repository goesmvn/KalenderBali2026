import { getBaliDate } from '../bali-calendar';

const date1 = new Date(1945, 0, 1);
const bali1 = getBaliDate(date1);
console.log('--- 1 Jan 1945 ---');
console.log('Wuku:', bali1.wuku.name);
console.log('Pancawara:', bali1.pancawara.name);
console.log('Saptawara:', bali1.saptawara.name);
console.log('Caturwara:', bali1.caturwara.name);
console.log('Astawara:', bali1.astawara.name);
console.log('Sangawara:', bali1.sangawara.name);
console.log('Lunar:', bali1.penanggalPangelong?.status, bali1.penanggalPangelong?.day);

const date2 = new Date(2000, 0, 1);
const bali2 = getBaliDate(date2);
console.log('\n--- 1 Jan 2000 ---');
console.log('Wuku:', bali2.wuku.name);
console.log('Pancawara:', bali2.pancawara.name);
console.log('Saptawara:', bali2.saptawara.name);

const date3 = new Date(2026, 1, 23);
const bali3 = getBaliDate(date3);
console.log('\n--- 23 Feb 2026 (Today) ---');
console.log('Wuku:', bali3.wuku.name);
console.log('Pancawara:', bali3.pancawara.name);
console.log('Saptawara:', bali3.saptawara.name);
console.log('Saka Year:', bali3.sakaYear);
console.log(`Lunar: ${bali3.penanggalPangelong?.status} ${bali3.penanggalPangelong?.day} (${bali3.purnamaTilem?.name || ''})`);
console.log('Sasih:', bali3.sasih?.name);
console.log('Watek Alit (Suku/Uler):', bali3.watekAlit);
console.log('Watek Madya (Tikus/Wong dll):', bali3.watekMadya);
console.log('Ingkel:', bali3.ingkel);
console.log('Jejepan:', bali3.jejepan);
console.log('Pancasuda:', bali3.pancasuda);
console.log('Rakam:', bali3.rakam);
console.log('Ekajalaresi:', bali3.ekajalaresi);

const date4 = new Date(2026, 2, 3); // 3 Maret 2026 (Purnama Kesanga)
const bali4 = getBaliDate(date4);
console.log('\n--- 3 Maret 2026 (Test Purnama) ---');
console.log(`Lunar: ${bali4.penanggalPangelong?.status} ${bali4.penanggalPangelong?.day} (${bali4.purnamaTilem?.name || ''})`);
console.log('Sasih:', bali4.sasih?.name);

const date5 = new Date(2026, 1, 17); // 17 Feb 2026 (Tilem Kawolu)
const bali5 = getBaliDate(date5);
console.log('\n--- 17 Feb 2026 (Test Tilem) ---');
console.log(`Lunar: ${bali5.penanggalPangelong?.status} ${bali5.penanggalPangelong?.day} (${bali5.purnamaTilem?.name || ''})`);
console.log('Sasih:', bali5.sasih?.name);


