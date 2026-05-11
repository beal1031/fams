/* global React */
// Real events for the FMS site. Photos are loaded from Unsplash via stable URLs.

const FMS_EVENTS = [
  {
    id: "advent",
    date: "2025-11-30",
    photo: "https://images.unsplash.com/photo-1606293459339-aa5d34a7b0e1?auto=format&fit=crop&w=900&q=70",
    photoAlt: "Advent market stand with handmade goods",
    canRegister: false,
    lb: { eyebrow: "1. Adventssonndeg · Stand", title: "Adventsmaart am Centre Culturel", where: "Centre Culturel Munsbach", when: "14:00 – 18:00", note: "Mat de Jongbléiser, Kaffi a Kuchen, Tombola an Adventskränz." },
    de: { eyebrow: "1. Adventssonntag · Stand", title: "Adventsmarkt im Centre Culturel", where: "Centre Culturel Munsbach", when: "14:00 – 18:00", note: "Mit den Jongbléiser, Kaffee und Kuchen, Tombola und Adventskränzen." },
    fr: { eyebrow: "1er dimanche de l'Avent · Stand", title: "Marché de l'Avent au Centre Culturel", where: "Centre Culturel Munsbach", when: "14h – 18h", note: "Avec les Jongbléiser, café-gâteaux, tombola et couronnes de l'Avent." },
    en: { eyebrow: "1st Advent Sunday · Stand", title: "Advent market at the Centre Culturel", where: "Centre Culturel Munsbach", when: "2 – 6 pm", note: "With the Jongbléiser, coffee & cake, tombola and Advent wreaths." },
  },
  {
    id: "trier",
    date: "2025-12-13",
    photo: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=900&q=70",
    photoAlt: "Christmas market lights at night",
    canRegister: true,
    lb: { eyebrow: "Bus-Ausfluch · max. 35 Plazen", title: "Chreschtmaart Trier — Daag-Ausfluch", where: "Treffpunkt: Centre Culturel · Bus", when: "08:30 – 19:00", note: "1 Daag mam Bus op e Chreschtmaart an der Géigend (max. 3h Fahrt)." },
    de: { eyebrow: "Bus-Tour · max. 35 Plätze", title: "Weihnachtsmarkt Trier — Tagestour", where: "Treffpunkt: Centre Culturel · Bus", when: "08:30 – 19:00", note: "Eintägige Bustour zu einem Weihnachtsmarkt in der Region (max. 3 Std. Fahrt)." },
    fr: { eyebrow: "Sortie en bus · 35 places", title: "Marché de Noël à Trèves — journée", where: "RDV : Centre Culturel · bus", when: "08h30 – 19h00", note: "Sortie d'une journée en bus vers un marché de Noël de la région (max. 3 h de route)." },
    en: { eyebrow: "Bus trip · 35 seats", title: "Christmas market in Trier — day trip", where: "Meet: Centre Culturel · coach", when: "8:30 am – 7 pm", note: "One-day coach trip to a regional Christmas market (3 h max drive)." },
  },
  {
    id: "easter",
    date: "2026-03-29",
    photo: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=900&q=70",
    photoAlt: "Spring flowers in pots",
    canRegister: false,
    lb: { eyebrow: "Stand · Blummenkoupen", title: "Ouschtermaart — Schëtter", where: "Schëtter", when: "Sonndeg moies", note: "Mat Verkaaf vu Blummenkoupe fir de Friedhof (Ouschteren)." },
    de: { eyebrow: "Stand · Grabblumen", title: "Ostermarkt — Schuttrange", where: "Schuttrange", when: "Sonntagvormittag", note: "Mit Verkauf von Grabblumen für Ostern." },
    fr: { eyebrow: "Stand · bouquets de tombe", title: "Marché de Pâques — Schuttrange", where: "Schuttrange", when: "Dimanche matin", note: "Avec vente de bouquets de tombe pour Pâques." },
    en: { eyebrow: "Stand · grave flowers", title: "Easter market — Schuttrange", where: "Schuttrange", when: "Sunday morning", note: "With grave-side flower sales for Easter." },
  },
  {
    id: "maerchen",
    date: "2026-05-23",
    photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=70",
    photoAlt: "Pizza on a wooden board",
    canRegister: true,
    lb: { eyebrow: "All 2 Joer · Umellung", title: "Märchentour mat Owend-Pizza", where: "Treffpunkt bei a Schmatten", when: "18:00 – 22:00", note: "All 2 Joer. Plazen sinn limitéiert — bitte umellen." },
    de: { eyebrow: "Alle 2 Jahre · Anmeldung", title: "Märchentour mit Abend-Pizza", where: "Treffpunkt bei a Schmatten", when: "18:00 – 22:00", note: "Alle 2 Jahre. Begrenzte Plätze — Anmeldung erforderlich." },
    fr: { eyebrow: "Tous les 2 ans · inscription", title: "Märchentour avec pizza en soirée", where: "RDV chez Schmatten", when: "18h – 22h", note: "Tous les 2 ans. Places limitées — inscription requise." },
    en: { eyebrow: "Biennial · registration", title: "Märchentour with evening pizza", where: "Meet at Schmatten", when: "6 – 10 pm", note: "Every 2 years. Limited places — please register." },
  },
  {
    id: "allerheiligen",
    date: "2026-10-25",
    photo: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=70",
    photoAlt: "Autumn flowers in soft light",
    canRegister: false,
    lb: { eyebrow: "Verkaaf · Blummenkoupen", title: "Allerhellgen — Blummenkoupen", where: "Schëtter", when: "Enn Oktober", note: "Verkaaf vu Blummenkoupe fir de Friedhof zu Allerhellgen." },
    de: { eyebrow: "Verkauf · Grabblumen", title: "Allerheiligen — Grabblumen", where: "Schuttrange", when: "Ende Oktober", note: "Verkauf von Grabblumen für Allerheiligen." },
    fr: { eyebrow: "Vente · bouquets de tombe", title: "Toussaint — bouquets de tombe", where: "Schuttrange", when: "Fin octobre", note: "Vente de bouquets de tombe pour la Toussaint." },
    en: { eyebrow: "Sale · grave flowers", title: "All Saints' — grave flowers", where: "Schuttrange", when: "Late October", note: "Grave-side flower sales for All Saints' Day." },
  },
];

window.FMS_EVENTS = FMS_EVENTS;
