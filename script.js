import {profArr, trappingsArr, buildArr, alignments, markArr, 
  complexionArr, seasonArr, ancestryArr, doomingArr,
  hairColors, eyeColors, ancestralTraits} from "./lists.js";

//Global Variables
let d100, d10;
let i, j;
let hairIndex, eyeIndex, ancestryNum, ancestryIndex;
let sum;
let archetype;
let firstMark, secondMark, thirdMark;
let attSwapped = false;
let attReplaced = false;
let pronoun, pronounPossessive, verbPossessive, verbState, verbPast;

let dooming, age, profession, upbringing, favoredPrimary, socialClass,
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

let history0 = document.querySelector('#history0');
let history1 = document.querySelector('#history1');
let history2 = document.querySelector('#history2');
let history3 = document.querySelector('#history3');
let history4 = document.querySelector('#history4');
let history5 = document.querySelector('#history5');
let trappingsP = document.querySelector('#trappings');

let nameValue = document.getElementById("name-input").value;
let lastNameValue = document.getElementById("last-name-input").value;
let sexValue = document.getElementById("sex-input").value;

//Rollers
let rolld100 = () => {
  d100 =  Math.floor(Math.random() * 100) + 1;
};
let rolld10 = () => {
  d10 = Math.floor(Math.random() * 10) + 1;
}
let roll3d10 = () => {
  sum = 0;
  for (i = 0; i < 3; i++) {
    rolld10();
    sum += d10;
  }
  return sum;
};

//Randomize All
let randomizeAll = () => {
  setAttributes();
  setAncestry();
  setProfession();
  setTrappings();
  setSeason();
  setDooming(birthSeason);
  setAge();
  setMarks();
  setComplexion();
  setBuild();
//setHeightWeight();
  setHairColor();
  setEyeColor();
  setUpbringing();
  setSocialClass();
  setDrawback();
  setAlignment();
  setHistory();
};

generateButton.addEventListener('click', e => {
  nameValue = document.getElementById("name-input").value;
  sexValue = document.getElementById("sex-input").value.toLowerCase();
  lastNameValue = document.getElementById("last-name-input").value;
  if (sexValue == 'male') {
    pronoun = 'He';
    pronounPossessive = 'His';
    verbPossessive = 'has';
    verbState = 'is';
    verbPast = 'was';
  } else if (sexValue == 'female') {
    pronoun = 'She';
    pronounPossessive = 'Her';
    verbPossessive = 'has';
    verbState = 'is';
    verbPast = 'was';
  } else {
    pronoun = 'They';
    pronounPossessive = 'Their';
    verbPossessive = 'have';
    verbState = 'are';
    verbPast = 'were';
  };
  if (nameValue == "" || sexValue == "") {
    window.alert("Please enter a Name and Sex");
  } else {
    randomizeAll();
  };
  return nameValue, lastNameValue, sexValue;
});

//Set Attributes
let setAttributes = () => {
  for (j = 0; j < 7; j++) {
    attributeCheck[j].innerHTML = attributeCheck[j].innerHTML.slice(0, (attributeCheck[j].innerHTML - 8));
    primaryAttributes[j] = (roll3d10() + 25 + '%');
    primaryBonuses[j] = primaryAttributes[j].charAt(0);
  };
  primaryBonuses = primaryBonuses.map(v => parseInt(v, 10));
  console.table(primaryAttributes);
  console.table(primaryBonuses);
  for (i = 0; i < 7; i++) {
    attributeCheck[i].innerHTML += primaryAttributes[i];
  };
};

let swapAttributes = () => {
  attSwapped = true;
};

let replaceAttributes = () => {
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
let setAncestry = () => {
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
      ancestryNum = 1;
    break;
    case ('Elf'):
      primaryBonuses[2] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[5] -= 1;
      primaryBonuses[6] -= 1;
      ancestryNum = 2;
    break;
    case ('Gnome'):
      primaryBonuses[2] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[5] += 1;
      primaryBonuses[0] -= 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[6] -= 1;
      ancestryNum = 3;
    break;
    case ('Halfling'):
      primaryBonuses[2] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[6] += 1;
      primaryBonuses[0] -= 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[4] -= 1;
      ancestryNum = 4;
    break;
    case ('Ogre'):
      primaryBonuses[1] += 2;
      primaryBonuses[0] += 1;
      primaryBonuses[2] -= 2;
      primaryBonuses[3] -= 1;
      ancestryNum = 5;
    break;
    default:
      primaryBonuses[0] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[2] -= 1;
      primaryBonuses[5] -= 1;
      primaryBonuses[6] -= 1;
      ancestryNum = 0;
    break;
  };
  console.log('Ancestry: ' + ancestry);
  for (let i = 0; i < 7; i++) {
    attributeCheck[i].innerHTML += ' (' + primaryBonuses[i] + ')'
  };
  setAncestryTrait();
  return ancestry;
};

let setAncestryTrait = () => {
  rolld100();
  switch (true) {
    case (d100 <= 8):
      ancestryIndex = 0;
    break;
    case (d100 <= 16):
      ancestryIndex = 1;
    break;
    case (d100 <= 25):
      ancestryIndex = 2;
    break;
    case (d100 <= 33):
      ancestryIndex = 3;
    break;
    case (d100 <= 41):
      ancestryIndex = 4;
    break;
    case (d100 <= 49):
      ancestryIndex = 5;
    break;
    case (d100 <= 58):
      ancestryIndex = 6;
    break;
    case (d100 <= 67):
      ancestryIndex = 7;
    break;
    case (d100 <= 76):
      ancestryIndex = 8
    break;
    case (d100 <= 85):
      ancestryIndex = 9
    break;
    case (d100 <= 92):
      ancestryIndex = 10
    break;
    case (d100 <= 100):
      ancestryIndex = 11
    break;
  };
  ancestralTrait = ancestralTraits[ancestryNum][ancestryIndex];
  console.log('Ancestral Trait: ' + ancestralTrait);
  return ancestralTrait;
};

//Set Archetype, Profession, Trappings
let setArchetype = () => {
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

let setProfession = () => {
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
  profession = profArr[archetype][profession];
  console.log(`Profession: ${profession}`);
  return profession;
};

let setTrappings = () => {
  trappingsP.textContent = 'Trappings: ';
  trappings = trappingsArr[archetype].join(', ');
  trappingsP.textContent += trappings;
}

//Set Birth Season & Dooming
let setSeason = () => {
  birthSeason = seasonArr[Math.floor(Math.random() * seasonArr.length)];
  console.log(`Birth Season: ${birthSeason}`);
  return birthSeason;
};

let setDooming = (birthSeason) => {
  dooming = doomingArr[seasonArr.indexOf(birthSeason)][Math.floor(Math.random() * 24)];
  console.log(`Dooming: "${dooming}"`);
  return dooming;
};

//Set Age & Distinguishing Marks
let setAge = () => {
  rolld100();
  switch (true) {
    case (d100 <= 25):
      age = 'young';
      break;
    case (d100 <= 70):
      age = 'adult';
      break;
    case (d100 <= 90):
      age = 'middle aged';
      break;
    case (d100 <= 100):
      age = 'elderly';
      break;
  };
  console.log(`Age: ${age}`);
  return age;
};

let setMarks = () => {
  marks[1] = '';
  marks[2] = '';
  marks[3] = '';
  switch (age) {
    case ('adult'):
      rolld100();
      firstMark = d100;
      marks[1] = markArr[firstMark];
      break;
    case ('middle aged'):
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
    case ('elderly'):
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
};

//Set Complexion
let setComplexion = () => {
  complexion = complexionArr[Math.floor(Math.random() * complexionArr.length)];
  console.log(`Complexion: ${complexion}`);
  return complexion;
};

//Set Build, Height & Weight
let setBuild = () => {
  build = buildArr[Math.floor(Math.random() * buildArr.length)];
  console.log(`Build: ${build}`);
  return build;
};

let setHeightWeight = () => {

};

//Set hair color
let setHairColor = () => {
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
  };
  console.log(`Hair color: ${hairColor}`);
  return hairColor;
};

let setHairByIndex = (hairIndex) => {
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
let setEyeColor = () => {
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
  };
  console.log(`Eye Color: ${eyeColor}`);
  return eyeColor;
};

let setEyesByIndex = (eyeIndex) => {
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

//Set Upbringing and Social Class
let setUpbringing = () => {
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
  console.log(`Upbringing: ${upbringing}; Favored Primary: ${favoredPrimary}`);
  return (upbringing, favoredPrimary);
};

let setSocialClass = () => {
  if (profession == 'Peasant') {
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
  console.log(`Social Class: ${socialClass}`);
  return socialClass;
};

//Set Drawback
let setDrawback = () => {
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
  console.log(`Drawback: ${drawback}`);
  return drawback;
};

//Set Alignment
let setAlignment = () => {
  if (separateAlignmentCheck.checked == true) {
    alignment = { 
      order: alignments.order[Math.floor(Math.random() * 24)], 
      chaos: alignments.chaos[Math.floor(Math.random() * 24)],
    };
  } else { 
      let pair = Math.floor(Math.random() * 24);
      alignment = {
      order: alignments.order[pair],
      chaos: alignments.chaos[pair],
    };
  };
  console.log(`Alignment: ${alignment.order}, ${alignment.chaos}`);
};

let setHistory = () => {
  history0.textContent = `${nameValue} ${lastNameValue} is ${((age.charAt(0) == 'a') || (age.charAt(0) == 'e')) ? 'an' : 'a'} 
    ${age} ${ancestry} ${sexValue} ${profession}. ${pronounPossessive} ancestral trait is ${ancestralTrait}.`;
  history1.textContent = `${pronoun} ${verbState} of a ${build} build type. ${nameValue} ${verbPossessive} 
    ${complexion.toLowerCase()} skin, with ${hairColor.toLowerCase()} hair and ${eyeColor.toLowerCase()} eyes.`;

  if (age == 'young') {
    history2.textContent = '';
  } else if (age == 'adult') {
    history2.textContent = `${pronounPossessive} mark is "${marks[1]}".`;
  } else if (age == 'middle aged') {
    history2.textContent = `${pronounPossessive} marks are "${marks[1]}" and "${marks[2]}".`;
  } else if (age == 'elderly') {
    history2.textContent = `${pronounPossessive} marks are: "${marks[1]}", "${marks[2]}", and "${marks[3]}".`;
  };
 
  history3.textContent = `${nameValue} ${verbPast} born in ${birthSeason}, ${verbState} of the 
    ${socialClass} social class and of ${((upbringing.charAt(0) == 'I') || (age.charAt(0) == 'O')) ? 'an' : 'a'} 
    ${upbringing} upbringing. `;

  if (drawbackCheck.checked == true) {
    history4.textContent = `${pronounPossessive} dooming is "${dooming}" and 
      ${pronounPossessive.toLowerCase()} drawback is ${drawback}. `
  } else {
    history4.textContent = `${pronounPossessive} dooming is "${dooming}."`
  };

  history5.textContent = `${pronounPossessive} order alignment is ${alignment.order} and 
    ${pronounPossessive.toLowerCase()} chaos alignment is ${alignment.chaos}.`;
}

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
  attributes: primaryAttributes,
  bonuses: primaryBonuses,
};
