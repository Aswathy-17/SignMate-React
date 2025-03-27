import { videoMaps } from "./videoMaps";

export const getVideosFromInput = (input, language) => {
  if (!input || typeof input !== "string") {
    console.error("Invalid input:", input);
    return { videoList: [], displayText: "" };
  }

  const videoMap = videoMaps[language];
  const words = input.toLowerCase().trim().split(/\s+/);
  const videoList = [];
  let displayText = "";

  // Check for phrases first
  const phrases = Object.keys(videoMap).filter((key) => key.includes(" "));

  let i = 0;
  while (i < words.length) {
    let phraseFound = false;

    // Check for multi-word phrases
    for (let j = phrases.length - 1; j >= 0; j--) {
      const phrase = phrases[j];
      const phraseWords = phrase.split(" ");
      const candidate = words.slice(i, i + phraseWords.length).join(" ");

      if (candidate === phrase) {
        videoList.push(videoMap[phrase]);
        displayText += phrase + " ";
        i += phraseWords.length;
        phraseFound = true;
        break;
      }
    }

    if (!phraseFound) {
      // Handle single words or letters
      const word = words[i];
      if (videoMap[word]) {
        videoList.push(videoMap[word]);
        displayText += word + " ";
      } else {
        const letters = word.split("");
        letters.forEach((letter) => {
          if (videoMap[letter]) {
            videoList.push(videoMap[letter]);
          }
        });
      }
      i++;
    }
  }

  console.log("Final video list:", videoList);
  console.log("Final display text:", displayText);

  return { videoList, displayText: displayText.trim() };
};