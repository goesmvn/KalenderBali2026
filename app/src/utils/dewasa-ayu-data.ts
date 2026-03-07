export interface AlaAyuningDewasa {
  name: string;
  description: string;
  conditions: string[];
  tags: string[];
}

// Data digenerate dari referensi kalenderbali.org
export const alaAyuningData: AlaAyuningDewasa[] = [
  {
    "name": "Agni Agung Doyan Basmi",
    "description": "Bersifat panas, tidak baik membangun rumah, terutama tidak baik mengatapi rumah, karena mudah terbakar. Baik untuk mulai membakar bata, genteng, gerabah, keramik, tembikar, dan lain-lain.",
    "conditions": [
      "Anggara Purnama",
      "Anggara Brahma"
    ],
    "tags": [
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Agni Agung Patra Limutan",
    "description": "Baik membuat/meramu obat-obatan, menghilangkan yang angker. Tidak baik membangun rumah, mengatapi rumah, pindah rumah, atau memasuki rumah baru.",
    "conditions": [
      "Redite Brahma"
    ],
    "tags": [
      "Larangan Bhuta Yadnya",
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Amerta Akasa",
    "description": "Baik untuk memuja leluhur/Pitra Yadnya dan Dewa Yadnya Anggara Purnama.",
    "conditions": [],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya"
    ]
  },
  {
    "name": "Amerta Bumi",
    "description": "Baik untuk perkawinan (nikah).",
    "conditions": [
      "Soma Wage Penanggal 1",
      "Buda Pon Penanggal 10"
    ],
    "tags": [
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Amerta Buwana",
    "description": "Baik untuk upacara Dewa Yadnya dan Pitra Yadnya Redite Purnama.",
    "conditions": [
      "Soma Purnama",
      "Anggara Purnama"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya"
    ]
  },
  {
    "name": "Amerta Dadi",
    "description": "Baik untuk upacara Dewa Yadnya dan pemujaan terhadap leluhur.",
    "conditions": [
      "Soma Beteng",
      "Purnama Kajeng"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya"
    ]
  },
  {
    "name": "Amerta Danta",
    "description": "Baik untuk melakukan tapa, brata, yoga, semadi, penyucian diri, segala pekerjaan.",
    "conditions": [
      "Redite Penanggal 6",
      "Soma Penanggal 5",
      "Anggara Penanggal 4",
      "Buda Penanggal 3",
      "Wraspati Penanggal 2",
      "Sukra Penanggal 1",
      "Saniscara Penanggal 7",
      "Soma Purnama",
      "Buda Penanggal 10",
      "Saniscara Penanggal 7"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Amerta Dewa",
    "description": "Baik untuk melakukan Panca Yadnya khususnya Dewa Yadnya, membangun tempat-tempat suci/ibadah, membuat lumbung maupun dapur.",
    "conditions": [
      "Redite Penanggal 6",
      "Redite Pangelong 6",
      "Soma Penanggal 7",
      "Soma Pangelong 7",
      "Anggara Penanggal 3",
      "Anggara Pangelong 3",
      "Buda Penanggal 2",
      "Buda Pangelong 2",
      "Wraspati Penanggal 5",
      "Wraspati Pangelong 5",
      "Sukra Penanggal 1",
      "Sukra Pangelong 1",
      "Saniscara Penanggal 4",
      "Saniscara Pangelong 4"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pertanian",
      "Bangunan",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Amerta Dewa Jaya",
    "description": "Baik untuk hal-hal yang mengandung unsur keunggulan.",
    "conditions": [
      "Soma Penanggal 3",
      "Soma Penanggal 8"
    ],
    "tags": []
  },
  {
    "name": "Amerta Dewata",
    "description": "Baik untuk semua upacara.",
    "conditions": [
      "Sukra Penanggal 12"
    ],
    "tags": []
  },
  {
    "name": "Amerta Gati",
    "description": "Baik untuk memaulai suatu usaha, bercocok tanam.",
    "conditions": [
      "Redite Penanggal 3",
      "Redite Penanggal 6",
      "Soma Penanggal 7",
      "Anggara Penanggal 3",
      "Buda Penanggal 2",
      "Buda Penanggal 3",
      "Wraspati Penanggal 5",
      "Sukra Penanggal 1",
      "Sukra Penanggal 12",
      "Saniscara Penanggal 4",
      "Saniscara Penanggal 7"
    ],
    "tags": [
      "Pertanian",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Amerta Kundalini",
    "description": "Baik untuk bercocok tanam, segala kegiatan atau yadnya.",
    "conditions": [
      "Buda Landep Penanggal 2",
      "Buda Landep Penanggal 12",
      "Wraspati Landep Penanggal 10",
      "Buda Tolu Penanggal 2",
      "Buda Tolu Penanggal 10",
      "Soma Warigadean Penanggal 5",
      "Buda Warigadean Penanggal 6",
      "Buda Julungwangi Penanggal 13",
      "Redite Langkir Penanggal 1",
      "Redite Langkir Penanggal 11",
      "Buda Pujut Penanggal 2",
      "Buda Pujut Penanggal 12",
      "Wraspati Medangkungan Penanggal 5",
      "Wraspati Medangkungan Purnama",
      "Soma Prangbakat Penanggal 1",
      "Soma Prangbakat Penanggal 8",
      "Soma Dukut Penanggal 1",
      "Soma Dukut Penanggal 7",
      "Soma Dukut Purnama"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Amerta Masa",
    "description": "Baik untuk upacara Dewa Yadnya, membangun, dan bercocok tanam.",
    "conditions": [
      "Sukra Purnama"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pertanian",
      "Bangunan"
    ]
  },
  {
    "name": "Amerta Murti",
    "description": "Baik untuk melakukan upacara Manusa Yadnya, upacara potong gigi Buda Keliwon Penanggal 12.",
    "conditions": [],
    "tags": [
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Amerta Pageh",
    "description": "Baik untuk upacara Dewa Yadnya.",
    "conditions": [
      "Saniscara Purnama"
    ],
    "tags": [
      "Dewa Yadnya"
    ]
  },
  {
    "name": "Amerta Papageran",
    "description": "Tidak baik untuk melakukan dewasa ayu karena mengandung pengaruh sakit-sakitan.",
    "conditions": [
      "Saniscara Purnama",
      "Saniscara Yama"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Amerta Sari",
    "description": "Baik untuk upacara Dewa Yadnya di sanggah/merajan, menanam bunga-bungaan.",
    "conditions": [
      "Buda Purnama"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pertanian"
    ]
  },
  {
    "name": "Amerta Wija",
    "description": "Baik untuk upacara Dewa Yadnya, menanam biji-bijian.",
    "conditions": [
      "Wraspati Purnama"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pertanian"
    ]
  },
  {
    "name": "Amertayoga",
    "description": "Baik untuk membangun, mencari pengupa jiwa (nafkah), dan memulai suatu usaha/perusahaan.",
    "conditions": [
      "Soma Landep",
      "Soma Krulut",
      "Soma Ugu",
      "Soma Dukut",
      "Soma Tolu",
      "Soma Medangsia",
      "Soma Medangkungan",
      "Soma Menail",
      "Wraspati Penanggal 4",
      "Saniscara Penanggal 5",
      "Kedasa Penanggal 4",
      "Sadha Penanggal 1"
    ],
    "tags": [
      "Bangunan",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Asuajeg Munggah",
    "description": "Baik untuk membuat alat-alat yang menakutkan seperti lelakut. Tidak baik untuk menanam padi, kacang-kacangan.",
    "conditions": [
      "Redite Gumbreg",
      "Soma Menail",
      "Anggara Sungsang",
      "Buda Wayang",
      "Wraspati Medangsia",
      "Sukra Sinta",
      "Saniscara Merakih"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Asuajeg Turun",
    "description": "Baik untuk membuat penakut, menanam padi, kacang-kacangan, sirih. berburu, membuat alat bunyi-bunyian, kentongan, gamelan, genta, dll.",
    "conditions": [
      "Redite Matal",
      "Soma Warigadean",
      "Anggara Bala",
      "Buda Kuningan",
      "Wraspati Dukut",
      "Sukra Pahang",
      "Saniscara Ukir"
    ],
    "tags": [
      "Pertanian",
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Asuasa",
    "description": "Mengandung sifat boros, tidak baik untuk berbelanja, tidak baik untuk dewasa ayu.",
    "conditions": [
      "Redite Ukir",
      "Redite Pujut",
      "Soma Medangsia",
      "Anggara Wariga",
      "Buda Prangbakat",
      "Wraspati Dunggulan",
      "Sukra Kulawu"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Ayu Badra",
    "description": "Baik untuk memulai suatu usaha, bercocok tanam, membangun.",
    "conditions": [
      "Redite Penanggal 3",
      "Soma Penanggal 7",
      "Soma Penanggal 10",
      "Anggara Penanggal 3",
      "Buda Penanggal 12",
      "Wraspati Penanggal 10",
      "Saniscara Penanggal 11"
    ],
    "tags": [
      "Pertanian",
      "Bangunan",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Ayu Dana Hari",
    "description": "Baik melaksanakan Panca Yadnya, segala macam pekerjaan, berdana punia, bersuci laksana, mengajukan permohonan, bercocok tanam.",
    "conditions": [
      "Sukra Purnama"
    ],
    "tags": [
      "Pertanian",
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Ayu Nulus",
    "description": "Baik untuk segala usaha.",
    "conditions": [
      "Redite Penanggal 6",
      "Soma Penanggal 3",
      "Anggara Penanggal 7",
      "Buda Penanggal 12",
      "Buda Penanggal 13",
      "Wraspati Penanggal 5",
      "Sukra Penanggal 1",
      "Saniscara Penanggal 5"
    ],
    "tags": [
      "Usaha & Karir"
    ]
  },
  {
    "name": "Babi Munggah",
    "description": "Tidak baik untuk bercocok tanam.",
    "conditions": [
      "Wage Tungleh"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Babi Turun",
    "description": "Baik untuk memasang sesirep.",
    "conditions": [
      "Wage Paniron"
    ],
    "tags": []
  },
  {
    "name": "Banyu Milir",
    "description": "Baik untuk membuat sumur, kolam, membuka jalan air, ngirisin (menyadap nira).",
    "conditions": [
      "Redite Kulantir",
      "Soma Wayang",
      "Buda Sinta",
      "Sukra Langkir"
    ],
    "tags": [
      "Bangunan",
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Banyu Urug",
    "description": "Baik untuk membuat bendungan. Tidak baik untuk membuat sumur.",
    "conditions": [
      "Redite Sinta",
      "Soma Sinta",
      "Soma Landep",
      "Soma Wariga",
      "Soma Sungsang",
      "Soma Krulut",
      "Soma Merakih",
      "Soma Medangkungan",
      "Soma Uye",
      "Anggara Sinta",
      "Anggara Tolu",
      "Anggara Medangsia",
      "Anggara Pahang",
      "Soma Krulut",
      "Anggara Merakih",
      "Anggara Matal",
      "Anggara Menail",
      "Buda Tolu",
      "Buda Sungsang",
      "Buda Tambir",
      "Buda Matal",
      "Buda Kulawu",
      "Wraspati Tolu",
      "Wraspati Gumbreg",
      "Wraspati Pujut",
      "Wraspati Tambir",
      "Wraspati Medangkungan",
      "Wraspati Uye",
      "Wraspati Prangbakat",
      "Sukra Gumbreg",
      "Sukra Dunggulan",
      "Sukra Pujut",
      "Sukra Krulut",
      "Sukra Kulawu",
      "Sukra Dukut",
      "Saniscara Kulantir",
      "Saniscara Wariga",
      "Saniscara Tambir"
    ],
    "tags": [
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Bojog Munggah",
    "description": "Tidak baik untuk menanam padi, jagung.",
    "conditions": [
      "Keliwon Was"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Bojog Turun",
    "description": "Baik untuk menyetem gambelan.",
    "conditions": [
      "Keliwon Aryang"
    ],
    "tags": []
  },
  {
    "name": "Buda Gajah",
    "description": "Baik untuk melakukan tapa, brata, yoga, semadi, upacara penyucian (pebersihan lahir batin), dan upacara Dewa Yadnya.",
    "conditions": [
      "Buda Wage Purnama"
    ],
    "tags": [
      "Dewa Yadnya"
    ]
  },
  {
    "name": "Buda Ireng",
    "description": "Baik untuk segala pekerjaan.",
    "conditions": [
      "Buda Wage Tilem"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Buda Suka",
    "description": "Baik untuk segala pekerjaan.",
    "conditions": [
      "Buda Keliwon Tilem"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Carik Walangati",
    "description": "Tidak baik untuk melakukan pernikahan/wiwaha, atiwa-tiwa/ngaben dan membangun rumah.",
    "conditions": [
      "Sinta",
      "Gumbreg",
      "Wariga",
      "Sungsang",
      "Kuningan",
      "Prangbakat",
      "Bala",
      "Wayang",
      "Kulawu",
      "Watugunung"
    ],
    "tags": [
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Catur Laba",
    "description": "Baik untuk bepergian menuju arah utara, upacara Manusa Yadnya, dan Pitra Yadnya.",
    "conditions": [
      "Redite Umanis",
      "Soma Wage",
      "Buda Pon",
      "Saniscara Paing"
    ],
    "tags": [
      "Pitra Yadnya",
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Cintamanik",
    "description": "Baik untuk melakukan upacara potong rambut.",
    "conditions": [
      "Buda Sinta",
      "Buda Ukir",
      "Buda Tolu",
      "Buda Wariga",
      "Buda Julungwangi",
      "Buda Dunggulan",
      "Buda Langkir",
      "Buda Pujut",
      "Buda Krulut",
      "Buda Tambir",
      "Buda Matal",
      "Buda Menail",
      "Buda Bala",
      "Buda Wayang",
      "Buda Dukut"
    ],
    "tags": [
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Corok Kodong",
    "description": "Baik untuk membuat jaring.",
    "conditions": [
      "Wraspati Keliwon Langkir"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Dadig Krana",
    "description": "Baik untuk menanam tebu, mentimun. Tidak baik untuk upacara atau yadnya, mengadakan pertemuan (rapat), berenggama.",
    "conditions": [
      "Redite Penanggal 2",
      "Redite Pangelong 2",
      "Soma Penanggal 1",
      "Soma Pangelong 1",
      "Anggara Penanggal 10",
      "Anggara Pangelong 10",
      "Buda Penanggal 7",
      "Buda Pangelong 7",
      "Wraspati Penanggal 3",
      "Wraspati Pangelong 3",
      "Saniscara Penanggal 6",
      "Saniscara Pangelong 6"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Dasa Amerta",
    "description": "Baik untuk melakukan upacara pembersihan diri, upacara potong gigi, pernikahan tanpa memperhitungkan sasih.",
    "conditions": [
      "Sukra Paing Penanggal 10"
    ],
    "tags": [
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Dasa Guna",
    "description": "Baik untuk membuat bangunan suci, pelantikan pengurus/pejabat.",
    "conditions": [
      "Buda Tilem",
      "Buda Purnama"
    ],
    "tags": [
      "Dewa Yadnya",
      "Peternakan & Hewan",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Dauh Ayu",
    "description": "Baik untuk membuat awig-awig, peraturan-peraturan atau undang-undang, baik untuk membangun.",
    "conditions": [
      "Redite Penanggal 4",
      "Redite Pangelong 4",
      "Redite Penanggal 5",
      "Redite Pangelong 5",
      "Redite Penanggal 6",
      "Redite Pangelong 6",
      "Soma Penanggal 2",
      "Soma Pangelong 2",
      "Soma Penanggal 3",
      "Soma Pangelong 3",
      "Soma Penanggal 5",
      "Soma Pangelong 5",
      "Anggara Penanggal 5",
      "Anggara Pangelong 5",
      "Anggara Penanggal 7",
      "Anggara Pangelong 7",
      "Anggara Penanggal 8",
      "Anggara Pangelong 8",
      "Buda Penanggal 4",
      "Buda Pangelong 4",
      "Wraspati Penanggal 1",
      "Wraspati Pangelong 1",
      "Wraspati Penanggal 4",
      "Wraspati Pangelong 4",
      "Sukra Penanggal 1",
      "Sukra Pangelong 1",
      "Sukra Penanggal 5",
      "Sukra Pangelong 5",
      "Sukra Penanggal 6",
      "Sukra Pangelong 6",
      "Saniscara Penanggal 5",
      "Saniscara Pangelong 5"
    ],
    "tags": [
      "Bangunan",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Derman Bagia",
    "description": "Baik untuk nikah, membangun, mulai belajar/berlatih, belajar menari.",
    "conditions": [
      "Soma Penanggal 2",
      "Soma Penanggal 3",
      "Soma Penanggal 5",
      "Soma Penanggal 12"
    ],
    "tags": [
      "Manusa Yadnya",
      "Bangunan"
    ]
  },
  {
    "name": "Dewa Ngelayang",
    "description": "Baik untuk membuat bangunan suci, Dewa Yadnya dan Pitra Yadnya.",
    "conditions": [
      "Redite Penanggal 6",
      "Soma Penanggal 3",
      "Anggara Penanggal 3",
      "Anggara Penanggal 7",
      "Buda Penanggal 3",
      "Buda Penanggal 13",
      "Buda Purnama",
      "Wraspati Penanggal 5",
      "Sukra Penanggal 1",
      "Saniscara Penanggal 4"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya"
    ]
  },
  {
    "name": "Dewa Stata",
    "description": "Baik untuk melakukan Panca Yadnya, khususnya Dewa Yadnya.",
    "conditions": [
      "Redite Penanggal 10",
      "Soma Penanggal 9",
      "Anggara Penanggal 6",
      "Buda Penanggal 8",
      "Wraspati Penanggal 7",
      "Sukra Penanggal 9",
      "Saniscara Penanggal 10"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Dewa Werdi",
    "description": "Baik untuk upacara Dewa Yadnya, upacara potong gigi.",
    "conditions": [
      "Sukra Wage Penanggal 10"
    ],
    "tags": [
      "Dewa Yadnya",
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Dewasa Mentas",
    "description": "Baik untuk melakukan segala macam yadnya, upacara penyucian (pembersihan), memberi petuah-petuah (nasehat), memberi petunjuk jalan yang berguna, serta baik untuk membangun.",
    "conditions": [
      "Wraspati Penanggal 5",
      "Wraspati Purnama"
    ],
    "tags": [
      "Bangunan",
      "Peternakan & Hewan",
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Dewasa Ngelayang",
    "description": "Baik untuk membangun rumah, membuat jukung dan sejenisnya.",
    "conditions": [
      "Redite Penanggal 1",
      "Redite Penanggal 8",
      "Anggara Penanggal 7",
      "Buda Penanggal 2",
      "Buda Penanggal 3",
      "Wraspati Penanggal 4",
      "Sukra Penanggal 6",
      "Saniscara Penanggal 5"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Dewasa Tanian",
    "description": "Baik untuk mulai menanam, mulai suatu usaha pertanian.",
    "conditions": [
      "Redite Penanggal 10",
      "Soma Penanggal 9",
      "Anggara Penanggal 6",
      "Buda Penanggal 8",
      "Wraspati Penanggal 7",
      "Sukra Penanggal 10",
      "Saniscara Penanggal 10"
    ],
    "tags": [
      "Pertanian",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Dina Carik",
    "description": "Tidak baik dipakai dewasa.",
    "conditions": [
      "Redite Penanggal 12",
      "Soma Penanggal 11",
      "Anggara Penanggal 10",
      "Buda Penanggal 9",
      "Wraspati Penanggal 8",
      "Sukra Penanggal 7",
      "Saniscara Penanggal 6"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Dina Jaya",
    "description": "Baik untuk belajar menari atau pengetahuan yang lain dan mengandung unsur keunggulan.",
    "conditions": [
      "Redite Penanggal 6",
      "Soma Penanggal 5",
      "Buda Penanggal 3",
      "Wraspati Penanggal 2",
      "Sukra Penanggal 1",
      "Saniscara Penanggal 7"
    ],
    "tags": []
  },
  {
    "name": "Dina Mandi",
    "description": "Baik untuk upacara penyucian diri, memberikan petuah-petuah, membuat jimat.",
    "conditions": [
      "Anggara Purnama",
      "Wraspati Penanggal 2",
      "Sukra Penanggal 14",
      "Saniscara Penanggal 3"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Dirgahayu",
    "description": "Baik untuk mulai belajar.",
    "conditions": [
      "Anggara Pon Pandita"
    ],
    "tags": []
  },
  {
    "name": "Dirgayusa",
    "description": "Baik untuk upacara Manusa Yadnya seperti potong gigi dan lain-lain.",
    "conditions": [
      "Buda Pon Penanggal 10"
    ],
    "tags": [
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Gagak Anungsang Pati",
    "description": "Tidak baik melakukan upacara membakar mayat, atiwa-tiwa Penanggal 9.",
    "conditions": [
      "Pangelong 1",
      "Pangelong 6",
      "Pangelong 14"
    ],
    "tags": [
      "Larangan Pitra Yadnya"
    ]
  },
  {
    "name": "Geheng Manyinget",
    "description": "Tidak baik untuk segala pekerjaan yang penting-penting termasuk melakukan yadnya karena banyak ganguan.",
    "conditions": [
      "Redite Penanggal 14",
      "Soma Penanggal 1",
      "Soma Pangelong 7",
      "Anggara Penanggal 2",
      "Anggara Penanggal 10",
      "Buda Pangelong 10",
      "Wraspati Penanggal 5",
      "Sukra Penanggal 14",
      "Saniscara Penanggal 1",
      "Saniscara Penanggal 9"
    ],
    "tags": [
      "Larangan Dewa Yadnya",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Geni Agung",
    "description": "Tidak baik dipakai dewasa, sangat buruk.",
    "conditions": [
      "Redite Umanis Penanggal 10",
      "Anggara Wage Penanggal 8",
      "Buda Pon Penanggal 14"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Geni Murub",
    "description": "Baik untuk segala pekerjaan yang mempergunakan api seperti membakar bata mentah, genteng, dan lain-lain. Tidak baik untuk membangun, mengatapi rumah.",
    "conditions": [
      "Redite Penanggal 12",
      "Soma Penanggal 11",
      "Anggara Penanggal 10",
      "Buda Penanggal 9",
      "Wraspati Penanggal 8",
      "Sukra Penanggal 7",
      "Saniscara Penanggal 6"
    ],
    "tags": [
      "Larangan Bangunan",
      "Larangan Dewa Yadnya",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Geni Rawana",
    "description": "Baik untuk segala pekerjaan yang menggunakan api. Tidak baik untuk mengatapi rumah, melaspas, bercocok tanam.",
    "conditions": [
      "Penanggal 2",
      "Penanggal 4",
      "Penanggal 8",
      "Penanggal 11",
      "Pangelong 3",
      "Pangelong 4",
      "Pangelong 9",
      "Pangelong 13"
    ],
    "tags": [
      "Larangan Dewa Yadnya",
      "Larangan Pertanian",
      "Larangan Bangunan",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Gni Rawana Jejepan",
    "description": "Baik untuk mulai pekerjaan yang menggunakan api seperti membakar genteng, batu bata, keramik, gerabah, membuat senjata tajam (pande besi). Tidak baik mengatapi rumah, melaspas, dan bercocok tanam.",
    "conditions": [
      "Redite Penanggal 12",
      "Soma Penanggal 11",
      "Anggara Penanggal 10",
      "Buda Penanggal 9",
      "Wraspati Penanggal 8",
      "Sukra Penanggal 7",
      "Saniscara Penanggal 6"
    ],
    "tags": [
      "Larangan Dewa Yadnya",
      "Larangan Pertanian",
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Gni Rawana Rangkep",
    "description": "Baik untuk segala pekerjaan yang mempergunakan api. Tidak baik untuk membangun, mengatapi rumah.",
    "conditions": [
      "Anggara Penanggal 2",
      "Anggara Penanggal 4",
      "Anggara Penanggal 8",
      "Anggara Penanggal 11",
      "Buda Penanggal 3",
      "Buda Penanggal 4",
      "Buda Penanggal 9",
      "Buda Penanggal 13"
    ],
    "tags": [
      "Larangan Bangunan",
      "Larangan Dewa Yadnya",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Guntur Umah/Graha",
    "description": "Baik untuk membangun atau memindahkan rumah.",
    "conditions": [
      "Wraspati Medangsia",
      "Wraspati Merakih",
      "Saniscara Medangkungan",
      "Saniscara Ugu",
      "Buda Landep",
      "Buda Tolu"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Ingkel Macan",
    "description": "Baik untuk menangkap banteng/sapi, kerbau, kuda, kambing, dan sejenisnya, dan untuk berburu Wraspati Pon Wariga.",
    "conditions": [],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Istri Payasan",
    "description": "Mengandung unsur keindahan. Baik untuk melaspas dan bercocok tanam Soma Penanggal 8.",
    "conditions": [],
    "tags": [
      "Dewa Yadnya",
      "Pertanian"
    ]
  },
  {
    "name": "Jiwa Menganti",
    "description": "Baik untuk bercocok tanam dan memulai suatu usaha.",
    "conditions": [
      "Soma Tambir",
      "Wraspati Landep",
      "Wraspati Medangkungan",
      "Sukra Wariga",
      "Sukra Bala",
      "Saniscara Watugunung"
    ],
    "tags": [
      "Pertanian",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Kajeng Kipkipan",
    "description": "Baik untuk membuat dungki (keranjang kecil tempat ikan).",
    "conditions": [
      "Buda Gumbreg",
      "Buda Watugunung"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kajeng Kliwon Enyitan",
    "description": "Baik untuk memulai membuat sesikepan atau sesuatu yang berkekuatan gaib Kajeng Keliwon Penanggal 8.",
    "conditions": [
      "Kajeng Keliwon Penanggal 9",
      "Kajeng Keliwon Penanggal 10",
      "Kajeng Keliwon Penanggal 11",
      "Kajeng Keliwon Penanggal 12",
      "Kajeng Keliwon Penanggal 13",
      "Kajeng Keliwon Penanggal 14"
    ],
    "tags": []
  },
  {
    "name": "Kajeng Lulunan",
    "description": "Tidak baik untuk membuat sok dan sejenisnya. Kajeng Ludra Dadi.",
    "conditions": [],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kajeng Rendetan",
    "description": "Baik untuk menanam tumbuhan yang menghasilkan buah.",
    "conditions": [
      "Redite Kajeng Penanggal",
      "Buda Kajeng Penanggal",
      "Saniscara Kajeng Penanggal"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Kajeng Susunan",
    "description": "Baik untuk membuat sok atau sejenisnya. Kajeng Guru Dadi.",
    "conditions": [],
    "tags": []
  },
  {
    "name": "Kajeng Uwudan Tidka",
    "description": "baik untuk menanam dan memetik tanaman.",
    "conditions": [
      "Redite Kajeng Pangelong",
      "Buda Kajeng Pangelong",
      "Saniscara Kajeng Pangelong"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Kala Alap",
    "description": "Baik untuk menanam kelapa.",
    "conditions": [
      "Soma Uye"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Kala Angin",
    "description": "Baik untuk memulai mengajar/melatih sapi, kerbau, kuda, dan ternak lainnya.",
    "conditions": [
      "Redite Krulut",
      "Redite Bala",
      "Redite Kulawu"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Atat",
    "description": "Baik untuk membuat tali, tali pancing, melakukan pekerjaan anyam-anyaman, tampus, jerat.",
    "conditions": [
      "Redite Uye",
      "Anggara Watugunung",
      "Buda Tambir"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Awus",
    "description": "Baik untuk membuat garu (lampit). Tidak baik untuk membuat bendungan/empangan, membangun rumah.",
    "conditions": [
      "Buda Kulawu"
    ],
    "tags": [
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Bancaran",
    "description": "Baik untuk membuat senjata, taji, pengiris (pisau besar untuk mengiris atau untuk mengadap nira).",
    "conditions": [
      "Redite Dunggulan",
      "Soma Sinta",
      "Anggara Tolu",
      "Anggara Dunggulan",
      "Anggara Tambir",
      "Wraspati Matal",
      "Sukra Kuningan",
      "Saniscara Wariga"
    ],
    "tags": []
  },
  {
    "name": "Kala Bangkung, Kala Nanggung",
    "description": "Tidak baik untuk mulai memelihara ternak.",
    "conditions": [
      "Redite Pon",
      "Soma Paing",
      "Buda Umanis",
      "Saniscara Wage"
    ],
    "tags": [
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Beser",
    "description": "Baik untuk menyadap tirta, mengasah taji, tombak. Tidak baik untuk membuat empangan/bendungan, berbicara yang sifatnya rahasia. Tungleh Kala.",
    "conditions": [],
    "tags": [
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Brahma",
    "description": "Mengandung arti kepanasan atau kesakitan.",
    "conditions": [
      "Redite Menail",
      "Anggara Medangsia",
      "Buda Sinta",
      "Sukra Kulantir",
      "Sukra Bala",
      "Sukra Watugunung",
      "Saniscara Langkir"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Bregala",
    "description": "Tidak baik dipakai dewasa ayu.",
    "conditions": [
      "Soma Landep"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Buingrau",
    "description": "Baik untuk menebang kayu, membuat bubu, memuja pitra. Tidak baik untuk membangun, mengatapi rumah.",
    "conditions": [
      "Redite Indra",
      "Soma Uma",
      "Anggara Ludra",
      "Buda Brahma",
      "Wraspati Guru",
      "Sukra Sri",
      "Saniscara Yama"
    ],
    "tags": [
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Cakra",
    "description": "Baik untuk memulai segala jenis pekerjaan, mengandung arti kebulatan tekad.",
    "conditions": [
      "Saniscara Menail"
    ],
    "tags": []
  },
  {
    "name": "Kala Capika",
    "description": "Baik untuk membuat pancing (kail), perangkap.",
    "conditions": [
      "Soma Merakih Penanggal 3"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Caplokan",
    "description": "Baik untuk membuat alat-alat penangkap ikan seperti pancing (kail), jala, jaring, bubu, bahan untuk umpan.",
    "conditions": [
      "Soma Julungwangi",
      "Soma Merakih",
      "Anggara Tambir",
      "Buda Prangbakat",
      "Sukra Kuningan",
      "Saniscara Sinta",
      "Saniscara Julungwangi",
      "Saniscara Pujut"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Cepitan",
    "description": "Baik untuk membuat pancing, jebag/perangkap, dan alat yang berfungsi menjepit Soma Paing Merakih.",
    "conditions": [],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Dangastra",
    "description": "Baik untuk membangun tembok pekarangan, membuat alat-alat penangkap ikan. Tidak baik untuk memulai pekerjaan penting, tidak baik melakukan upacara (gawe ayu).",
    "conditions": [
      "Redite Kulantir",
      "Redite Menail",
      "Soma Sungsang",
      "Soma Dukut",
      "Anggara Medangsia",
      "Anggara Pahang",
      "Anggara Merakih",
      "Buda Sinta",
      "Buda Medangkungan",
      "Wraspati Dunggulan",
      "Sukra Kulantir",
      "Sukra Dunggulan",
      "Sukra Bala",
      "Sukra Watugunung",
      "Saniscara Langkir",
      "Saniscara Pujut",
      "Saniscara Krulut"
    ],
    "tags": [
      "Larangan Bangunan",
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Dangu",
    "description": "Tidak baik untuk memulai suatu pekerjaan, pindah tempat, bepergian.",
    "conditions": [
      "Redite Tolu",
      "Redite Langkir",
      "Redite Uye",
      "Redite Wayang",
      "Soma Merakih",
      "Anggara Ukir",
      "Anggara Gumbreg",
      "Anggara Dunggulan",
      "Anggara Krulut",
      "Buda Sinta",
      "Buda Julungwangi",
      "Buda Tambir",
      "Buda Kulawu",
      "Wraspati Wariga",
      "Wraspati Pujut",
      "Wraspati Prangbakat",
      "Sukra Dunggulan",
      "Sukra Matal",
      "Sukra Menail",
      "Sukra Ugu",
      "Saniscara Warigadean",
      "Saniscara Sungsang",
      "Saniscara Dunggulan",
      "Saniscara Medangsia",
      "Saniscara Pahang",
      "Saniscara Medangkungan",
      "Saniscara Bala",
      "Saniscara Dukut",
      "Saniscara Watugunung"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Demit",
    "description": "Baik untuk memasang tanda-tanda atau alat-alat yang mengandung arti larangan, membuat pagar, memasang pelindung kelapa (ngangasin), hal-hal menghalau, atau mengusir. Tidak baik unruk mengajukan permohonan.",
    "conditions": [
      "Saniscara Ukir"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Empas Munggah",
    "description": "Baik untuk membangun rumah. Tidak baik untuk memetik buah-buahan.",
    "conditions": [
      "Wage Urukung"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Empas Turun",
    "description": "Baik untuk menanam umbi-umbian. Tidak baik untuk membangun, memetik buah-buahan.",
    "conditions": [
      "Wage Maulu"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Gacokan",
    "description": "Baik untuk membuat alat-alat yang runcing seperti taji, tombak dan sebagainya.",
    "conditions": [
      "Anggara Tambir"
    ],
    "tags": []
  },
  {
    "name": "Kala Garuda",
    "description": "Tidak baik untuk dipakai dewasa ayu.",
    "conditions": [
      "Anggara Landep"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Geger",
    "description": "Baik untuk membuat alat-alat penangkap ikan, membuat kentongan, cagcag (perkakas tenun), kroncongan (genta sampi dari kayu), genta (bajra), kendang (bedug), gambelan, dan alat bunyi-bunyian lainnya.",
    "conditions": [
      "Wraspati Wariga",
      "Saniscara Wariga"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Gotongan",
    "description": "Baik untuk memulai suatu usaha. Tidak baik untuk mengubur atau membakar mayat.",
    "conditions": [
      "Sukra Keliwon",
      "Saniscara Umanis",
      "Redite Paing"
    ],
    "tags": [
      "Larangan Pitra Yadnya",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Kala Graha",
    "description": "Baik untuk membangun perumahan.",
    "conditions": [
      "Soma Landep",
      "Saniscara Tolu"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Kala Gumarang Munggah",
    "description": "Baik melakukan upacara Bhuta Yadnya. Tidak Baik untuk menanam sirih, tembakau.",
    "conditions": [
      "Pon Urukung"
    ],
    "tags": [
      "Larangan Bhuta Yadnya",
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Kala Gumarang Turun",
    "description": "Baik untuk menanam sirih dan tambakau. Tidak baik untuk pembuatan bibit.",
    "conditions": [
      "Pon Maulu"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Kala Guru",
    "description": "Baik untuk membuat peraturan, awig-awig.",
    "conditions": [
      "Buda Landep"
    ],
    "tags": [
      "Usaha & Karir"
    ]
  },
  {
    "name": "Kala Ingsor",
    "description": "Mengandung sifat/tanda-tanda mengecewakan Kulantir.",
    "conditions": [
      "Medangsia",
      "Prangbakat"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Isinan",
    "description": "Baik untuk mulai belajar, membuat almari, membuat gudang atau tempat barang-barang.",
    "conditions": [
      "Soma Dunggulan",
      "Soma Krulut",
      "Buda Watugunung"
    ],
    "tags": []
  },
  {
    "name": "Kala Jangkut",
    "description": "Baik untuk membuat pencar, jaring, senjata.",
    "conditions": [
      "Pepet Kajeng"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Jengkang",
    "description": "Baik untuk membuat alat penangkap ikan, bubu dan mengadakan sabungan ayam (tajen) Redite Umanis Ukir.",
    "conditions": [],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Jengking",
    "description": "Baik untuk mulai belajar menari, menabuh, membuat bubu, seser, jaring. Tidak baik untuk Manusa Yadnya, nikah, upacara potong rambut. Urukung Kala.",
    "conditions": [],
    "tags": [
      "Larangan Manusa Yadnya",
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Katemu",
    "description": "Baik untuk menangkap ikan, berburu, mapikat, memasang jerat, kungkungan, mangadakan pertemuan.",
    "conditions": [
      "Redite Sinta",
      "Redite Julungwangi",
      "Redite Pujut",
      "Soma Ukir",
      "Soma Tolu",
      "Soma Krulut",
      "Anggara Dunggulan",
      "Anggara Pahang",
      "Anggara Tambir",
      "Anggara Watugunung",
      "Buda Tolu",
      "Buda Wariga",
      "Buda Langkir",
      "Buda Dukut",
      "Wraspati Sinta",
      "Wraspati Julungwangi",
      "Wraspati Pujut",
      "Sukra Ukir",
      "Sukra Krulut",
      "Saniscara Tolu",
      "Saniscara Dunggulan",
      "Saniscara Pahang",
      "Saniscara Tambir",
      "Saniscara Wayang"
    ],
    "tags": [
      "Peternakan & Hewan",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Kala Keciran",
    "description": "Baik untuk membuat pisau penyadap (pengiris), mulai memotong danggul nira, membuat atau membuka saluran air.",
    "conditions": [
      "Buda Gumbreg"
    ],
    "tags": []
  },
  {
    "name": "Kala Kilang-kilung",
    "description": "Baik untuk membuat barong, membuat sok (bakul), dan segala anyam-anyaman.",
    "conditions": [
      "Soma Krulut",
      "Wraspati Tambir"
    ],
    "tags": []
  },
  {
    "name": "Kala Kingkingan",
    "description": "Tidak baik untuk meminang.",
    "conditions": [
      "Wraspati Krulut"
    ],
    "tags": [
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Kala Klingkung",
    "description": "Baik untuk mencuri demi kepentingan umum yang bertujuan baik.",
    "conditions": [
      "Anggara Sinta"
    ],
    "tags": []
  },
  {
    "name": "Kala Kutila",
    "description": "Baik untuk memulai pekerjaan yang mempergunakan api.",
    "conditions": [
      "Aryang Brahma"
    ],
    "tags": []
  },
  {
    "name": "Kala Kutila Manik",
    "description": "Baik untuk membuat ranjau, pagar, rintangan, lubang penghalang maupun pemisah, alat perangkap, upacara Bhuta Yadnya.",
    "conditions": [
      "Kajeng Keliwon"
    ],
    "tags": [
      "Bhuta Yadnya",
      "Bangunan"
    ]
  },
  {
    "name": "Kala Luang",
    "description": "Baik untuk membuat terowongan, menanam ketela atau umbi-umbian.",
    "conditions": [
      "Redite Dunggulan",
      "Redite Kuningan",
      "Redite Langkir",
      "Soma Wayang",
      "Anggara Watugunung",
      "Anggara Warigadean",
      "Anggara Sungsang",
      "Anggara Tambir",
      "Anggara Menail",
      "Anggara Sinta",
      "Buda Landep",
      "Buda Tolu",
      "Buda Gumbreg",
      "Buda Pahang",
      "Buda Merakih",
      "Wraspati Kulawu",
      "Wraspati Dukut"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Kala Lutung Magelut",
    "description": "Baik untuk membuat/meramu obat-obatan, mencampur sadek (makanan jangkrik), mulai membikin sawuh, melakukan tapa brata. Tidak baik untuk berburu.",
    "conditions": [
      "Redite Ukir",
      "Buda Sungsang"
    ],
    "tags": [
      "Larangan Bangunan",
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Lutung Megandong",
    "description": "Baik untuk menanam pijer (bibit kelapa yang baru tumbuh), menanam buah-buahan.",
    "conditions": [
      "Wraspati Keliwon"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Kala Macan",
    "description": "Baik untuk membuat segala yang menakutkan, membuat tombak, keris, lelakut (penakut). Tidak baik untuk berbicara yang tidak perlu Wraspati Tambir.",
    "conditions": [],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Mangap",
    "description": "Tidak baik untuk berbelanja, bila menggunakan hari ini akan berakibat boros.",
    "conditions": [
      "Redite Umanis"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Manguneb",
    "description": "Baik untuk membuat paketok (perangkap landak) dan santeb (semacam perangkap binatang).",
    "conditions": [
      "Wraspati Medangsia"
    ],
    "tags": []
  },
  {
    "name": "Kala Matampak",
    "description": "Baik untuk menanam segala sesuatu (bercocok tanam).",
    "conditions": [
      "Buda Ukir",
      "Sukra Ukir",
      "Wraspati Kulawu",
      "Saniscara Wariga",
      "Saniscara Prangbakat"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Kala Mereng",
    "description": "Tidak baik untuk bercocok tanam Redite Julungwangi.",
    "conditions": [
      "Redite Prangbakat",
      "Soma Dunggulan",
      "Soma Ugu",
      "Anggara Langkir",
      "Buda Pujut",
      "Buda Watugunung",
      "Wraspati Landep",
      "Wraspati Krulut",
      "Wraspati Tambir",
      "Saniscara Matal"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Kala Miled",
    "description": "Baik untuk meramu obat-obatan, sadek dan yang sejenisnya.",
    "conditions": [
      "Soma Pahang"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Kala Mina",
    "description": "Baik untuk membuat peralatan penangkap ikan, tombak, dan baik untuk menangkap ikan.",
    "conditions": [
      "Sukra Warigadean",
      "Sukra Medangsia"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Mretyu",
    "description": "Baik untuk membuat senjata, mulai berperang membela kebenaran, memberi nasehat kepada orang lain. Tidak baik untuk bersenggama, segala yadnya.",
    "conditions": [
      "Redite Sinta",
      "Redite Merakih",
      "Soma Menail",
      "Anggara Medangsia",
      "Anggara Wayang",
      "Buda Sinta",
      "Wraspati Tolu",
      "Sukra Julungwangi",
      "Saniscara Medangsia"
    ],
    "tags": [
      "Larangan Dewa Yadnya",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Kala Muas",
    "description": "Tidak baik untuk menanam sesuatu (bercocok tanam).",
    "conditions": [
      "Redite Kulantir",
      "Soma Wayang",
      "Saniscara Pahang"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Kala Muncar",
    "description": "Baik untuk membuat taji, mengasah senjata.",
    "conditions": [
      "Buda Dunggulan"
    ],
    "tags": []
  },
  {
    "name": "Kala Muncrat",
    "description": "Baik untuk membuat keris, tombak, taji dll.",
    "conditions": [
      "Soma Pon Merakih"
    ],
    "tags": []
  },
  {
    "name": "Kala Ngadeg",
    "description": "Baik untuk membuat pintu gerbang, tembok pekarangan, pagar, sangkar ayam (guwungan), kisa pengaduan, mulai memeliharan ayam kurungan, membuat empangan/bendungan.",
    "conditions": [
      "Redite Pujut",
      "Redite Krulut",
      "Soma Tambir",
      "Soma Kulawu",
      "Sukra Kuningan",
      "Sukra Watugunung"
    ],
    "tags": [
      "Bangunan",
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Ngamut",
    "description": "Baik untuk membuat pancing (kail) dan alat-alat panangkap ikan lainnya.",
    "conditions": [
      "Soma Merakih"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Ngruda",
    "description": "Baik untuk membuat taji, keris, ranjau (sungga), bambu runcing (gelanggang) dan sejenisnya, membuat rencana baik. Tidak baik untuk segala pekerjaan, akan mendapat godaan/halangan sakit keras, melakukan yadnya yang besar.",
    "conditions": [
      "Redite Dukut",
      "Soma Sungsang",
      "Soma Menail",
      "Saniscara Sungsang"
    ],
    "tags": [
      "Larangan Dewa Yadnya",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Kala Ngunya",
    "description": "Baik untuk berkunjung, membuat/memasang kungkungan dan bubu.",
    "conditions": [
      "Redite Ukir"
    ],
    "tags": []
  },
  {
    "name": "Kala Olih",
    "description": "Baik untuk memulai suatu usaha. Tidak baik untuk membuat terowongan, sumur, mulai membajak.",
    "conditions": [
      "Buda Prangbakat"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Kala Pacekan",
    "description": "Baik untuk membuat tombak, taji, keris, dan sejenisnya. Tidak baik untuk mengadakan perundingan/rapat.",
    "conditions": [
      "Anggara Tolu"
    ],
    "tags": [
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Kala Pager",
    "description": "Baik untuk membuat tembok, pagar, dan sejenisnya. Tidak baik untuk bepergian.",
    "conditions": [
      "Wraspati Wariga"
    ],
    "tags": [
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Panyeneng",
    "description": "Baik untuk membuat peraturan-peraturan, awig-awig, membuat tempat penyimpanan harta benda.",
    "conditions": [
      "Redite Wariga",
      "Sukra Watugunung"
    ],
    "tags": [
      "Usaha & Karir"
    ]
  },
  {
    "name": "Kala Pati",
    "description": "Baik untuk membuat jerat dan memasangnya, pembuat pengrusak. Tidak baik untuk semua upacara dan pekerjaan yang lainnya.",
    "conditions": [
      "Redite Landep",
      "Redite Sungsang",
      "Anggara Gumbreg",
      "Anggara Medangsia",
      "Anggara Wayang",
      "Buda Landep",
      "Buda Sungsang",
      "Buda Ugu",
      "Wraspati Gumbreg",
      "Saniscara Krulut"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Pati Jengkang",
    "description": "Baik untuk mengadakan sabungan.",
    "conditions": [
      "Wraspati Urukung"
    ],
    "tags": []
  },
  {
    "name": "Kala Pegat",
    "description": "Baik untuk mulai menyadap (ngirisin), memisah bayi menetek (melas rare). Tidak baik untuk melakukan karya ayu.",
    "conditions": [
      "Buda Kuningan",
      "Saniscara Ukir",
      "Saniscara Merakih"
    ],
    "tags": [
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Kala Prawani",
    "description": "Tidak baik untuk semua kegiatan, hari ini mengandung pengaruh yang kurang baik.",
    "conditions": [
      "Redite Sinta",
      "Anggara Prangbakat",
      "Buda Landep",
      "Wraspati Tambir"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Raja",
    "description": "Baik untuk segala pekerjaan, mengkat atau melantik petugas atau calon pejabat.",
    "conditions": [
      "Wraspati Dukut"
    ],
    "tags": [
      "Usaha & Karir",
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  },
  {
    "name": "Kala Rau",
    "description": "Baik untuk meramu obat-obatan, sadek, membuat senjata, upas (penjaga). Tidak baik untuk membangun rumah, mengatapi rumah akibatnya akan terbakar, batasi berbicara yang dapat menimbulkan kekeliruan, mengawinkan orang.",
    "conditions": [
      "Redite Sinta",
      "Sukra Gumbreg",
      "Saniscara Ukir",
      "Saniscara Kulantir",
      "Saniscara Merakih"
    ],
    "tags": [
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Rebutan",
    "description": "Baik untuk membuat tempat berjualan, membuat alat-alat tempat barang dagangan, alat-alat penangkap ikan, membuat dan memasang kungkungan.",
    "conditions": [
      "Soma Ugu"
    ],
    "tags": [
      "Peternakan & Hewan",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Kala Rumpuh",
    "description": "Tidak baik untuk pindah rumah, memulai memelihara ayam, itik, sapi, kerbau, kambing, babi (ternak).",
    "conditions": [
      "Redite Merakih",
      "Redite Watugunung",
      "Soma Julungwangi",
      "Soma Medangkungan",
      "Buda Sungsang",
      "Buda Tambir",
      "Buda Bala",
      "Buda Ugu",
      "Buda Wayang",
      "Wraspati Langkir",
      "Wraspati Medangsia",
      "Wraspati Krulut",
      "Wraspati Uye",
      "Wraspati Prangbakat",
      "Sukra Dunggulan",
      "Sukra Kuningan",
      "Saniscara Matal",
      "Saniscara Menail",
      "Saniscara Kulawu",
      "Saniscara Dukut"
    ],
    "tags": [
      "Larangan Bangunan",
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Sapuhau",
    "description": "Baik untuk membuat alat-alat pertanian seperti garu, tulud, pemlasahan, tenggala (bajak). Tidak baik untuk membangun.",
    "conditions": [
      "Soma Ukir",
      "Anggara Wayang",
      "Buda Kulawu",
      "Sukra Watugunung"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Bangunan"
    ]
  },
  {
    "name": "Kala Sarang",
    "description": "Mengandung sifat boros/terapas. Tidak baik untuk berbelanja Wariga.",
    "conditions": [
      "Krulut"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Siyung",
    "description": "Tidak baik, hari ini harus diwaspadai karena mengandung pengaruh buas.",
    "conditions": [
      "Redite Landep",
      "Redite Matal",
      "Soma Sungsang",
      "Soma Bala",
      "Soma Sinta",
      "Buda Sinta",
      "Buda Medangkungan",
      "Wraspati Prangbakat",
      "Wraspati Ugu",
      "Sukra Kulawu",
      "Saniscara Pujut",
      "Saniscara Krulut"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Sor",
    "description": "Tidak baik untuk bekerja hubungannya dengan dengan tanah seperti membajak, bercocok tanam, membuat terowongan.",
    "conditions": [
      "Redite Ukir",
      "Redite Julungwangi",
      "Redite Pujut",
      "Redite Matal",
      "Redite Wayang",
      "Soma Sinta",
      "Soma Landep",
      "Soma Warigadean",
      "Soma Gumbreg",
      "Soma Dunggulan",
      "Soma Medangsia",
      "Soma Pahang",
      "Soma Medangkungan",
      "Soma Matal",
      "Soma Ugu",
      "Anggara Sinta",
      "Anggara Kulantir",
      "Anggara Wariga",
      "Anggara Julungwangi",
      "Anggara Langkir",
      "Anggara Medangsia",
      "Anggara Prangbakat",
      "Anggara Bala",
      "Anggara Dukut",
      "Buda Ukir",
      "Buda Warigadean",
      "Buda Kuningan",
      "Buda Langkir",
      "Buda Merakih",
      "Buda Menail",
      "Buda Prangbakat",
      "Buda Kulawu",
      "Buda Watugunung",
      "Wraspati Tolu",
      "Wraspati Dunggulan",
      "Wraspati Krulut",
      "Wraspati Menail",
      "Wraspati Dukut",
      "Sukra Ukir",
      "Sukra Kulantir",
      "Sukra Warigadean",
      "Sukra Sungsang",
      "Sukra Langkir",
      "Sukra Pahang",
      "Sukra Merakih",
      "Sukra Uye",
      "Sukra Menail",
      "Sukra Kulawu",
      "Saniscara Ukir",
      "Saniscara Julungwangi",
      "Saniscara Pujut",
      "Saniscara Matal",
      "Saniscara Wayang"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Kala Sudangastra",
    "description": "Baik untuk membuat alat-alat yang runcing.",
    "conditions": [
      "Redite Prangbakat",
      "Anggara Kulawu",
      "Buda Landep",
      "Buda Kuningan",
      "Wraspati Tambir",
      "Saniscara Gumbreg"
    ],
    "tags": []
  },
  {
    "name": "Kala Sudukan",
    "description": "Tidak baik untuk memindahkan orang sakit, menunjukkan unsur perombakan.",
    "conditions": [
      "Redite Kuningan",
      "Soma Landep",
      "Soma Ukir",
      "Soma Uye",
      "Soma Bala",
      "Anggara Gumbreg",
      "Anggara Warigadean",
      "Anggara Wayang",
      "Buda Sinta",
      "Buda Medangkungan",
      "Wraspati Matal",
      "Sukra Tolu",
      "Sukra Prangbakat",
      "Sukra Ugu",
      "Saniscara Medangsia",
      "Saniscara Pujut",
      "Saniscara Pahang",
      "Saniscara Krulut"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Sungsang",
    "description": "Mengandung sifat/unsur terbalik, bertentangan, kontras. Tidak baik untuk melakukan karya ayu atau yadnya Wayang.",
    "conditions": [],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Susulan",
    "description": "Baik untuk membuat tepis, sabang (jating.",
    "conditions": [
      "Soma Dunggulan"
    ],
    "tags": []
  },
  {
    "name": "Kala Suwung",
    "description": "Tidak baik untuk dewasa ayu, berkunjung.",
    "conditions": [
      "Soma Landep",
      "Anggara Warigadean",
      "Buda Tolu",
      "Anggara Sungsang",
      "Buda Gumbreg",
      "Buda Pahang",
      "Buda Merakih",
      "Saniscara Dunggulan",
      "Saniscara Langkir",
      "Saniscara Medangsia"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Tampak",
    "description": "Tidak baik untuk dewasa nikah (perkawinan).",
    "conditions": [
      "Redite Tolu",
      "Redite Langkir",
      "Redite Matal",
      "Redite Dukut",
      "Soma Ukir",
      "Soma Dunggulan",
      "Soma Tambir",
      "Soma Wayang",
      "Anggara Warigadean",
      "Anggara Pahang",
      "Anggara Prangbakat",
      "Buda Sinta",
      "Buda Julungwangi",
      "Buda Krulut",
      "Buda Bala",
      "Wraspati Gumbreg",
      "Wraspati Medangsia",
      "Wraspati Uye",
      "Wraspati Watugunung",
      "Sukra Kulantir",
      "Sukra Kuningan",
      "Sukra Medangkungan",
      "Sukra Kulawu",
      "Saniscara Wariga",
      "Saniscara Pujut",
      "Saniscara Menail"
    ],
    "tags": [
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Kala Temah",
    "description": "Tidak baik untuk dewasa ayu.",
    "conditions": [
      "Redite Medangsia",
      "Redite Pujut",
      "Redite Kulawu",
      "Redite Dukut",
      "Soma Sinta",
      "Soma Landep",
      "Soma Tolu",
      "Soma Wariga",
      "Soma Warigadean",
      "Soma Julungwangi",
      "Soma Langkir",
      "Soma Pahang",
      "Soma Medangkungan",
      "Soma Menail",
      "Soma Watugunung",
      "Anggara Ukir",
      "Anggara Sungsang",
      "Anggara Kuningan",
      "Anggara Krulut",
      "Anggara Tambir",
      "Buda Kulantir",
      "Buda Dunggulan",
      "Wraspati Ukir",
      "Wraspati Tolu",
      "Wraspati Sungsang",
      "Wraspati Kuningan",
      "Wraspati Krulut",
      "Wraspati Tambir",
      "Sukra Ukir",
      "Sukra Tolu",
      "Sukra Julungwangi",
      "Sukra Langkir",
      "Sukra Pahang",
      "Sukra Medangkungan",
      "Sukra Menail",
      "Sukra Watugunung",
      "Saniscara Ukir",
      "Saniscara Medangsia",
      "Saniscara Pujut",
      "Saniscara Dukut"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Timpang",
    "description": "Baik untuk membuat senjata, membuat/memasang ranjau, guna-guna, meramu sadek, memasang sesuatu yang merupakan larangan pada tanaman. Tidak baik untuk berburu.",
    "conditions": [
      "Anggara Sinta",
      "Sukra Medangsia",
      "Saniscara Landep"
    ],
    "tags": [
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Tukaran",
    "description": "Baik untuk memasang jaring/tepis, mapikat (mencari burung), mulai melatih atau mengajar burung.",
    "conditions": [
      "Anggara Ukir",
      "Anggara Warigadean"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Tumapel",
    "description": "Baik untuk membuat topeng (tapel), membuat dan memasang kungkungan (tempat mengurung lebah.",
    "conditions": [
      "Anggara Kuningan",
      "Buda Kuningan"
    ],
    "tags": []
  },
  {
    "name": "Kala Tumpar",
    "description": "Tidak baik untuk dewasa ayu karena mengandung unsur kecewa.",
    "conditions": [
      "Anggara Langkir",
      "Buda Warigadean"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Kala Upa",
    "description": "Baik untuk memulai mengambil/memelihara ternak (wewalungan).",
    "conditions": [
      "Pasah Paniron"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Kala Was",
    "description": "Baik untuk mengebiri (melesin) hewan, menebang kayu untuk bahan bangunan.",
    "conditions": [
      "Soma Krulut"
    ],
    "tags": []
  },
  {
    "name": "Kala Wikalpa",
    "description": "Baik untuk membuat keris dan yang sejenisnya.",
    "conditions": [
      "Soma Uye",
      "Soma Bala",
      "Sukra Wayang",
      "Sukra Watugunung"
    ],
    "tags": []
  },
  {
    "name": "Kala Wisesa",
    "description": "Baik untuk menebang kayu bahan bangunan, memulau suatu kegiatan, mengangkat/melantik petugas.",
    "conditions": [
      "Was Guru"
    ],
    "tags": []
  },
  {
    "name": "Kala Wong",
    "description": "Tidak baik untuk magundul (digundul), meotong rambut atau macukur (dicukur), meminang, melakukan upacara manusa yadnya.",
    "conditions": [
      "Buda Medangkungan"
    ],
    "tags": [
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Kaleburau",
    "description": "Tidak baik melakukan karya ayu atau yadnya. Tidak baik melaksanakan atiwa-tiwa/ngaben Redite Landep.",
    "conditions": [
      "Redite Ukir",
      "Redite Warigadean",
      "Redite Medangsia",
      "Redite Wayang",
      "Redite Watugunung",
      "Soma Tilem",
      "Soma Beteng",
      "Anggara Wariga",
      "Anggara Langkir",
      "Anggara Uye",
      "Anggara Bala",
      "Anggara Matal",
      "Buda Krulut",
      "Buda Dukut",
      "Buda Matal",
      "Wraspati Medangkungan",
      "Sukra Gumbreg",
      "Sukra Kulawu",
      "Saniscara Merakih",
      "Saniscara Ugu"
    ],
    "tags": [
      "Larangan Pitra Yadnya"
    ]
  },
  {
    "name": "Kamajaya",
    "description": "Baik untuk dewasa pernikahan, membangun, membuat alat-alat perang, mulai belajar/berlatih.",
    "conditions": [
      "Buda Penanggal 2",
      "Buda Penanggal 3",
      "Buda Penanggal 7"
    ],
    "tags": [
      "Manusa Yadnya",
      "Bangunan"
    ]
  },
  {
    "name": "Karna Sula",
    "description": "Tidak baik untuk melangsungkan perkawinan, mengambil/menangkap/membeli binatang peliharaan, mengadakan pertemuan/rapat, berbicara kepada orang lain.",
    "conditions": [
      "Redite Penanggal 2",
      "Redite Pangelong 2",
      "Anggara Penanggal 9",
      "Anggara Pangelong 9",
      "Saniscara Purnama",
      "Saniscara Tilem"
    ],
    "tags": [
      "Larangan Manusa Yadnya",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Karnasula",
    "description": "Baik untuk membuat kentongan, bajra, kendang, kroncongan (denta sapi dari kayu) dan sejenisnya. Tidak baik untuk membangun rumah tempat tidur, mengadakan rapat atau pertemuan.",
    "conditions": [
      "Soma Sinta",
      "Soma Kulantir",
      "Soma Wariga",
      "Soma Julungwangi",
      "Anggara Langkir",
      "Buda Dunggulan",
      "Wraspati Warigadean",
      "Wraspati Dunggulan",
      "Sukra Ukir",
      "Saniscara Tolu",
      "Saniscara Sungsang"
    ],
    "tags": [
      "Larangan Bangunan",
      "Larangan Peternakan & Hewan",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Lebur Awu",
    "description": "Tidak baik melakukan upacara wiwaha/pernikahan, pertemuan, membangun rumah, mengatapi rumah. Baik untuk membangun irigasi. Sukra SriÂ.",
    "conditions": [
      "Redite Indra",
      "Soma Uma",
      "Anggara Ludra",
      "Buda Brahma",
      "Wraspati Guru",
      "Saniscara Yama"
    ],
    "tags": [
      "Larangan Manusa Yadnya",
      "Larangan Bangunan",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Lutung Megandong",
    "description": "Baik untuk menanam buah-buahan dan umbi-umbian Wraspati Ukir.",
    "conditions": [
      "Wraspati Warigadean",
      "Wraspati Langkir",
      "Wraspati Merakih",
      "Wraspati Menail",
      "Wraspati Kulawu"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Macekan Agung",
    "description": "Untuk membuat benda-benda runcing untuk pura seperti pengawin, tumbak, senjata pengider-ider dll.",
    "conditions": [
      "Redite Penanggal 12",
      "Soma Penanggal 11",
      "Anggara Penanggal 10",
      "Buda Penanggal 9",
      "Wraspati Penanggal 8",
      "Sukra Penanggal 7",
      "Sukra Penanggal 5",
      "Saniscara Penanggal 6"
    ],
    "tags": [
      "Dewa Yadnya"
    ]
  },
  {
    "name": "Macekan Lanang",
    "description": "Baik untuk membuat taji, tumbak, keris, alat penangkap ikan. Tidak baik untuk upacara yadnya Redite Penanggal 2.",
    "conditions": [
      "Redite Penanggal 12",
      "Soma Penanggal 1",
      "Soma Penanggal 11",
      "Anggara Penanggal 9",
      "Anggara Penanggal 11",
      "Buda Penanggal 9",
      "Wraspati Penanggal 8",
      "Sukra Penanggal 5",
      "Sukra Penanggal 7",
      "Saniscara Penanggal 6"
    ],
    "tags": [
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Macekan Wadon",
    "description": "Baik untuk membuat taji, tumbak, keris, alat penangkap ikan Redite Pangelong 5.",
    "conditions": [
      "Soma Pangelong 11",
      "Anggara Pangelong 10",
      "Buda Pangelong 9",
      "Wraspati Pangelong 8",
      "Saniscara Pangelong 13"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Mreta Sula",
    "description": "Tidak baik untuk melakukan semua macam yadnya Wraspati Penanggal 7.",
    "conditions": [
      "Wraspati Pangelong 7"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Naga Naut",
    "description": "Tidak baik untuk dewasa ayu Penanggal = Sasih. Pangelong = Sasih.",
    "conditions": [],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Pamacekan",
    "description": "Baik untuk mengerjakan sawah/tegal, membuat tombak penangkap ikan. Tidak baik melaksanakan yadnya Redite Penanggal 12.",
    "conditions": [
      "Redite Purnama",
      "Redite Tilem",
      "Soma Penanggal 11",
      "Soma Purnama",
      "Soma Tilem",
      "Anggara Penanggal 10",
      "Anggara Pangelong 10",
      "Redite Pangelong 12",
      "Soma Pangelong 11",
      "Anggara Purnama",
      "Anggara Tilem",
      "Buda Penanggal 9",
      "Buda Pangelong 9",
      "Buda Purnama",
      "Buda Tilem",
      "Wraspati Penanggal 8",
      "Wraspati Pangelong 8",
      "Wraspati Purnama",
      "Wraspati Tilem",
      "Sukra Penanggal 7",
      "Sukra Pangelong 7",
      "Sukra Purnama",
      "Sukra Tilem",
      "Saniscara Penanggal 6",
      "Saniscara Pangelong 6",
      "Saniscara Purnama",
      "Saniscara Tilem"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Panca Amerta",
    "description": "Baik untuk pernikahan, melaukan upacara pembersihan diri.",
    "conditions": [
      "Buda Paing Penanggal 5"
    ],
    "tags": [
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Panca Prawani",
    "description": "Tidak baik dipakai dewasa ayu.",
    "conditions": [
      "Penanggal 4",
      "Penanggal 8",
      "Penanggal 14",
      "Pangelong 4",
      "Pangelong 8",
      "Pangelong 14"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Panca Werdi",
    "description": "Baik untuk upacara potong gigi, potong rambut.",
    "conditions": [
      "Soma Paing Penanggal 5"
    ],
    "tags": [
      "Manusa Yadnya"
    ]
  },
  {
    "name": "Pati Paten",
    "description": "Tidak baik untuk melakukan segala yadnya/kerja.",
    "conditions": [
      "Sukra Penanggal 10",
      "Sukra Pangelong 10",
      "Sukra Tilem"
    ],
    "tags": [
      "Larangan Dewa Yadnya",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Patra Limutan",
    "description": "Baik untuk memasang guna-guna.",
    "conditions": [
      "Kajeng Tilem"
    ],
    "tags": []
  },
  {
    "name": "Pepedan",
    "description": "Baik untuk membuka lahan pertanian baru. Tidak baik untuk membuat peralatan dari besi.",
    "conditions": [
      "Redite Tolu",
      "Redite Julungwangi",
      "Redite Sungsang",
      "Redite Dunggulan",
      "Redite Pujut",
      "Redite Medangkungan",
      "Redite Matal",
      "Redite Menail",
      "Redite Bala",
      "Redite Ugu",
      "Redite Wayang",
      "Redite Kulawu",
      "Redite Watugunung",
      "Redite Uye",
      "Soma Warigadean",
      "Soma Medangsia",
      "Soma Krulut",
      "Soma Merakih",
      "Soma Matal",
      "Soma Uye",
      "Soma Prangbakat",
      "Soma Bala",
      "Soma Ugu",
      "Soma Wayang",
      "Soma Dukut",
      "Anggara Sinta",
      "Anggara Ukir",
      "Anggara Tolu",
      "Anggara Wariga",
      "Anggara Sungsang",
      "Anggara Dunggulan",
      "Anggara Langkir",
      "Anggara Medangsia",
      "Anggara Krulut",
      "Anggara Merakih",
      "Anggara Tambir",
      "Anggara Medangkungan",
      "Anggara Uye",
      "Anggara Menail",
      "Anggara Prangbakat",
      "Anggara Bala",
      "Anggara Ugu",
      "Anggara Wayang",
      "Anggara Dukut",
      "Anggara Watugunung",
      "Buda Kulantir",
      "Buda Tolu",
      "Buda Gumbreg",
      "Buda Wariga",
      "Buda Warigadean",
      "Buda Julungwangi",
      "Buda Dunggulan",
      "Buda Kuningan",
      "Buda Pujut",
      "Buda Pahang",
      "Buda Merakih",
      "Buda Menail",
      "Buda Prangbakat",
      "Buda Wayang",
      "Buda Kulawu",
      "Buda Watugunung",
      "Wraspati Sinta",
      "Wraspati Ukir",
      "Wraspati Kulantir",
      "Wraspati Wariga",
      "Wraspati Warigadean",
      "Wraspati Julungwangi",
      "Wraspati Dunggulan",
      "Wraspati Medangsia",
      "Wraspati Tambir",
      "Wraspati Matal",
      "Wraspati Menail",
      "Wraspati Prangbakat",
      "Wraspati Dukut",
      "Sukra Landep",
      "Sukra Kulantir",
      "Sukra Medangsia",
      "Sukra Pahang",
      "Sukra Tambir",
      "Sukra Medangkungan",
      "Sukra Matal",
      "Sukra Menail",
      "Sukra Prangbakat",
      "Sukra Bala",
      "Sukra Wayang",
      "Sukra Dukut",
      "Saniscara Landep",
      "Saniscara Ukir",
      "Saniscara Wariga",
      "Saniscara Julungwangi",
      "Saniscara Sungsang",
      "Saniscara Dunggulan",
      "Saniscara Langkir",
      "Saniscara Menail",
      "Saniscara Prangbakat",
      "Saniscara Bala",
      "Saniscara Wayang",
      "Saniscara Dukut",
      "Saniscara Watugunung"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Prabu Pendah",
    "description": "Tidak baik melakukan upacara pelantikan.",
    "conditions": [
      "Sukra Penanggal 14"
    ],
    "tags": [
      "Larangan Peternakan & Hewan",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Prangewa",
    "description": "Tidak baik mengadakan pertemuan karena mengandung unsur keributan.",
    "conditions": [
      "Anggara Penanggal 1"
    ],
    "tags": [
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Purnama Danta",
    "description": "Baik untuk dewasa ayu.",
    "conditions": [
      "Buda Keliwon Purnama"
    ],
    "tags": []
  },
  {
    "name": "Purnasuka",
    "description": "Baik untuk mulai membangun karya ayu, juga baik untuk perkawinan tanpa memperhitungkan sasih.",
    "conditions": [
      "Sukra Umanis Purnama"
    ],
    "tags": [
      "Manusa Yadnya",
      "Bangunan"
    ]
  },
  {
    "name": "Purwani",
    "description": "Tidak baik dipakai dewasa.",
    "conditions": [
      "Penanggal 14",
      "Pangelong 14"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Purwanin Dina",
    "description": "Tidak baik sebagai dewasa ayu Soma Wage.",
    "conditions": [
      "Anggara Keliwon",
      "Buda Keliwon",
      "Sukra Wage",
      "Saniscara Keliwon"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Rangda Tiga",
    "description": "Tidak baik melakukan upacara pawiwahan.",
    "conditions": [
      "Wariga",
      "Warigadean",
      "Pujut",
      "Pahang",
      "Menail",
      "Prangbakat"
    ],
    "tags": [
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Rarung Pagelangan",
    "description": "Tidak baik melakukan pitra yadnya dan manusa yadnya Wraspati Penanggal 6.",
    "conditions": [
      "Wraspati Pangelong 6"
    ],
    "tags": [
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Ratu Magelung",
    "description": "Baik untuk menanam kelapa.",
    "conditions": [
      "Buda Menail"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Ratu Mangure",
    "description": "Baik untuk menanam yang buahnya berbatu.",
    "conditions": [
      "Wraspati Medangkungan"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Ratu Megambahan",
    "description": "Tidak baik untuk membuat peraturan-peraturan, membuat rencana, mengangkat petugas/pejabat.",
    "conditions": [
      "Saniscara Pangelong 6"
    ],
    "tags": [
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Ratu Nanyingal",
    "description": "Baik untuk mananam kepaya.",
    "conditions": [
      "Wraspati Matal"
    ],
    "tags": []
  },
  {
    "name": "Ratu Ngemban Putra",
    "description": "Baik untuk membangun, mengangkat sentana (meras), melantik petugas.",
    "conditions": [
      "Sukra Penanggal 5"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Rekatadala Ayudana",
    "description": "Baik untuk menanam tanaman yang beruas/berbuku, melakukan dana punia (beramal).",
    "conditions": [
      "Redite Penanggal 1",
      "Redite Pangelong 1",
      "Redite Penanggal 6",
      "Redite Pangelong 6",
      "Redite Penanggal 11",
      "Redite Pangelong 11"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Salah Wadi",
    "description": "Tidak baik untuk melakukan Manusa Yadnya (wiwaha, mapendes, potong rambut dll. ) Pitra Yadnya (Penguburan, atiwa-tiwa/ngaben, nyekah, ngasti dll.",
    "conditions": [
      "Sinta",
      "Landep",
      "Gumbreg",
      "Sungsang",
      "Dunggulan",
      "Pahang",
      "Tambir",
      "Medangkungan",
      "Prangbakat",
      "Bala",
      "Wayang",
      "Watugunung"
    ],
    "tags": [
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Sampar Wangke",
    "description": "Tidak baik untuk bersenggama, kalau dilanggar bisa melahirkan bayi yang penuh kesialan dan kemalangan.",
    "conditions": [
      "Soma Aryang"
    ],
    "tags": [
      "Larangan Manusa Yadnya"
    ]
  },
  {
    "name": "Sampi Gumarang Munggah",
    "description": "Tidak baik menanam padi dan jagung.",
    "conditions": [
      "Pon Paniron"
    ],
    "tags": [
      "Larangan Pertanian"
    ]
  },
  {
    "name": "Sampi Gumarang Turun",
    "description": "Baik untuk menanam padi, jagung, dan membangun rumah.",
    "conditions": [
      "Pon Tungleh"
    ],
    "tags": [
      "Pertanian",
      "Bangunan"
    ]
  },
  {
    "name": "Sarik Agung",
    "description": "Tidak baik untuk segala pekerjaan.",
    "conditions": [
      "Buda Kulantir",
      "Buda Dunggulan",
      "Buda Merakih",
      "Buda Bala"
    ],
    "tags": [
      "Larangan Dewa Yadnya",
      "Larangan Pitra Yadnya",
      "Larangan Manusa Yadnya",
      "Larangan Rsi Yadnya",
      "Larangan Bhuta Yadnya"
    ]
  },
  {
    "name": "Sarik Ketah",
    "description": "Baik untuk membuat tembok pagar.",
    "conditions": [
      "Saniscara Penanggal 4",
      "Saniscara Penanggal 5"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Sedana Tiba",
    "description": "Baik untuk melakukan Pitra Yadnya, Dewa Yadnya di Pamarajan/di Panti.",
    "conditions": [
      "Wraspati Wage Penanggal 7"
    ],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya"
    ]
  },
  {
    "name": "Sedana Yoga",
    "description": "Baik untuk membuat alat berdagang, tempat berdagang, mulai berjualan karena akan murah rejeki.",
    "conditions": [
      "Redite Penanggal 8",
      "Redite Pangelong 8",
      "Redite Purnama",
      "Redite Tilem",
      "Soma Penanggal 3",
      "Soma Pangelong 3",
      "Anggara Penanggal 7",
      "Anggara Pangelong 7",
      "Buda Penanggal 2",
      "Buda Pangelong 2",
      "Buda Penanggal 3",
      "Buda Pangelong 3",
      "Wraspati Penanggal 4",
      "Wraspati Pangelong 4",
      "Wraspati Penanggal 5",
      "Wraspati Pangelong 5",
      "Wraspati Purnama",
      "Wraspati Tilem",
      "Sukra Penanggal 1",
      "Sukra Pangelong 1",
      "Sukra Penanggal 6",
      "Sukra Pangelong 6",
      "Saniscara Penanggal 5",
      "Saniscara Pangelong 5",
      "Saniscara Purnama",
      "Saniscara Tilem"
    ],
    "tags": [
      "Usaha & Karir"
    ]
  },
  {
    "name": "Semut Sedulur",
    "description": "Baik untuk gotong royang, kerja bakti, memulai kampanye, membentuk perkumpulan. Tidak baik mengubur atau membakar mayat.",
    "conditions": [
      "Sukra Pon",
      "Saniscara Wage",
      "Redite Keliwon"
    ],
    "tags": [
      "Larangan Pitra Yadnya"
    ]
  },
  {
    "name": "Siwa Sampurna",
    "description": "Baik untuk segala jenis upacara, mulai belajar/berlatih, membangun segala macam bangungan.",
    "conditions": [
      "Wraspati Penanggal 4",
      "Wraspati Penanggal 5",
      "Wraspati Penanggal 10"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Sri Bagia",
    "description": "Baik untuk memulai membina persahabatan.",
    "conditions": [
      "Soma Gumbreg",
      "Soma Pujut",
      "Soma Matal",
      "Buda Kulantir",
      "Saniscara Sinta",
      "Saniscara Bala"
    ],
    "tags": [
      "Bangunan"
    ]
  },
  {
    "name": "Sri Murti",
    "description": "Baik untuk mempersembahkan yadnya kepada Dewi Sri di lumbung.",
    "conditions": [
      "Was Sri"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Sri Tumpuk",
    "description": "Baik untuk memcari burung (mepikat).",
    "conditions": [
      "Sri Sri"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Srigati",
    "description": "Baik untuk menyimpan padi di lumbung dan menurunkan padi dari lumbung Kajeng Umanis Urukung.",
    "conditions": [
      "Kajeng Umanis Maulu"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Srigati Jenek",
    "description": "Baik untuk membibit/menanam padi, menyimpan padi dilumbung, serta pelaksanaan upacaranya.",
    "conditions": [
      "Keliwon Maulu"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Srigati Munggah",
    "description": "Baik untuk membibit/menanam padi, membuat alat-alat berjualan, membuat pahat, menyimpan padi atau upacara padi li lumbung. Tidak baik meminjam sesuatu, menjual beli beras.",
    "conditions": [
      "Umanis Urukung"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Usaha & Karir"
    ]
  },
  {
    "name": "Srigati Turun",
    "description": "Baik untuk membibit/menanam padi, menyimpan padi, mengaturkan yadnya di lumbung, menanam kelapa, mulai membuat barang dagangan.",
    "conditions": [
      "Umanis Maulu"
    ],
    "tags": [
      "Pertanian"
    ]
  },
  {
    "name": "Subacara",
    "description": "Baik untuk melangsungkan segala jenis upacara, membuat program (rencana), membuat peraturan, mengangkat. menunjuk petugas, mulai berlatih/belajar.",
    "conditions": [
      "Redite Penanggal 3",
      "Redite Purnama",
      "Soma Penanggal 3",
      "Anggara Penanggal 2",
      "Anggara Penanggal 7",
      "Anggara Penanggal 8",
      "Buda Penanggal 2",
      "Buda Penanggal 3",
      "Buda Penanggal 6",
      "Wraspati Penanggal 5",
      "Wraspati Penanggal 6",
      "Sukra Penanggal 1",
      "Sukra Penanggal 2",
      "Sukra Penanggal 3",
      "Saniscara Penanggal 4",
      "Saniscara Penanggal 5"
    ],
    "tags": [
      "Usaha & Karir"
    ]
  },
  {
    "name": "Swarga Menge Hari",
    "description": "baik untuk upacara Pitra Yadnya memuja bhatara-bhatari kawitan Anggara Pon Ukir Penanggal 11.",
    "conditions": [
      "Wraspati Paing Kulantir"
    ],
    "tags": [
      "Pitra Yadnya"
    ]
  },
  {
    "name": "Taliwangke",
    "description": "Baik untuk memasang tali penghambat di sawah atau di kebun, memperbaiki pagar, membuat tali pengikat padi/benda-benda mati. Tidak baik untuk mulai mengerjakan benang tenun, membuat tali ternak.",
    "conditions": [
      "Soma Uye",
      "Soma Menail",
      "Soma Prangbakat",
      "Soma Bala",
      "Soma Ugu",
      "Anggara Sinta",
      "Anggara Wayang",
      "Anggara Kulawu",
      "Anggara Dukut",
      "Anggara Watugunung",
      "Buda Landep",
      "Buda Ukir",
      "Buda Kulantir",
      "Buda Gumbreg",
      "Wraspati Wariga",
      "Wraspati Warigadean",
      "Wraspati Julungwangi",
      "Wraspati Sungsang",
      "Wraspati Dunggulan",
      "Wraspati Krulut",
      "Wraspati Merakih",
      "Wraspati Medangkungan",
      "Wraspati Matal",
      "Sukra Kuningan",
      "Sukra Langkir",
      "Sukra Medangsia",
      "Sukra Pujut",
      "Sukra Pahang"
    ],
    "tags": [
      "Larangan Pertanian",
      "Larangan Bangunan",
      "Larangan Peternakan & Hewan"
    ]
  },
  {
    "name": "Titibuwuk",
    "description": "Baik untuk menghilangkan penyakit karena guna-guna dan sejenisnya. Tidak baik untuk memulai suatu pekerjaan penting bepergian, membuat tangga/banggul.",
    "conditions": [
      "Redite Merakih",
      "Redite Ugu",
      "Redite Wayang",
      "Redite Kulawu",
      "Redite Watugunung",
      "Soma Warigadean",
      "Soma Julungwangi",
      "Soma Medangkungan",
      "Anggara Sinta",
      "Anggara Wariga",
      "Anggara Matal",
      "Buda Landep",
      "Buda Kulantir",
      "Buda Tolu",
      "Buda Sungsang",
      "Buda Pujut",
      "Buda Tambir",
      "Buda Bala",
      "Wraspati Gumbreg",
      "Wraspati Langkir",
      "Wraspati Krulut",
      "Wraspati Uye",
      "Wraspati Prangbakat",
      "Sukra Ukir",
      "Sukra Kuningan",
      "Saniscara Pahang",
      "Saniscara Matal",
      "Saniscara Menail",
      "Saniscara Dukut"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Tunut Masih",
    "description": "Baik untuk melas rare (bayi menetek), mulai mengajar/melatih ternak bekerja, membentuk perkumpulan (organisasi), memulai membuka sekolah atau perguruan, baik untuk nelusuk (mencocok hidung sapi atau kerbau) diisi tali pengikat.",
    "conditions": [
      "Redite Merakih",
      "Soma Julungwangi",
      "Soma Kuningan",
      "Soma Langkir",
      "Soma Wayang",
      "Anggara Krulut",
      "Anggara Prangbakat",
      "Wraspati Sinta",
      "Sukra Tambir",
      "Sukra Uye"
    ],
    "tags": [
      "Manusa Yadnya",
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Tutur Mandi",
    "description": "Baik untuk melakukan hal yang bersifat gaib (kedyatmikan), memberikan petuah/nasehat.",
    "conditions": [
      "Redite Ugu",
      "Wraspati Ukir",
      "Wraspati Julungwangi",
      "Wraspati Pujut",
      "Wraspati Medangkungan",
      "Wraspati Matal",
      "Wraspati Prangbakat",
      "Sukra Landep",
      "Saniscara Uye"
    ],
    "tags": [
      "Peternakan & Hewan"
    ]
  },
  {
    "name": "Uncal Balung",
    "description": "Tidak baik melakukan semua jenis perkerjaan yang dianggap penting.",
    "conditions": [
      "Kuningan",
      "Langkir",
      "Medangsia",
      "Pujut",
      "Redite Paing Pahang",
      "Soma Pon Pahang",
      "Anggara Wage Pahang",
      "Buda Keliwon Pahang",
      "Dunggulan"
    ],
    "tags": [
      "Larangan Umum"
    ]
  },
  {
    "name": "Upadana Amerta",
    "description": "Baik untuk menanam suatu tanaman, membuat alat-alat berdagang atau mulai berjualan.",
    "conditions": [
      "Redite Penanggal 1",
      "Redite Penanggal 6",
      "Redite Penanggal 8",
      "Redite Penanggal 10"
    ],
    "tags": [
      "Pertanian",
      "Usaha & Karir"
    ]
  },
  {
    "name": "Werdi Suka",
    "description": "Baik untuk upacara Dewa Yadnya.",
    "conditions": [
      "Buda Wage Penanggal 10"
    ],
    "tags": [
      "Dewa Yadnya"
    ]
  },
  {
    "name": "Wisesa",
    "description": "Baik untuk upacara mabersih/dwijati, mapeningan, mabiseka ratu Buda Paing Penanggal 13.",
    "conditions": [],
    "tags": [
      "Rsi Yadnya"
    ]
  },
  {
    "name": "Wredhi Guna",
    "description": "Baik untuk melakukan segala upacara (panca yadnya) karena akan memperoleh manfaat yang berlimpah Buda Wage Penanggal 5 Kasa.",
    "conditions": [],
    "tags": [
      "Dewa Yadnya",
      "Pitra Yadnya",
      "Manusa Yadnya",
      "Rsi Yadnya",
      "Bhuta Yadnya"
    ]
  }
];

export async function loadDewasaAyuData() {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const res = await fetch(`${API_URL}/master/dewasa-ayu`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Clear hardcoded fallback data
        alaAyuningData.length = 0;
        
        // Push fetched data
        data.forEach((item: any) => {
          alaAyuningData.push({
            name: item.nama,
            description: item.deskripsi,
            conditions: typeof item.conditions === 'string' ? JSON.parse(item.conditions) : item.conditions,
            tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags
          });
        });
        console.log(`[KalenderBali] Loaded ${alaAyuningData.length} Dewasa Ayu rules from API`);
      }
    }
  } catch (err) {
    console.warn('[KalenderBali] Failed to fetch Dewasa Ayu, using fallback data', err);
  }
}
