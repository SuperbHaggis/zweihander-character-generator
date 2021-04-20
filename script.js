import {professonObj, trappingsObj, buildArr, alignmentsObj, markArr, 
  complexionArr, seasonArr, ancestryArr, phbAncestryArr, doomingArr,
  hairColorsObj, eyeColorsObj, ancestralTraitsObj, baseHeight, 
  weightsObj, sexArr, mgProfessonObj} from "./lists.js";

import {ancestryRadios, sexRadios, separateAlignmentCheck, drawbackCheck,
  generateButton, attCheckLabel, attributeSwap, attributeReplace,
  attButtonsDiv, natSelect, natSelectText, setHistory, attributeCheck, 
  mgCheck, setAttributeDom, setCharSheetDom, createAttButtons} from "./dom.js";

//Global Variables
var attSwapped = false;
var attReplaced = false;
var natSelectReplaced = false;
var characterGenerated = false;

//Rollers - Add to random.js
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
  let sexValue = getSexValue();
  let ancestryValue = getAncestryValue();
  
  // Attributes and Ancestry
  let attributes = setAttributes();
  let ancestry = setAncestry(ancestryValue)
  setAncestryBonuses(ancestry, attributes);
  let ancestralTrait = setAncestralTrait(ancestry);

  // Archetype & Profession
  let archetype = setArchetype();
  let profession = (mgCheck.checked) ? setProfessionMG(archetype) : setProfession(archetype)

  // History, Trappings, Alignment
  let sexTable = (sexValue == 'either') ? sexArr[Math.floor(Math.random() * sexArr.length)] : sexValue;
  let birthSeason = setSeason();
  let age = setAge();
  let build = setBuild(ancestralTrait);
  let heightWeightNum = Math.floor(Math.random() * 9);
  let hairColor = setHairColor(ancestry);
  let eyeColor = setEyeColor(ancestry);
  let socialClass = setSocialClass(profession);
  let cash = setCash(socialClass);

  // Character Object
  let character = {
    "attributes": attributes,
    "ancestry": ancestry,
    "ancestral-trait": ancestralTrait,
    "age": age,
    "build": build,
    "profession": profession,
    "height": setHeight(ancestry, ancestralTrait, heightWeightNum, sexTable),
    "weight": setWeight(ancestry, ancestralTrait, build, heightWeightNum, sexTable),
    "complexion": complexionArr[Math.floor(Math.random() * complexionArr.length)],
    "hair": hairColor,
    "eyes": eyeColor,
    "marks": setMarks(age),
    "season": birthSeason,
    "class": socialClass,
    "upbringing": setUpbringing(),
    "dooming": setDooming(birthSeason),
    "drawback": setDrawback(),
    "alignment": setAlignment(),
    "cash": cash,
    "trappings": trappingsObj[archetype]
  };

  console.log(character);
  storeCharacter(character);
  return character;
};

let storeCharacter = (character) => {
  localStorage.setItem("character", JSON.stringify(character));
};

let retreiveCharacter = () => {
  return JSON.parse(localStorage.getItem("character"));
};

generateButton.addEventListener('click', e => {
  if (characterGenerated == false) {
    setCharSheetDom();
  };
  if (document.body.contains(natSelect)) {
    attButtonsDiv.removeChild(natSelect);
  };
  createAttButtons();
  attSwapped = false;
  attReplaced = false;
  natSelectReplaced = false;
  characterGenerated = true;
  let character = randomizeAll();
  setHistory(character);
});

///Get Sex & Ancestry Values
let getSexValue = () => {
  for (let i = 0; i < sexRadios.length; i++) {
    if (sexRadios[i].checked) {
      let sexValue = sexRadios[i].value;
      return sexValue;
    };
  };
};

let getAncestryValue = () => {
  for (let i = 0; i < ancestryRadios.length; i++) {
    if (ancestryRadios[i].checked) {
      let ancestryValue = ancestryRadios[i].value;
      return ancestryValue;
    };
  };
};

//Set Attributes - Add to random.js
let setAttributes = () => {
  let attributes = {
    "combat": [rollxd10(3) + 25, ],
    "brawn": [rollxd10(3) + 25, ],
    "agility": [rollxd10(3) + 25,],
    "perception": [rollxd10(3) + 25,],
    "intelligence": [rollxd10(3) + 25,],
    "willpower": [rollxd10(3) + 25,],
    "fellowship": [rollxd10(3) + 25,],
  };
  setBaseBonuses(attributes);
  return attributes;
};

let setBaseBonuses = (attributes) => {
  for (const [_key, value] of Object.entries(attributes)) {
    value[1] = Number(String(value[0]).charAt(0));
  };
};

let swapReplaceAtt = () => {
  let attributeChange = changeAttributes();
  let character = retreiveCharacter();
  switch (true) {
    case (attSwapped):
      [character.attributes[attributeChange[0]], character.attributes[attributeChange[1]]] =
        [character.attributes[attributeChange[1]], character.attributes[attributeChange[0]]];
    break;
    case (attReplaced):
      character.attributes[attributeChange[0]][0] = 42;
    break;
    case (natSelectReplaced):
      character.attributes[attributeChange[0]][0] = 55;
    break;
  };
  setBaseBonuses(character.attributes);
  setAncestryBonuses(character.ancestry, character.attributes);
  setAttributeDom(character);
  storeCharacter(character);
};

let changeAttributes = () => {
  let attributeChange = [];
  for (let i = 0; i < attributeCheck.length; i++) {
    if (attributeCheck[i].checked == true) {
      attributeChange.push(attributeCheck[i].id);
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

//Set Ancestry - Add to random.js
let setAncestry = (ancestryValue) => {
  if (ancestryValue == 'nonhuman') {
    return ancestryArr[Math.floor(Math.random() * ancestryArr.length)];
  } else if (ancestryValue == 'any') {
    return phbAncestryArr[Math.floor(Math.random() * phbAncestryArr.length)];
  } else {
    return 'Human';
  };
};

let setAncestryBonuses = (ancestry, attributes) => {
  switch (ancestry) {
    case ('Dwarf'):
      attributes["brawn"][1] += 1;
      attributes["combat"][1] += 1;
      attributes["willpower"][1] += 1;
      attributes["agility"][1] -= 1;
      attributes["fellowship"][1] -= 1;
      attributes["perception"][1] -= 1;
    break;
    case ('Elf'):
      attributes["agility"][1] += 1;
      attributes["perception"][1] += 1;
      attributes["intelligence"][1] += 1;
      attributes["brawn"][1] -= 1;
      attributes["fellowship"][1] -= 1;
      attributes["willpower"][1] -= 1;
    break;
    case ('Gnome'):
      attributes["agility"][1] += 1;
      attributes["intelligence"][1] += 1;
      attributes["willpower"][1] += 1;
      attributes["brawn"][1] -= 1;
      attributes["combat"][1] -= 1;
      attributes["fellowship"][1] -= 1;
    break;
    case ('Halfling'):
      attributes["agility"][1] += 1;
      attributes["fellowship"][1] += 1;
      attributes["perception"][1] += 1;
      attributes["brawn"][1] -= 1;
      attributes["combat"][1] -= 1;
      attributes["intelligence"][1] -= 1;
    break;
    case ('Ogre'):
      attributes["brawn"][1] += 2;
      attributes["combat"][1] += 1;
      attributes["agility"][1] -= 2;
      attributes["perception"][1] -= 1;
    break;
    case ('Aztlan'): 
      attributes["agility"][1] += 1;
      attributes["brawn"][1] += 1;
      attributes["willpower"][1] += 1;
      attributes["combat"][1] -= 1;
      attributes["fellowship"][1] -= 1;
      attributes["perception"][1] -= 1;
    break;
    case ('Grendel'):
      attributes["brawn"][1] += 1;
      attributes["fellowship"][1] += 1;
      attributes["perception"][1] += 1;
      attributes["agility"][1] -= 1;
      attributes["intelligence"][1] -= 1;
      attributes["willpower"][1] -= 1;
    break;
    case ('Orx'):
      attributes["combat"][1] += 1;
      attributes["fellowship"][1] += 1;
      attributes["willpower"][1] += 1;
      attributes["agility"][1] -= 1;
      attributes["intelligence"][1] -= 1;
      attributes["perception"][1] -= 1;
    break;
    case ('Skrzzak'):
      attributes["agility"][1] += 1;
      attributes["intelligence"][1] += 1;
      attributes["perception"][1] += 1;
      attributes["brawn"][1] -= 1;
      attributes["fellowship"][1] -= 1;
      attributes["willpower"][1] -= 1;
    break;
    default:
      attributes["combat"][1] += 1;
      attributes["intelligence"][1] += 1;
      attributes["perception"][1] += 1;
      attributes["agility"][1] -= 1;
      attributes["fellowship"][1] -= 1;
      attributes["willpower"][1] -= 1;
    break;
  };
  return ancestry;
};

let setRandomAncestryTrait = (ancestry) => {
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

let setAncestralTrait = (ancestry) => {
  let ancestralTrait = setRandomAncestryTrait(ancestry);
  if (ancestralTrait == 'Mixed Heritage') {
    ancestralTrait += ', ' + setRandomAncestryTrait(ancestryArr[Math.floor(Math.random() * ancestryArr.length)]);
  } else if (ancestralTrait == 'Natural Selection') {
    natSelect.appendChild(natSelectText);
    attButtonsDiv.insertBefore(natSelect, attButtonsDiv.firstChild);
  } else {
    null
  };
  return ancestralTrait;
};

//Set Archetype, Profession, Trappings - Add to random.js
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
      profession = 12;
      break;
    case (d100 <= 95):
      profession = 13;
      break;
    case (d100 <= 100):
      profession = 14;
      break;
  };
  profession = mgProfessonObj[archetype][profession];
  return profession;
};

//Set Birth Season & Dooming - Add to random.js
let setSeason = () => seasonArr[Math.floor(Math.random() * seasonArr.length)];

let setDooming = (birthSeason) => doomingArr[seasonArr.indexOf(birthSeason)][Math.floor(Math.random() * 24)];

//Set Age & Distinguishing Marks - Add to random.js
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
  let marks = [];
  switch (age) {
    case ('adult'):
      marks[0] = markArr[rolld100()];
      break;
    case ('middle aged'):
      setTwoMarks(marks);
      break;
    case ('elderly'):
      setTwoMarks(marks)
      marks[2] = markArr[rolld100()];
      if ((marks[0] == marks[2]) || (marks[1] == marks[2])) {
        while ((marks[0] == marks[2]) || (marks[1] == marks[2])) {
          marks[2] = markArr[rolld100()];
        };
      };
      break;
    default:
      null;
  };
  return marks;
};

let setTwoMarks = (marks) => {
  marks[0] = markArr[rolld100()];
  marks[1] = markArr[rolld100()];
  if (marks[0] == marks[1]) {
    while (marks[0] == marks[1]) {
      marks[1] = markArr[rolld100()];
    };
  };
}

//Set Build, Height & Weight - Add to random.js
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

//Set hair color - Add to random.js
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

//Set eye color - Add to random.js
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

//Set Upbringing, Social Class & Cash - Add to random.js
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

//Set Drawback - Add to random.js
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
    null;
  };
};

//Set Alignment - Add to random.js
let setAlignment = () => {
  let alignment = { "order": "", "chaos": ''}
  if (separateAlignmentCheck.checked == true) {
    alignment["order"] = alignmentsObj.order[Math.floor(Math.random() * 24)];
    alignment["chaos"] = alignmentsObj.chaos[Math.floor(Math.random() * 24)];
  } else { 
    let pair = Math.floor(Math.random() * 24);
    alignment["order"] = alignmentsObj.order[pair];
    alignment["chaos"] = alignmentsObj.chaos[pair];
  };
  return alignment;
};
