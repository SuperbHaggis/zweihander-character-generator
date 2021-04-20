//DOM Elements
let attributeCheckNew;
let attCheckLabelNew;

//Functions
export let setHistory = (character) => {
  setAttributeDom(character);

  history0.textContent = `This character is 
  ${(character["age"].charAt(0) == 'm') || (character["age"].charAt(0) == 'y') ? 'a' : 'an'}
  ${character["age"]} ${character["ancestry"]}
  ${character["profession"]}.`;

  history1.textContent = `They are ${character["height"]}, ${character["weight"]}
  & of a ${character["build"]} build type. They have
  ${character["complexion"]} skin, with ${character["hair"]} hair and ${character["eyes"]} eyes.`;

  character["marks"]
  if (character["age"] == 'young') {
    history2.textContent = '';
  } else if (character["age"] == 'adult') {
    history2.textContent = `Distinguishing Mark: ${character.marks[0]}`;
  } else if (character["age"] == 'middle aged') {
    history2.textContent = `Distinguishing Marks: ${character.marks[0]} & ${character.marks[1]}`;
  } else if (character["age"] == 'elderly') {
    history2.textContent = `Distinguishing Marks: ${character.marks[0]}, ${character.marks[1]}, ${character.marks[2]}`;
  };

  history3.textContent = `This character was born in ${character["season"]},
    is of the ${character["class"]} social class & of
    ${(character["upbringing"].charAt(0) == 'I') || (character["upbringing"].charAt(0) == 'O') ? 'an' : 'a'}
    ${character["upbringing"]} upbringing.`;

  if (drawbackCheck.checked == true) {
    history4.textContent = `Dooming: "${character["dooming"]}"
      Drawback: ${character["drawback"]}.`;
  } else {
    history4.textContent = `Dooming: "${character["dooming"]}."`
  };

  history5.textContent = `Ancestral Trait: ${character["ancestral-trait"]}`

  history6.textContent = `Alignment: ${character["alignment"].order} & ${character["alignment"].chaos}`;

  cashP.textContent = `Starting Cash: ${character["cash"]}`;
  trappingsP.textContent = character["trappings"].join(", ");
};

export let setAttributeDom = (character) => {
  for (const [key, value] of Object.entries(character["attributes"])) {
    for (let i = 0; i < 7; i++) {
      attributeCheck[i].value == key ? attCheckLabel[i].innerHTML = `${key.toUpperCase()}: 
        ${value[0]}% (${value[1]})` :
        null;
    };
  };
};

export function setCharSheetDom() {
  attributeTitle.appendChild(attTitleText);
  attributesDiv.insertBefore(attributeTitle, attributesDiv.firstChild);
  
  createAttributeChecks();

  trappingsTitle.appendChild(trappingsTitleText);
  gearDiv.insertBefore(trappingsTitle, gearDiv.firstChild);

  traitAlignmentTitle.appendChild(traitAlignmentTitleText);
  traitAlignmentDiv.insertBefore(traitAlignmentTitle, traitAlignmentDiv.firstChild);

  historyTitle.appendChild(histTitleText);
  historyDiv.insertBefore(historyTitle, historyDiv.firstChild);
};

export function createAttButtons() {
  attributeReplace.appendChild(attReplaceText);
  attButtonsDiv.appendChild(attributeReplace);
  attributeSwap.appendChild(attSwapText);
  attButtonsDiv.appendChild(attributeSwap);
};

export function createAttributeChecks() {
  let attributeLabels = [
    'combat',
    'brawn',
    'agility',
    'perception',
    'intelligence',
    'willpower',
    'fellowship',
  ];
  for (let i = 0; i < 7; i++) {
    attributeCheckNew = document.createElement('INPUT');
    attCheckLabelNew = document.createElement('LABEL');
    let lineBreak = document.createElement('BR');

    attributeCheckNew.type = 'checkbox';
    attributeCheckNew.name = 'attribute';
    attributeCheckNew.value = attributeLabels[i];
    attributeCheckNew.id = attributeLabels[i];

    attChecksDiv.appendChild(attributeCheckNew);
    attChecksDiv.appendChild(attCheckLabelNew);
    attChecksDiv.appendChild(lineBreak);
  };
};

//Controls
export const ancestryRadios = document.getElementsByName('ancestry');
export const sexRadios = document.getElementsByName('sex');
export const separateAlignmentCheck = document.getElementById('separate-alignment-check');
export const drawbackCheck = document.getElementById('drawback-check');
export const generateButton = document.getElementById('generate');
export const mgCheck = document.getElementById('main-gauche-check');

//Attributes
export const attributesDiv = document.getElementById('attributes');
export const attChecksDiv = document.getElementById('attribute-checkboxes');
export const attButtonsDiv = document.getElementById('attribute-buttons');

export const attributeTitle = document.createElement('H3');
export const attTitleText = document.createTextNode('Attributes');

export const attributeCheck = attributesDiv.getElementsByTagName('INPUT');
export const attCheckLabel = document.getElementsByTagName('LABEL');

export const attributeSwap = document.createElement("BUTTON");
export const attributeReplace = document.createElement("BUTTON");
export const natSelect = document.createElement("BUTTON");
export const attSwapText = document.createTextNode('Swap Values');
export const attReplaceText = document.createTextNode('Replace with 42%');
export const natSelectText = document.createTextNode("Replace with 55%");

//Gear, Traits & Alignment 
export const gearTraitAlignmentDiv = document.getElementById('gear-trait-alignment');
export const gearDiv = document.getElementById('gear');
export const traitAlignmentDiv = document.getElementById('trait-alignment');

export const trappingsTitle = document.createElement('H3');
export const trappingsTitleText = document.createTextNode('Money & Trappings');

export const cashP = document.querySelector('#cash-p');
export const trappingsP = document.querySelector('#trappings');

export const traitAlignmentTitle = document.createElement('H3');
export const traitAlignmentTitleText = document.createTextNode('Ancestral Trait & Alignment');

export const history5 = document.querySelector('#history5');
export const history6 = document.querySelector('#history6');

//History
export const historyDiv = document.getElementById('history');

export const historyTitle = document.createElement('H3');
export const histTitleText = document.createTextNode('History');

export const history0 = document.querySelector('#history0');
export const history1 = document.querySelector('#history1');
export const history2 = document.querySelector('#history2');
export const history3 = document.querySelector('#history3');
export const history4 = document.querySelector('#history4');
