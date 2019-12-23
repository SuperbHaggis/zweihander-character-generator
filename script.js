//Import
import {profArr, trappingsArr, buildArr, alignments, markArr, 
  complexionArr, seasonArr, ancestryArr, doomingArr,
  hairColors, eyeColors} from "./lists.js";

//Global Variables
let d100, d10;
let sum;
let hairIndex, eyeIndex;
let archetype;
let firstMark, secondMark, thirdMark;
let attSwapped = false;
let attReplaced = false;

let dooming, age, profession, upbringing, socialClass,
    complexion, hairColor, eyeColor, build, birthSeason,
    trappings, drawback, ancestry, ancestralTrait;

let marks = {
  1: '',
  2: '',
  3: '',
};
let alignment = {
  order: '',
  chaos: '',
};

let primaryAttributes = [];
let primaryBonuses = [];

ancestry = 'Human';

//DOM Elements
let nonhumanCheck = document.getElementById('nonhuman-check');
let separateAlignmentCheck = document.getElementById('separate-alignment-check');
let drawbackCheck = document.getElementById('drawback-check');
let generateButton = document.getElementById('generate');
let attributeCheck = document.getElementsByTagName("label");
let attributeSwap = document.getElementById('attribute-swap');
let attributeReplace = document.getElementById('attribute-replace');

let mark1 = document.querySelector('#mark1');
let mark2 = document.querySelector('#mark2');
let mark3 = document.querySelector('#mark3');
let ancestryP = document.querySelector('#ancestry-p');
let seasonP = document.querySelector('#season-p');
let doomingP = document.querySelector('#dooming-p');
let complexionP = document.querySelector('#complexion-p');
let ageP = document.querySelector('#age-p');
let classP = document.querySelector('#class-p');
let upbringingP = document.querySelector('#upbringing-p');
let professionP = document.querySelector('#profession-p');
let trappingsP = document.querySelector('#trappings-p');
let buildP = document.querySelector("#build-p");
let alignmentP = document.querySelector('#alignment-p');
let drawbackP = document.querySelector('#drawback-p');

//Rollers
rolld100 = () => {
  d100 =  Math.floor(Math.random() * 100) + 1;
};
rolld10 = () => {
  d10 = Math.floor(Math.random() * 10) + 1;
}
roll3d10 = () => {
  sum = 0;
  for (i = 0; i < 3; i++) {
    rolld10();
    sum += d10;
  }
  return sum;
};

//Randomize All
randomizeAll = () => {
  setAttributes();
  setAncestry();
  setSeason();
  setDooming(birthSeason);
  setComplexion();
  setHairColor();
  setEyeColor();
  setSocialClass();
  setUpbringing();
  setProfession();
  setTrappings();
  setAge();
  setMarks();
  setBuild();
  //setHeightWeight();
  setAlignment();
  setDrawback();
};

generateButton.addEventListener('click', e => {
  randomizeAll();
});

//Set Attributes
setAttributes = () => {
  for (j = 0; j < 7; j++) {
    primaryAttributes[j] = (roll3d10() + 25 + '%');
    primaryBonuses[j] = primaryAttributes[j].charAt(0);
  }
  primaryBonuses = primaryBonuses.map(v => parseInt(v, 10));
  console.log(primaryAttributes);
  console.log(primaryBonuses);
  for (i = 0; i < 7; i++) {
    attributeCheck[i].innerHTML += primaryAttributes[i];
  }
};

swapAttributes = () => {
  attSwapped = true;
};

replaceAttributes = () => {
  attReplaced = true;
};

attributeReplace.addEventListener('click', e => {
  if (attReplaced == true) {
    window.prompt('nope!');
  } else {
    swapAttributes();
    console.log('replaced!');
  };
});  

attributeSwap.addEventListener('click', e => {
  if (attSwapped == true) {
    window.prompt('nope!');
  } else {
    swapAttributes();
    console.log('swapped!');
  };
});

//Set Ancestry
setAncestry = () => {
  ancestryP.textContent = 'Ancestry: ';
  if (nonhumanCheck.checked == true) {
    ancestry = ancestryArr[Math.floor(Math.random() * ancestryArr.length)];
  };
  switch (ancestry) {
    case ('Dwarf'):
      primaryBonuses[0] += 1;
      primaryBonuses[1] += 1;
      primaryBonuses[5] += 1;
      primaryBonuses[2] -= 1;
      primaryBonuses[3] -= 1;
      primaryBonuses[6] -= 1;
    break;
    case ('Elf'):
      primaryBonuses[2] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[5] -= 1;
      primaryBonuses[6] -= 1;
    break;
    case ('Gnome'):
      primaryBonuses[2] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[5] += 1;
      primaryBonuses[0] -= 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[6] -= 1;
    break;
    case ('Halfling'):
      primaryBonuses[2] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[6] += 1;
      primaryBonuses[0] -= 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[4] -= 1;
    break;
    case ('Ogre'):
      primaryBonuses[1] += 2;
      primaryBonuses[0] += 1;
      primaryBonuses[2] -= 2;
      primaryBonuses[3] -= 1;
    break;
    default:
      primaryBonuses[0] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[2] -= 1;
      primaryBonuses[5] -= 1;
      primaryBonuses[6] -= 1;
    break;
  }
  console.log(ancestry);
  ancestryP.textContent = 'Ancestry: ' + ancestry;
  for (i = 0; i < 7; i++) {
    attributeCheck[i].innerHTML += ' (' + primaryBonuses[i] + ')'
  };
  //console.log(ancestralTrait);
};
setAncestryTrait = () => {
  //select appropriate traits based on weights (5 at 8%, 6 at 7%, 1 at 6%)
};

//Set Birth Season & Dooming
setSeason = () => {
  birthSeason = seasonArr[Math.floor(Math.random() * seasonArr.length)];
  console.log(birthSeason);
  seasonP.textContent += birthSeason;
  return birthSeason;
};

setDooming = (birthSeason) => {
  dooming = doomingArr[seasonArr.indexOf(birthSeason)][Math.floor(Math.random() * 24)];
  console.log(dooming);
  doomingP.textContent += dooming;
  return dooming;
};

//Set Complexion
setComplexion = () => {
  complexion = complexionArr[Math.floor(Math.random() * complexionArr.length)];
  console.log(complexion);
  complexionP.textContent += complexion;
  return complexion;
};

//Set hair color
setHairColor = () => {
  rolld100();
  switch (true) {
    case (d100 <= 18):
      hairIndex = 0;
      setHairByIndex(hairIndex);
    break;
    case (d100 <= 32):
      hairIndex = 1;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 42):
      hairIndex = 2;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 50):
      hairIndex = 3;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 58):
      hairIndex = 4;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 64):
      hairIndex = 5;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 70):
      hairIndex = 6;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 76):
      hairIndex = 7;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 80):
      hairIndex = 8;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 84):
      hairIndex = 9;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 88):
      hairIndex = 10;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 90):
      hairIndex = 11;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 92):
      hairIndex = 12;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 94):
      hairIndex = 13;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 96):
      hairIndex = 14;
      setHairByIndex(hairIndex);
      break;
    case (d100 <= 100):
      hairIndex = 15;
      setHairByIndex(hairIndex);
      break;
  }
  console.log(hairColor);
  return hairColor;
}

setHairByIndex = (hairIndex) => {
  if (ancestry == 'Elf') {
    hairColor = hairColors.elf[hairIndex];
  } else if (ancestry == 'Halfling') {
    hairColor = hairColors.halfling[hairIndex];
  } else if (ancestry == 'Human') {
    hairColor = hairColors.human[hairIndex] 
  } else {
    hairColor = hairColors.dwarfGnomeOgre[hairIndex];
  };
};

//Set eye color
setEyeColor = () => {
  rolld100();
  switch (true) {
    case (d100 <= 16):
      eyeIndex = 0;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 32):
      eyeIndex = 1;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 36):
      eyeIndex = 2;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 44):
      eyeIndex = 3;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 50):
      eyeIndex = 4;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 58):
      eyeIndex = 5;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 66):
      eyeIndex = 6;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 74):
      eyeIndex = 7;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 80):
      eyeIndex = 8;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 86):
      eyeIndex = 9;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 90):
      eyeIndex = 10;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 96):
      eyeIndex = 11;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 98):
      eyeIndex = 12;
      setEyesByIndex(eyeIndex);
      break;
    case (d100 <= 100):
      eyeIndex = 13;
      setEyesByIndex(eyeIndex);
      break;
  }
  console.log(eyeColor);
  return eyeColor;
};

setEyesByIndex = (eyeIndex) => {
  if (ancestry == 'Dwarf') {
    eyeColor = eyeColors.dwarf[eyeIndex];
  } else if (ancestry == 'Elf') {
    eyeColor = eyeColors.elf[eyeIndex];
  } else if (ancestry == 'Gnome') {
    eyeColor = eyeColors.gnome[eyeIndex];
  } else if (ancestry == 'Halfling') {
    eyeColor = eyeColors.halfling[eyeIndex];
  } else if (ancestry == 'Human') {
    eyeColor = eyeColors.human[eyeIndex];
  } else {
    eyeColor = eyeColors.ogre[eyeIndex];
  };
};

//Set Age & Distinguishing Marks
setAge = () => {
  rolld100();
  switch (true) {
    case (d100 <= 25):
      age = 'Young';
      break;
    case (d100 <= 70):
      age = 'Adult';
      break;
    case (d100 <= 90):
      age = 'Middle Aged';
      break;
    case (d100 <= 100):
      age = 'Elderly';
      break;
  };
  console.log(age);
  ageP.textContent += age;
  return age;
};

setMarks = () => {
  marks[1] = '';
  marks[2] = '';
  marks[3] = '';
  mark1.textContent = 'Distinguishing Mark: ';
  mark2.textContent = 'Distinguishing Mark: ';
  mark3.textContent = 'Distinguishing Mark: ';
  switch (age) {
    case ('Adult'):
      rolld100();
      firstMark = d100;
      marks[1] = markArr[firstMark];
    break;
    case ('Middle Aged'):
      rolld100();
      firstMark = d100;
      marks[1] = markArr[firstMark];
      rolld100();
      if (d100 == firstMark) {
        while (d100 == firstMark) {
          rolld100();
        };
      };
      secondMark = d100;
      marks[2] = markArr[secondMark];
    break;
    case ('Elderly'):
      rolld100();
      firstMark = d100;
      marks[1] = markArr[firstMark];
      rolld100();
      if (d100 == firstMark) {
        while (d100 == firstMark) {
          rolld100();
        };
      };
      secondMark = d100;
      marks[2] = markArr[secondMark];
      rolld100();
      if ((thirdMark == secondMark) || (thirdMark == firstMark)) {
        while ((thirdMark == secondMark) || (thirdMark == firstMark)) {
         rolld100();
        };
      };
      thirdMark = d100;
      marks[3] = markArr[thirdMark];
    break;
    default:
      console.log(age + ' characters receive no marks');
  };
  console.log(marks);
  updateMarks();
};

updateMarks = () => {
  mark1.textContent += marks[1];
  marks[2] != null ? mark2.textContent += marks[2] : null;
  marks[3] != null ? mark3.textContent += marks[3] : null;
};

//Set Social Class
setSocialClass = () => {
  if (profession = 'Peasant') {
    socialClass = 'Lowborn';
  } else {
    rolld100();
    switch (true) {
      case (d100 <= 60):
        socialClass = 'Lowborn';
      break;
      case (d100 <= 90):
        socialClass = 'Burgher';
        break;
      case (d100 <= 100):
        socialClass = 'Aristocrat';
      break;
    };
  };
  console.log(socialClass);
  classP.textContent += socialClass;
  return socialClass;
};

//Set Upbringing
setUpbringing = () => {
  rolld100();
  switch (true) {
    case (d100 <= 14):
      upbringing = 'Cultured';
      favoredPrimary = 'Fellowship'
      break;
    case (d100 <= 29):
      upbringing = 'Forgotten';
      favoredPrimary = 'Agility'
      break;
    case (d100 <= 44):
      upbringing = 'Industrious';
      favoredPrimary = 'Brawn'
      break;
    case (d100 <= 59):
      upbringing = 'Militant';
      favoredPrimary = 'Combat'
      break;
    case (d100 <= 74):
      upbringing = 'Opportunistic';
      favoredPrimary = 'Perception'
      break;
    case (d100 <= 89):
      upbringing = 'Reverent';
      favoredPrimary = 'Willpower'
      break;
    case (d100 <= 100):
      upbringing = 'Scholastic';
      favoredPrimary = 'Intelligence'
      break;
  };
  console.log(upbringing + ', ' + 'Favoried Primary: ' + favoredPrimary);
  upbringingP.textContent += upbringing;
  return (upbringing, favoredPrimary);
};

//Set Archetype, Profession, Trappings
setArchetype = () => {
  rolld100();
  switch (true) {
    case (d100 <= 15):
      archetype = 0;
      break;
    case (d100 <= 32):
      archetype = 1;
      break;
    case (d100 <= 49):
      archetype = 2;
      break;
    case (d100 <= 66):
      archetype = 3;
      break;
    case (d100 <= 83):
      archetype = 4;
      break;
    case (d100 <= 100):
      archetype = 5;
      break;
  };
  return archetype;
};

setProfession = () => {
  setArchetype();
  rolld100();
  switch (true) {
    case (d100 <= 8):
      profession = 0;
      break;
    case (d100 <= 16):
      profession = 1;
      break;
    case (d100 <= 25):
      profession = 2;
      break;
    case (d100 <= 33):
      profession = 3;
      break;
    case (d100 <= 41):
      profession = 4;
      break;
    case (d100 <= 49):
      profession = 5;
      break;
    case (d100 <= 58):
      profession = 6;
      break;
    case (d100 <= 67):
      profession = 7;
      break;
    case (d100 <= 76):
      profession = 8;
      break;
    case (d100 <= 85):
      profession = 9;
      break;
    case (d100 <= 92):
      profession = 10;
      break;
    case (d100 <= 100):
      profession = 11;
      break;
  };
  professionP.textContent = 'Basic Profession: ';
  profession = profArr[archetype][profession];
  console.log(profession);
  professionP.textContent = 'Basic Profession: ' + profession;
  return profession;
};

setTrappings = () => {
  trappingsP.textContent = 'Trappings: ';
  trappings = trappingsArr[archetype].join(', ');
  //need to randomize or select from nested arrays
  trappingsP.textContent = 'Trappings: ' + trappings;
}

//Set Build, Height & Weight
setBuild = () => {
  buildP.textContent = 'Build: ';
  build = buildArr[Math.floor(Math.random() * buildArr.length)];
  console.log(build);
  buildP.textContent = 'Build: ' + build;
  return build;
};

setHeightWeight = () => {

};

//Set Alignment
setAlignment = () => {
  if (separateAlignmentCheck.checked == true) {
    alignment = { 
      order: alignments.order[Math.floor(Math.random() * 24)], 
      chaos: alignments.chaos[Math.floor(Math.random() * 24)],
    };
  } else { 
      pair = Math.floor(Math.random() * 24);
      alignment = {
      order: alignments.order[pair],
      chaos: alignments.chaos[pair],
    };
  }
  alignmentP.textContent = 'Alignment: ';
  console.log(alignment.order + ', ' + alignment.chaos);
  alignmentP.textContent = 'Alignment: ' + alignment.order + ', ' + alignment.chaos;
};

//Set Drawback
setDrawback = () => {
  if (drawbackCheck.checked == true) {
    rolld100();
    switch (true) {
      case (d100 <= 4):
        drawback = 'Bad Ticker';
      break;
      case (d100 <= 7):
        drawback = 'Black Cataract';
      break;
      case (d100 <= 11):
        drawback = 'Bleeder';
        break;
      case (d100 <= 15):
        drawback = 'Branded';
        break;
      case (d100 <= 19):
        drawback = 'Choleric Temperament';
        break;
      case (d100 <= 23):
        drawback = 'Crop Ear';
        break;
      case (d100 <= 27):
        drawback = 'Cursed';
        break;
      case (d100 <= 31):
        drawback = 'Deal with the Devil';
        break;
      case (d100 <= 35):
        drawback = 'Debt-Ridden';
        break;
      case (d100 <= 39):
        drawback = 'Dunderhead';
        break;
      case (d100 <= 43):
        drawback = 'Eunuch';
        break;
      case (d100 <= 47):
        drawback = 'Lily-Livered';
        break;
      case (d100 <= 51):
        drawback = 'Melancholic Temperament';
        break;
      case (d100 <= 55):
        drawback = 'Ne\'er Do Well';
        break;
      case (d100 <= 59):
        drawback = 'Nemesis';
        break;
      case (d100 <= 63):
        drawback = 'Painkiller';
        break;
      case (d100 <= 67):
        drawback = 'Persecution Complex';
        break;
      case (d100 <= 71):
        drawback = 'Phlegmatic Temperament';
        break;
      case (d100 <= 75):
        drawback = 'Sanguine Temperament';
        break;
      case (d100 <= 79):
        drawback = 'Sour Stomach';
        break;
      case (d100 <= 83):
        drawback = 'Split Face';
        break;
      case (d100 <= 87):
        drawback = 'Veteran\'s Boot';
        break;
      case (d100 <= 91):
        drawback = 'Veteran\'s Eye';
        break;
      case (d100 <= 94):
        drawback = 'Veteran\'s Hand';
        break;
      case (d100 <= 97):
        drawback = 'Veteran\'s Leg';
        break;
      case (d100 <= 100):
        drawback = 'Weak Lungs';
        break;
    };
  } else {
    drawback = 'None';
  };
  drawbackP.textContent = 'Drawback: ';
  console.log(drawback);
  drawbackP.textContent = 'Drawback: ' + drawback;
  return drawback;
};

//Character
const character = {
  name: null,
  sex: null,
  ancestry: ancestry,
  ancestralTrait: ancestralTrait,
  age: age,
  alignment: alignment,
  build: build,
  profession: profession,
  complexion: complexion,
  hairColor: hairColor,
  eyeColor: eyeColor,
  birthSeason: birthSeason,
  dooming: dooming,
  marks: marks,
  upbringing: upbringing,
  profession: profession,
  socialClass: socialClass,
  drawback: drawback,
};