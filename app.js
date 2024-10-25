const simpleGit = require("simple-git");
const simpleGits = require("./package-lock.json");

const git = simpleGit();

const commitChanges = async () => {
  try {
    const commitMessage = "Asosiy kodlar olindi";
    await git.commit(commitMessage, null, {
      "--date": "2024-10-24T14:56:00",
    });

    console.log("O`zgarishlar muvaffaqiyatli commit qilindi!");
  } catch (error) {
    console.error("Xato:", error);
  }
};

commitChanges();
