const fs = require('fs');
const path = require('path');

const brandColors = {
  'amber-50': 'brand-50',
  'amber-100': 'brand-100',
  'amber-200': 'brand-200',
  'amber-300': 'brand-300',
  'amber-400': 'brand-400',
  'amber-500': 'brand-600',
  'amber-600': 'brand-700',
  'amber-700': 'brand-800',
  'amber-800': 'brand-900',
  'amber-900': 'brand-950',
  'amber-950': 'brand-950',
  'orange-50': 'brand-50',
  'orange-100': 'brand-100',
  'orange-200': 'brand-200',
  'orange-300': 'brand-300',
  'orange-400': 'brand-400',
  'orange-500': 'brand-700',
  'orange-600': 'brand-800',
  'orange-700': 'brand-900',
  'orange-800': 'brand-950',
  'orange-900': 'brand-950',
  'orange-950': 'brand-950'
};

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function (filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Explicit gradient combinations
    content = content.replace(/from-amber-500 via-orange-500 to-red-500/g, 'from-brand-600 via-brand-700 to-brand-800');
    content = content.replace(/from-amber-500 to-orange-500/g, 'from-brand-600 to-brand-800');
    content = content.replace(/from-amber-50 to-orange-50/g, 'from-brand-50 to-stone-50');
    content = content.replace(/from-amber-100 to-orange-100/g, 'from-brand-100 to-brand-50');

    // Regex for standard color prefixes
    const prefixes = ['text', 'bg', 'border', 'ring', 'from', 'via', 'to', 'hover:text', 'hover:bg', 'hover:border', 'ring-offset', 'group-hover:text', 'group-hover:bg'];

    for (const prefix of prefixes) {
      for (const [oldColor, newColor] of Object.entries(brandColors)) {
        const regexStr = `\\b${prefix}-${oldColor.replace('-', '\\-')}\\b`;
        content = content.replace(new RegExp(regexStr, 'g'), `${prefix}-${newColor}`);
      }
    }

    // specific replacement for cases like 'amber-500/50' -> 'brand-600/50'
    for (const prefix of prefixes) {
      for (const [oldColor, newColor] of Object.entries(brandColors)) {
        const regexStr = `\\b${prefix}-${oldColor.replace('-', '\\-')}\/([0-9]+)\\b`;
        content = content.replace(new RegExp(regexStr, 'g'), `${prefix}-${newColor}/$1`);
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
