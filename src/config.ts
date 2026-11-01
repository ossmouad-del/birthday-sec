// عدّل هذه المعلومات قبل نشر الموقع.
export const CONFIG = {
  recipient: 'إلى شخص استثنائي',
  sender: 'من شخص كيبغيك',
  birthdayTitle: 'عيد ميلاد سعيد',
  message: 'نتمنى ليك عام جديد عامر بالضحكة، الحب، النجاح، واللحظات اللي تستاهليها. خلي أحلامك تكبر، وخلي قلبك ديما منوّر.',
  memories: [
    { title: 'ذكرى أولى', caption: 'هنا نقدروا نحطّو صورة وذكرى زوينة.' },
    { title: 'لحظة ما كتنساش', caption: 'بدّل هاد النص بصورة أو موقف خاص بيناتكم.' },
    { title: 'والأجمل مازال جاي', caption: 'كل عام كيزيد فصل جديد فالحكاية.' },
  ],
  photos: ['', '', ''],
} as const

export const PUZZLES = [
  {
    label: 'THE FIRST KEY',
    title: 'أول مفتاح',
    prompt: 'حلّي المعادلة باش تفتحي أول باب.',
    expression: '9 × 7 − 13',
    answer: '50',
    hint: 'الضرب قبل الطرح.'
  },
  {
    label: 'THE PATTERN',
    title: 'شفرة الأرقام',
    prompt: 'شنو هو الرقم اللي خاصو يجي من بعد؟',
    expression: '2  ·  6  ·  12  ·  20  ·  ?',
    answer: '30',
    hint: 'الفروق بين الأرقام هي 4، 6، 8…'
  },
  {
    label: 'THE FINAL CODE',
    title: 'الشفرة الأخيرة',
    prompt: 'لقاي قيمة X.',
    expression: '3X + 9 = 39',
    answer: '10',
    hint: 'طرحي 9 من الجهتين، ومن بعد قسمي على 3.'
  },
] as const