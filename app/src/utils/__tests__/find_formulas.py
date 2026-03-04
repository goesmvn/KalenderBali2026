# Python script to explore Pratiti formulas
pratiti_names = [
    "Awidya", "Samskara", "Wijnana", "Namarupa", "Sadayatana", "Sparsa", 
    "Wedana", "Tresna", "Upadana", "Bhawa", "Jati", "Jaramarana"
]
bhawa_index = 9 # length is 12 (0 to 11)

# we know on 23 Feb 2026 it is Bhawa
import datetime
# Try pawukon day
# 23 Feb 2026 is Wuku Bala, Soma, Umanis
# Bala is index 24 (25th wuku)
# Soma is day 1 (0 is Radite)
# Day in pawukon = 24 * 7 + 1 = 169
pawukon_day = 169

for offset in range(12):
    if (pawukon_day + offset) % 12 == bhawa_index:
        print(f"If 12-day cycle: Offset is {offset}")
        
# Try Sasih + Penanggal based
sasih = 9 # Kesanga
penanggal = 7 # Penanggal 7
total = sasih + penanggal
for offset in range(12):
    if (total + offset) % 12 == bhawa_index:
        print(f"If Sasih + Penanggal based: Offset is {offset}")

# Ekajalaresi: "Buat Kemeranaan"
# Panca suda has 7 items. Rakâm has 1-18 map. 
# Ekajalaresi might have 3, 5, or more.
