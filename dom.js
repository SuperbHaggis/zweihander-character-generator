//DOM Elements
let attributeCheckNew;
let attCheckLabelNew;

//Functions
export function setCharacterDom() {
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

export function setNPCDom() {

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

    attChecksDiv.appendChild(attributeCheckNew);
    attChecksDiv.appendChild(attCheckLabelNew);
    attChecksDiv.appendChild(lineBreak);
  };
};

//Controls
export const nonhumanCheck = document.getElementById('nonhuman-check');
export const separateAlignmentCheck = document.getElementById('separate-alignment-check');
export const drawbackCheck = document.getElementById('drawback-check');
export const generateButton = document.getElementById('generate');
export const generateNPCButton = document.getElementById('generate-npc');
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
