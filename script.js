import {professonObj, trappingsObj, buildArr, alignmentsObj, markArr, 
  complexionArr, seasonArr, ancestryArr, doomingArr,
  hairColorsObj, eyeColorsObj, ancestralTraitsObj, baseHeight, 
  weightsObj, sexArr, mgProfessonObj, motivationArr, 
  npcAlignmentsArr, namesObj} from "./lists.js";

import {nonhumanCheck, separateAlignmentCheck, drawbackCheck,
  generateButton, attCheckLabel, attributeSwap, attributeReplace,
  history0, history1, history2, history3, history4, history5, cashP,
  trappingsP, attButtonsDiv, natSelect, natSelectText, 
  attributeCheck, mgCheck, generateNPCButton} from "./dom.js";

import { setCharacterDom, setNPCDom, createAttButtons } from "./dom.js";

//Global Variables
var attSwapped = false;
var attReplaced = false;
var natSelectReplaced = false;
var characterGenerated = false;
var npcGenerated = false;

var marks = {
  1: '',
  2: '',
  3: '',
};
var alignment = {
  order: '',
  chaos: '',
};
var primaryAttributes = [];
var primaryBonuses = [];

//Rollers
let rolld100 = () => Math.floor(Math.random() * 100) + 1;

let rolld10 = () => Math.floor(Math.random() * 10) + 1;

let rollxd10 = (x) => {
  let sum = 0;
  for (let i = 0; i < x; i++) {
    let d10 = rolld10();
    sum += d10;
  }
  return sum;
};

//Randomize All
let randomizeAll = () => {
  let sexRadio = document.getElementsByName('sex');
  let sexValue;
  let sexTable;
  for (let i = 0; i < sexRadio.length; i++) {
    if (sexRadio[i].checked) {
      sexValue = sexRadio[i].value;
    };
  };
  if (sexValue == 'either') {
    sexTable = sexArr[Math.floor(Math.random() * sexArr.length)];
  } else {
    sexTable = sexValue;
  };

  setAttributes();
  let ancestry = setAncestry()
  setAncestryBonuses(ancestry);
  let ancestralTrait = setAncestryTrait(ancestry);

  if (ancestralTrait == 'Mixed Heritage') {
    var ancestry2 = ancestryArr[Math.floor(Math.random() * ancestryArr.length)];
    var mixedHeritageTrait = setAncestryTrait(ancestry2);
  } else {
    var ancestry2 = 'none';
    var mixedHeritageTrait = 'none';
  };
  
  if (ancestralTrait == 'Natural Selection') {
    natSelect.appendChild(natSelectText);
    attButtonsDiv.insertBefore(natSelect, attButtonsDiv.firstChild);
  };

  let archetype = setArchetype();
  let profession;
  if (mgCheck.checked == true) {
    profession = setProfessionMG(archetype);
  } else {
    profession = setProfession(archetype);
  };

  setTrappings(archetype);
  let birthSeason = setSeason();
  let dooming = setDooming(birthSeason);
  let age = setAge();
  setMarks(age);
  let complexion = complexionArr[Math.floor(Math.random() * complexionArr.length)];
  let build = setBuild(ancestralTrait);
  let heightWeightNum = Math.floor(Math.random() * 9);
  let height = setHeight(ancestry, ancestralTrait, heightWeightNum, sexTable);
  let weight = setWeight(ancestry, ancestralTrait, build, heightWeightNum, sexTable);
  let hairColor = setHairColor(ancestry);
  let eyeColor = setEyeColor(ancestry);
  let upbringing = setUpbringing();
  let socialClass = setSocialClass(profession);
  let drawback = setDrawback();
  setAlignment();
  let cash = setCash(socialClass);

  setHistory(
    sexValue, ancestry, ancestralTrait,
    profession, birthSeason, dooming, age,
    build, height, weight, complexion,
    hairColor, eyeColor, upbringing, socialClass,
    drawback, marks, mixedHeritageTrait,
    ancestry2, cash,
  );
};

let randomizeAllNPC = () => {
  let sexRadio = document.getElementsByName('sex');
  let sexValue;
  for (let i = 0; i < sexRadio.length; i++) {
    if (sexRadio[i].checked) {
      sexValue = sexRadio[i].value;
    };
  };
  let nameNPC = setNameNPC(sexValue);
  let age = setAge();
  let ancestry = setAncestry();
  let height = setNPCHeight();
  let build = setBuild(ancestralTrait);
  let complexion = complexionArr[Math.floor(Math.random() * complexionArr.length)];
  let dress = setDress();
  setAncestryBonuses(ancestry);
  setMarks(age);
  let socialClass = setSocialClass(profession);
  let motivation = motivationArr[Math.floor(Math.random() * motivationArr.length)];
  let archetype = setArchetype();
  let alignment = npcAlignmentsArr[Math.floor(Math.random() * npcAlignmentsArr.length)];

  setTrappings(archetype);
};

generateButton.addEventListener('click', e => {
  let sexRadio = document.getElementsByName('sex');
  let sexValue;
  for (let i = 0; i < sexRadio.length; i++) {
    if (sexRadio[i].checked) {
      sexValue = sexRadio[i].value;
    };
  };
  if (sexValue == undefined) {
    window.alert("Please select your preferred Sex Table");
  } else {
    if (characterGenerated == false) {
      setCharacterDom();
    };
    if (document.body.contains(natSelect)) {
      attButtonsDiv.removeChild(natSelect);
    };
    createAttButtons();
    attSwapped = false;
    attReplaced = false;
    natSelectReplaced = false;
    characterGenerated = true;
    randomizeAll();
  };
});

generateNPCButton.addEventListener('click', e => {
  let sexRadio = document.getElementsByName('sex');
  let sexValue;
  for (let i = 0; i < sexRadio.length; i++) {
    if (sexRadio[i].checked) {
      sexValue = sexRadio[i].value;
    };
  };
  if (sexValue == undefined) {
    window.alert("Please select your preferred Sex Table");
  } else {
    if (npcGenerated == false) {
      setNPCDom();
    };
    npcGenerated = true;
    randomizeAllNPC();
  };
});

//Set NPC Name
let setNameNPC = (sexValue) => {
  return namesObj[sexValue][Math.floor(Math.random() * 100)];
};

//Set Attributes
let setAttributes = () => {
  for (let i = 0; i < 7; i++) {
    primaryAttributes[i] = (rollxd10(3) + 25 + '%');
  };
  setAttributeDom();
  setPrimaryBonuses();
};

let setPrimaryBonuses = () => {
  for (let i = 0; i < primaryAttributes.length; i++) {
    primaryBonuses[i] = primaryAttributes[i].charAt(0);
  };
  primaryBonuses = primaryBonuses.map(v => parseInt(v, 10));
};

let setAttributeDom = () => {
  for (let i = 0; i < 7; i++) {
    attCheckLabel[i].innerHTML = attributeCheck[i].value.toUpperCase() + ': ' + primaryAttributes[i];
  };
};

let swapReplaceAtt = () => {
  let attributeChange = changeAttributes();
  switch (true) {
    case (attSwapped):
      [primaryAttributes[attributeChange[0]], primaryAttributes[attributeChange[1]]] =
        [primaryAttributes[attributeChange[1]], primaryAttributes[attributeChange[0]]];
    break;
    case (attReplaced):
      primaryAttributes[attributeChange[0]] = '42%';
    break;
    case (natSelectReplaced):
      primaryAttributes[attributeChange[0]] = '55%';
    break;
  };
  setPrimaryBonuses();
  setAttributeDom();
  setAncestryBonuses();
};

let changeAttributes = () => {
  let attributeChange = [];
  for (let i = 0; i < attributeCheck.length; i++) {
    if (attributeCheck[i].checked == true) {
      attributeChange.push(i);
    };
  };
  return attributeChange;
};

let checkIfChecked = () => {
  let sum = 0;
  for (let i = 0; i < attributeCheck.length; i++) {
    if (attributeCheck[i].checked == true) {
      sum += 1;
    };
  };
  return sum;
};

attributeReplace.addEventListener('click', e => {
  let checked = checkIfChecked();
  if (checked != 1) {
    window.alert('Please select one Attribute to replace');
  } else {
    attReplaced = true;
    swapReplaceAtt();
    attButtonsDiv.removeChild(attributeReplace);
    attButtonsDiv.removeChild(attributeSwap);
  };
});  

attributeSwap.addEventListener('click', e => {
  let checked = checkIfChecked();
  if (checked !== 2) {
    window.alert('Please select two Attributes to swap')
  } else {
    attSwapped = true;
    swapReplaceAtt();
    attButtonsDiv.removeChild(attributeReplace);
    attButtonsDiv.removeChild(attributeSwap); 
  };  
});

natSelect.addEventListener('click', e => {
  let checked = checkIfChecked();
  if (checked != 1) {
    window.alert('Please select one Attribute to replace');
  } else {
    natSelectReplaced = true;
    swapReplaceAtt();
  };
  attButtonsDiv.removeChild(natSelect)
});  

//Set Ancestry
let setAncestry = () => {
  if (nonhumanCheck.checked == true) {
    return ancestryArr[Math.floor(Math.random() * ancestryArr.length)];
  } else {
    return 'Human';
  };
};

let setAncestryBonuses = (ancestry) => {
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
  };
  for (let i = 0; i < 7; i++) {
    attCheckLabel[i].innerHTML += ' (' + primaryBonuses[i] + ')'
  };
  return ancestry;
};

let setAncestryTrait = (ancestry) => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 8):
      return ancestralTraitsObj[ancestry][0];
    case (d100 <= 16):
      return ancestralTraitsObj[ancestry][1];
    case (d100 <= 25):
      return ancestralTraitsObj[ancestry][2];
    case (d100 <= 33):
      return ancestralTraitsObj[ancestry][3];
    case (d100 <= 41):
      return ancestralTraitsObj[ancestry][4];
    case (d100 <= 49):
      return ancestralTraitsObj[ancestry][5];
    case (d100 <= 58):
      return ancestralTraitsObj[ancestry][6];
    case (d100 <= 67):
      return ancestralTraitsObj[ancestry][7];
    case (d100 <= 76):
      return ancestralTraitsObj[ancestry][8];
    case (d100 <= 85):
      return ancestralTraitsObj[ancestry][9];
    case (d100 <= 92):
      return ancestralTraitsObj[ancestry][10];
    case (d100 <= 100):
      return ancestralTraitsObj[ancestry][11];
  };
};

//Set Archetype, Profession, Trappings
let setArchetype = () => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 15):
      return 'Academic';
    case (d100 <= 32):
      return 'Commoner';
    case (d100 <= 49):
     return 'Knave';
    case (d100 <= 66):
      return 'Ranger';
    case (d100 <= 83):
      return 'Socialite';
    case (d100 <= 100):
      return 'Warrior';
  };
};

let setProfession = (archetype) => {
  let profession;
  let d100 = rolld100();
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
  profession = professonObj[archetype][profession];
  return profession;
};

let setProfessionMG = (archetype) => {
  let profession;
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 6):
      profession = 0;
      break;
    case (d100 <= 13):
      profession = 1;
      break;
    case (d100 <= 20):
      profession = 2;
      break;
    case (d100 <= 27):
      profession = 3;
      break;
    case (d100 <= 34):
      profession = 4;
      break;
    case (d100 <= 41):
      profession = 5;
      break;
    case (d100 <= 47):
      profession = 6;
      break;
    case (d100 <= 54):
      profession = 7;
      break;
    case (d100 <= 61):
      profession = 8;
      break;
    case (d100 <= 68):
      profession = 9;
      break;
    case (d100 <= 75):
      profession = 10;
      break;
    case (d100 <= 82):
      profession = 11;
      break;
    case (d100 <= 89):
      profession = 11;
      break;
    case (d100 <= 95):
      profession = 11;
      break;
    case (d100 <= 100):
      profession = 11;
      break;
  };
  profession = mgProfessonObj[archetype][profession];
  return profession;
};

let setTrappings = (archetype) => {
  trappingsP.textContent = 'Trappings: ';
  let trappings = trappingsObj[archetype].join(', ');
  trappingsP.textContent += trappings;
}

//Set Birth Season & Dooming
let setSeason = () => seasonArr[Math.floor(Math.random() * seasonArr.length)];

let setDooming = (birthSeason) => doomingArr[seasonArr.indexOf(birthSeason)][Math.floor(Math.random() * 24)];

//Set Age & Distinguishing Marks
let setAge = () => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 25):
      return 'young';
    case (d100 <= 70):
    return 'adult';
    case (d100 <= 90):
      return 'middle aged';
    case (d100 <= 100):
      return 'elderly';
  };
};

let setMarks = (age) => {
  marks[1] = '';
  marks[2] = '';
  marks[3] = '';
  let firstMark, secondMark, thirdMark;
  let d100;
  switch (age) {
    case ('adult'):
      d100 = rolld100();
      d100 -= 1;
      firstMark = d100;
      marks[1] = markArr[firstMark];
      break;
    case ('middle aged'):
      d100 = rolld100();
      d100 -= 1;
      firstMark = d100;
      marks[1] = markArr[firstMark];
      d100 = rolld100();
      d100 -= 1;
      if (d100 == firstMark) {
        while (d100 == firstMark) {
          d100 = rolld100();
          d100 -= 1;
        };
      };
      secondMark = d100;
      marks[2] = markArr[secondMark];
      break;
    case ('elderly'):
      d100 = rolld100();
      d100 -= 1;
      firstMark = d100;
      marks[1] = markArr[firstMark];
      d100 = rolld100();
      d100 -= 1;
      if (d100 == firstMark) {
        while (d100 == firstMark) {
          d100 = rolld100();
          d100 -= 1;
        };
      };
      secondMark = d100;
      marks[2] = markArr[secondMark];
      d100 = rolld100();
      d100 -= 1;
      if ((thirdMark == secondMark) || (thirdMark == firstMark)) {
        while ((thirdMark == secondMark) || (thirdMark == firstMark)) {
          d100 = rolld100();
          d100 -= 1;
        };
      };
      thirdMark = d100;
      marks[3] = markArr[thirdMark];
      break;
    default:
      console.log(age + ' characters receive no marks');
  };
};

//Set Build, Height & Weight, Dress
let setBuild = (ancestralTrait) => {
  switch (ancestralTrait) {
    case 'Mountain Amongst Men':
      return 'husky';
    case 'Children of the Earth':
      return 'corpulent';
    case 'Physical Prowess':
      return 'husky';
    case 'Thieving Stunties':
      return 'frail';
    case 'Pintsized':
      return 'frail'; 
    default: 
      return buildArr[Math.floor(Math.random() * buildArr.length)]
  };
};

let setHeight = (ancestry, ancestralTrait, heightWeightNum, sexTable) => {
  switch (ancestralTrait) {
    case 'Mountain Amongst Men':
      heightWeightNum = 9;
    break;
    case 'Thieving Stunties':
    case 'Pintsized':
      heightWeightNum = 0;
    break;
    default:
      heightWeightNum = heightWeightNum;
    break;
  };
  let inches = heightWeightNum + baseHeight[sexTable][ancestry][1];
  let feet;
  if (inches >= 12) {
    feet = 1;
    inches -= 12;
  } else {
    feet = 0;
  };
  return `${baseHeight[sexTable][ancestry][0] + feet} ft, ${inches} in`;
};

let setWeight = (ancestry, ancestralTrait, build, heightWeightNum, sexTable) => {
  switch (ancestralTrait) {
    case 'Mountain Amongst Men': 
      heightWeightNum = 9;
    break;
    case 'Thieving Stunties':
    case 'Pintsized':
      heightWeightNum = 0;
    default:
      heightWeightNum = heightWeightNum;
    break;
  };
  return `${weightsObj[sexTable][ancestry][build][heightWeightNum]} lbs`;
};

let setNPCHeight = () => {
  let d100 = rolld100();
  switch(true) {
    case (d100 <= 20):
      return 'Short';
    case (d100 <= 79):
      return 'Normal';
    case (d100 <= 100):
      return 'Tall';
  };
};

let setDress = () => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 20):
      return 'Shabbily';
    case (d100 <= 70):
      return 'Modestly';
    case (d100 <= 90):
      return 'Fashionably';
    case (d100 <= 100):
      return 'Extravagantly';
  };
};

//Set hair color
let setHairColor = (ancestry) => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 18):
      return hairColorsObj[ancestry][0];
    case (d100 <= 32):
      return hairColorsObj[ancestry][1];
    case (d100 <= 42):
      return hairColorsObj[ancestry][2];
    case (d100 <= 50):
      return hairColorsObj[ancestry][3];
    case (d100 <= 58):
      return hairColorsObj[ancestry][4];
    case (d100 <= 64):
      return hairColorsObj[ancestry][5];
    case (d100 <= 70):
      return hairColorsObj[ancestry][6];
    case (d100 <= 76):
      return hairColorsObj[ancestry][7];
    case (d100 <= 80):
      return hairColorsObj[ancestry][8];
    case (d100 <= 84):
      return hairColorsObj[ancestry][9];
    case (d100 <= 88):
      return hairColorsObj[ancestry][10];
    case (d100 <= 90):
      return hairColorsObj[ancestry][11];
    case (d100 <= 92):
      return hairColorsObj[ancestry][12];
    case (d100 <= 94):
      return hairColorsObj[ancestry][13];
    case (d100 <= 96):
      return hairColorsObj[ancestry][14];
    case (d100 <= 100):
      return hairColorsObj[ancestry][15];
  };
};

//Set eye color
let setEyeColor = (ancestry) => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 16):
      return eyeColorsObj[ancestry][0];
    case (d100 <= 32):
      return eyeColorsObj[ancestry][1];
    case (d100 <= 36):
      return eyeColorsObj[ancestry][2];
    case (d100 <= 44):
      return eyeColorsObj[ancestry][3];
    case (d100 <= 50):
      return eyeColorsObj[ancestry][4];
    case (d100 <= 58):
      return eyeColorsObj[ancestry][5];
    case (d100 <= 66):
      return eyeColorsObj[ancestry][6];
    case (d100 <= 74):
      return eyeColorsObj[ancestry][7];
    case (d100 <= 80):
      return eyeColorsObj[ancestry][8];
    case (d100 <= 86):
      return eyeColorsObj[ancestry][9];
    case (d100 <= 90):
      return eyeColorsObj[ancestry][10];
    case (d100 <= 96):
      return eyeColorsObj[ancestry][11];
    case (d100 <= 98):
      return eyeColorsObj[ancestry][12];
    case (d100 <= 100):
      return eyeColorsObj[ancestry][13];
  };
};

//Set Upbringing, Social Class & Cash
let setUpbringing = () => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 14):
      return 'Cultured';
    case (d100 <= 29):
      return 'Forgotten';
    case (d100 <= 44):
      return 'Industrious';
    case (d100 <= 59):
      return 'Militant';
    case (d100 <= 74):
      return 'Opportunistic';
    case (d100 <= 89):
      return 'Reverent';
    case (d100 <= 100):
      return 'Scholastic';
  };
};

let setSocialClass = (profession) => {
  if ((profession == 'Peasant') || (profession == 'Rake')) {
    return 'Lowborn';
  } else {
    let d100 = rolld100();
    switch (true) {
      case (d100 <= 60):
        return 'Lowborn';
      case (d100 <= 90):
        return 'Burgher';
      case (d100 <= 100):
        return 'Aristocrat';
    };
  };
};

let setCash = (socialClass) => {
  switch (socialClass) {
    case 'Aristocrat':
      return `${rolld10() + 1} gold crowns`;
    case 'Burgher':
      return `${rollxd10(2) + 2} silver shillings`;
    case 'Lowborn':
      return `${rollxd10(3) + 3} brass pennies`;
  }
}

//Set Drawback
let setDrawback = () => {
  if (drawbackCheck.checked == true) {
    let d100 = rolld100();
    switch (true) {
      case (d100 <= 4):
        return 'Bad Ticker';
      case (d100 <= 7):
        return 'Black Cataract';
      case (d100 <= 11):
        return 'Bleeder';
      case (d100 <= 15):
        return'Branded';
      case (d100 <= 19):
        return 'Choleric Temperament';
      case (d100 <= 23):
        return 'Crop Ear';
      case (d100 <= 27):
        return 'Cursed';
      case (d100 <= 31):
        return 'Deal with the Devil';
      case (d100 <= 35):
        return 'Debt-Ridden';
      case (d100 <= 39):
        return 'Dunderhead';
      case (d100 <= 43):
        return 'Eunuch';
      case (d100 <= 47):
        return 'Lily-Livered';
      case (d100 <= 51):
        return 'Melancholic Temperament';
      case (d100 <= 55):
        return 'Ne\'er Do Well';
      case (d100 <= 59):
        return 'Nemesis';
      case (d100 <= 63):
        return 'Painkiller';
      case (d100 <= 67):
        return 'Persecution Complex';
      case (d100 <= 71):
        return 'Phlegmatic Temperament';
      case (d100 <= 75):
        return 'Sanguine Temperament';
      case (d100 <= 79):
        return 'Sour Stomach';
      case (d100 <= 83):
        return 'Split Face';
      case (d100 <= 87):
        return 'Veteran\'s Boot';
      case (d100 <= 91):
        return 'Veteran\'s Eye';
      case (d100 <= 94):
        return 'Veteran\'s Hand';
      case (d100 <= 97):
        return 'Veteran\'s Leg';
      case (d100 <= 100):
        return 'Weak Lungs';
    };
  } else {
    return 'None';
  };
};

//Set Alignment
let setAlignment = () => {
  if (separateAlignmentCheck.checked == true) {
    alignment = { 
      order: alignmentsObj.order[Math.floor(Math.random() * 24)], 
      chaos: alignmentsObj.chaos[Math.floor(Math.random() * 24)],
    };
  } else { 
      let pair = Math.floor(Math.random() * 24);
      alignment = {
      order: alignmentsObj.order[pair],
      chaos: alignmentsObj.chaos[pair],
    };
  };
};

let setHistory = (
  sexValue, ancestry, ancestralTrait,
  profession, birthSeason, dooming, age,
  build, height, weight, complexion,
  hairColor, eyeColor, upbringing, socialClass,
  drawback, marks, mixedHeritageTrait,
  ancestry2, cash,
  ) => {

  history0.textContent = `This character is 
  ${(age.charAt(0) == 'm') || (age.charAt(0) == 'y') ? 'a' : 'an'} 
  ${age} ${ancestry} 
  ${(sexValue == 'either') ? '' : sexValue} 
  ${profession}.`;

  history1.textContent = `They are ${height}, ${weight}
  & of a ${build} build type. They have
  ${complexion} skin, with ${hairColor} hair and ${eyeColor} eyes.`;

  if (age == 'young') {
    history2.textContent = '';
  } else if (age == 'adult') {
    history2.textContent = `Distinguishing Mark: "${marks[1]}".`;
  } else if (age == 'middle aged') {
    history2.textContent = `Distinguishing Marks: "${marks[1]}" and "${marks[2]}".`;
  } else if (age == 'elderly') {
    history2.textContent = `Distinguishing Marks: "${marks[1]}", "${marks[2]}", and "${marks[3]}".`;
  };
 
  history3.textContent = `This character was born in ${birthSeason}, 
    is of the ${socialClass} social class & of
    ${(upbringing.charAt(0) == 'I') || (upbringing.charAt(0) == 'O') ? 'an' : 'a'} 
    ${upbringing} upbringing.`;

  if (drawbackCheck.checked == true) {
    history4.textContent = `Dooming: "${dooming}" 
      Drawback: ${drawback}.`;
  } else {
    history4.textContent = `Dooming: "${dooming}."`
  };

  if (ancestralTrait == 'Mixed Heritage') {
    history5.textContent = `Ancestral Trait: Mixed Heritage
    (${mixedHeritageTrait}, ${ancestry2})`
  } else {
    history5.textContent = `Ancestral Trait: ${ancestralTrait}`
  };

  history6.textContent = `Alignment: ${alignment.order} & ${alignment.chaos}.`;

  cashP.textContent = `Starting Cash: ${cash}`;
}
