// const weddingDate = new Date('June 3, 2025 17:00:00').getTime();  
const weddingDate = new Date('August 7, 2025 07:00:00').getTime();
let currentLang = 'uz'; // default til

const translations = {
  uz: {
    brideGroom: "Behruzbek <span class='name'>va</span> Diyoraxon",
    text1: "Sizni hayotimizning eng go‘zal va baxtli onlarida biz bilan bo‘lishishingiz istagida nikoh shodiyonamizga taklif etamiz!",
    text2: "Go‘zal kechamizda sizni ko‘rishdan mamnun bo‘lamiz!",
    timeText: "SOAT 18:00",
    addressLabel: "Manzil:",
    landmarkLabel: "Mo‘ljal:",
    mapBtn: "Manzilni ko'rish",
    started: "To‘y boshlandi!",
    units: ["", "", "", ""],
    address: "«Florensia» to‘yxonasi",
    landmark: "«Chorsu»",
    dateText: "09 / 08 / 2025",
    languageLabel: "Til:",

  },
  tr: {
    brideGroom: "Behruzbek <span class='name'>ve</span> Diyoraxon",
    text1: "Hayatımızın en güzel ve mutlu anlarında bizimle olmanız için düğünümüze davet ediyoruz!",
    text2: "Bu güzel gecede sizi görmekten memnuniyet duyarız!",
    timeText: "SAAT 18:00",
    addressLabel: "Adres:",
    landmarkLabel: "Tarif:",
    mapBtn: "Haritayı Aç",
    started: "Düğün başladı!",
    units: ["gün", "saat", "dakika", "saniye"],
    address: "«Florensia» düğün salonu",
    landmark: "«Chorsu» kavşağı",
    dateText: "09 / 08 / 2025",
    languageLabel: "Dil:",

  },
  ar: {
    brideGroom: "بهروزبك <span class='name'>و</span> ديوراخون",
    text1: "ندعوكم لحضور حفل زفافنا ومشاركتنا أجمل لحظات حياتنا!",
    text2: "يسعدنا رؤيتكم في ليلتنا الجميلة!",
    timeText: "الساعة 18:00",
    addressLabel: "العنوان:",
    landmarkLabel: "علامة مميزة:",
    mapBtn: "عرض الموقع",
    started: "بدأ الزفاف!",
    units: ["يوم", "ساعة", "دقيقة", "ثانية"],
    address: "قاعة أفراح «Florensia»",
    landmark: "تقاطع «Chorsu»",
    dateText: "٠٩‏/٠٨‏/٢٠٢٥",
    languageLabel: "اللغة:",

  }
};



function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  const t = translations[currentLang];

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Arab raqamlariga o'zgartirish faqat arab tilida
  function toArabicNumerals(num) {
    if (currentLang === 'ar') {
      const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    } else {
      return num; // boshqa tillarda odatdagi raqamlar
    }
  }

  if (distance < 0) {
    clearInterval(interval);
    document.querySelector('.countdown').innerHTML = t.started;
  } else {
    document.getElementById('days').innerHTML = `${toArabicNumerals(days)} <span>${t.units[0]}</span>`;
    document.getElementById('hours').innerHTML = `${toArabicNumerals(hours)} <span>${t.units[1]}</span>`;
    document.getElementById('minutes').innerHTML = `${toArabicNumerals(minutes)} <span>${t.units[2]}</span>`;
    document.getElementById('seconds').innerHTML = `${toArabicNumerals(seconds)} <span>${t.units[3]}</span>`;
  }
}


const interval = setInterval(updateCountdown, 1000);

// const audioPlayer = document.getElementById('audioPlayer');
// const playPauseBtn = document.getElementById('playPauseBtn');

// DOM tayyor bo‘lganda
window.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');

  // 1️⃣ Faqat birinchi marta ekranga bosilganda musiqa qo‘yiladi
  const startMusicOnce = () => {
    audioPlayer.play().then(() => {
      playPauseBtn.textContent = '⏸ Pause';
    }).catch(() => {
      // Foydalanuvchi audio autoplay'ni rad etgan bo‘lsa
      playPauseBtn.textContent = '▶ Play';
    });

    // Bu hodisa faqat 1 marta ishlaydi
    window.removeEventListener('click', startMusicOnce);
    window.removeEventListener('touchstart', startMusicOnce);
  };

  // 💡 Har qanday ekranga bosish — faqat bir marta
  window.addEventListener('click', startMusicOnce, { once: true });
  window.addEventListener('touchstart', startMusicOnce, { once: true });

  // 2️⃣ Play/Pause tugmasi
  playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.textContent = '⏸ Pause';
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = '▶ Play';
    }
  });
});




const selectedFlag = document.getElementById('selected-flag');
const flagOptions = document.getElementById('flag-options');
const languageSelector = document.querySelector('.language-selector');
const flagItems = document.querySelectorAll('.flag-item');

selectedFlag.addEventListener('click', () => {
  languageSelector.classList.toggle('active'); // Ochish/yopish
});

function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.getElementById('text1').textContent = t.text1;
  document.getElementById('text2').textContent = t.text2;
  document.getElementById('timeText').textContent = t.timeText;
  document.getElementById('addressLabel').textContent = t.addressLabel;
  document.getElementById('landmarkLabel').textContent = t.landmarkLabel;
  document.getElementById('addressText').textContent = t.address;
  document.getElementById('landmarkText').textContent = t.landmark;
  document.getElementById('mapBtn').textContent = t.mapBtn;
  document.getElementById('brideGroomNames').innerHTML = t.brideGroom;
  document.getElementById('dateText').textContent = t.dateText;
  document.getElementById('languageLabel').textContent = t.languageLabel;


  updateCountdown();
  updateSelectedFlag(lang);
  languageSelector.classList.remove('active');
}



function updateSelectedFlag(lang) {
  let flagSrc = '';

  switch (lang) {
    case 'uz':
      flagSrc = 'imgs/uzbekistan.png';
      break;
    case 'tr':
      flagSrc = 'imgs/turkey.png';
      break;
    case 'ar':
      flagSrc = 'imgs/arabic.png';
      break;
  }

  selectedFlag.innerHTML = `<img src="${flagSrc}" alt="${lang}" />`;
}


