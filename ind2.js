function hisobla(foiz) {
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

  return natija;
}
