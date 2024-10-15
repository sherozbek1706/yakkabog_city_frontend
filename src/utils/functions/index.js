export const formatmoney = (money) => {
  const formattedNumber = money.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return formattedNumber;
};

export const formatDate = (time, sana = false) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());

  if (sana == true) {
    return `${year}-${month}-${day}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

const addLeadingZero = (number) => {
  return number < 10 ? "0" + number : number;
};

export const metr_kvadrat_chegirma = (foiz) => {
  const birinchi20 = 200000; // 20% qiymati
  const keyingi10 = 200000; // 10% qiymati
  const uchinchi20 = 200000; // Yana bir 20% qiymati
  const tortinchi50 = 600000; // 50% qiymati

  let natija = 0;

  if (foiz <= 20) {
    natija = (foiz / 20) * birinchi20;
  } else if (foiz <= 30) {
    // 20% ni to'liq olamiz va qolgan qismi keyingi 10% dan hisoblaymiz
    natija = birinchi20 + ((foiz - 20) / 10) * keyingi10;
  } else if (foiz <= 50) {
    // 30% ni to'liq olamiz va qolgan qismi yana 20% dan hisoblaymiz
    natija = birinchi20 + keyingi10 + ((foiz - 30) / 20) * uchinchi20;
  } else if (foiz <= 100) {
    // 50% ni to'liq olamiz va qolgan qismi 50% dan hisoblaymiz
    natija =
      birinchi20 + keyingi10 + uchinchi20 + ((foiz - 50) / 50) * tortinchi50;
  }

  return Math.round(natija);
  // return natija;
};

export const ipotekaSummaMinus = (summ) => {
  let ipoteka = 330000000;
  if (summ >= ipoteka) {
    return { qolgan_summa: summ - ipoteka, ipoteka };
  } else {
    return { qolgan_summa: 0, ipoteka: Math.abs(summ) };
  }
};
