//Global Variables
let d100;
let d10;
let sum = 0;
let dooming;
let complexion;
let build;
let birthSeason;
let trappings;
let drawback;
let marks = {};

//DOM Elements
let nonhumanCheck = document.getElementById('nonhuman-check');
let freeAlignmentCheck = document.getElementById('free-alignment-check');
let drawbackCheck = document.getElementById('drawback-check');
let generateButton = document.getElementById('generate');
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
rollD100 = () => {
  d100 =  Math.floor(Math.random() * 100) + 1;
};
rolld10 = () => {
  d10 = Math.floor(Math.random() * 10) + 1;
}
roll3d10 = () => {
  sum = 0;
  for (i = 0; i < 3; i++) {
    rolld10();
    //console.log(d10);
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
  //hair
  //eyes
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

generate.addEventListener('click', e => {
  randomizeAll();
});

//Set Attributes
let primaryAttributes = [];
let primaryBonuses = [];
setAttributes = () => {
  for (j = 0; j < 7; j++) {
    primaryAttributes[j] = (roll3d10() + 25 + '%');
    primaryBonuses[j] = primaryAttributes[j].charAt(0);
  }
  primaryBonuses = primaryBonuses.map(v => parseInt(v, 10));
  console.log(primaryAttributes);
  console.log(primaryBonuses);
};

//Set Ancestry
let ancestryArr = ['Dwarf', 'Elf', 'Gnome', 'Halfling', 'Ogre',];
let ancestralTraits = [
  ['Dauntless', 'Manifest Destiny', 'Mixed Heritage', 'Mountain Amongst Men',
    'Natural Selection', 'Blessing in Disguise', 'Danger Sense', 'Esoteric Memory',
    'Grim Resolve', 'Seventh Sense', 'Fortune\'s wheel', 'Noble Savage',],
  [],
  [],
  [],
  [],
  [],
];
let traitWeights = [8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 6,];
let ancestry = 'Human';
let ancestralTrait;
setAncestry = () => {
  ancestryP.textContent = 'Ancestry: ';
  if (nonhumanCheck.checked == true) {
    ancestry = ancestryArr[Math.floor(Math.random() * ancestryArr.length)];
  }
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
  console.log(ancestralTrait);
};
setAncestryTrait = () => {
  //select appropriate traits based on weights (5 at 8%, 6 at 7%, 1 at 6%)
};


//Set Birth Season & Dooming
let seasonArr = ['Spring', 'Summer', 'Autumn', 'Winter',];
setSeason = () => {
  seasonP.textContent = 'Season of Birth: ';
  birthSeason = seasonArr[Math.floor(Math.random() * seasonArr.length)];
  console.log(birthSeason);
  seasonP.textContent = 'Season of Birth: ' + birthSeason;
  return birthSeason;
};

let doomingArr = [
  ['Pride comes before a fall', 'Ivy will claw at your skin and prick like a rose',
    'Health is not always healthy', 'Still waters run deep',
    'The forest will strike back when the campfire is low',
    'Do not pluck low-hanging fruit', 'The serpent is in the garden',
    'Climb not the mighty oak', 'Beware fairy rings and standing stones',
    'The land will reclaim what is hers', 'Do not stare directly into the light',
    'Good intentions create bad situations', 'Do not accept trust lightly',
    'There is always another problem', 'Light burns just as much as it heals',
    'Radiance can’t illuminate all', 'Charity will cause your end',
    'Underestimate no one', 'Birth is but the start of death',
    'Provide no succor to the blind man', 'Do not pick up discarded coins',
    'Twice for poison, thrice for a kiss', 'Fate is cruel, but ironic',
    'A trick is not an illusion', 'You will be stabbed by your own knife',],
  ['Your end will be at the head of a hammer', 'You will see your own hubris and end your life',
    'Those you love will kill you', 'Beware the comet’s warning',
    'They will come as twins and leave as triplets', 'You will die trying to save someone you love',
    'Beware a lover scorned', 'You will witness the end, then go into it',
    'The heathen will cut you down', 'Your final moments will be full of divine pain',
    'Your flame shall consume you', 'Mercy will be your downfall',
    'You will burn brightly, then be snuffed out', 'The unlit path is the most dangerous',
    'Iron will bend under heat', 'Respect power, for it does not respect you', 
    'Never leave a fire burning', 'Never turn your back on a foe', 
    'Your embers shall smolder', 'The sun can be a cruel friend', 
    'Death comes from above and below', 'Lightning sometimes does strike twice', 
    'A squall occurs before a storm', 'The eye of a storm is just a reprieve', 
    'The heavens will open, angry and bright',],
  ['A murder of another will herald thine death', 'Thy skin shall darken as if soaked in ink',
    'Do not cross a freshly dug tomb', 'You shall see thine death twice',
    'Up from the canyon, soars the raven', 'Sorrow will fill your heart at death',
    'You shall not see the end', 'One step forward, two steps back',
    'The jackdaw is a false omen', 'A visage will haunt you to your grave',
    'The Eye will look upon you with scorn', 'You will die in a pool of blood, but it will not be yours',
    'Your end will not be clean', 'Sickness will be your downfall',
    'The stench of the grave follows you', 'New beginnings herald sudden ends',
    'The Abyss also gazes back', 'The shadows stalk hungrily',
    'Three flies bring your doom', 'Beware the black stallion',
    'Do not fold, always stay', 'Confusion will kill more than you',
    'Do not be fooled by appearances', 'Avoid the exotic when possible',
    'Do not push for more, as you will get it',],
  ['Beware the toothless hound', 'Warm winters bring hard frost',
    'Do not trust what you can’t see', 'Blood will be upon your hands',
    'The oldest are the strongest', 'Be wary of false friends',
    'Numbers overwhelm might', 'Your killer will not know your name',
    'At times, being found is worse than being lost',
    'Do not tread upon thick ice nor thin', 'Iron is weak, gold is strong',
    'Your left eye will not see the truth', 'Revenge is upon you',
    'Absolute power corrupts absolutely', 'Being immovable is not always a boon',
    'Some things, man should not know', 'Justice is blind, deaf and dumb',
    'Six of one, half a dozen of the other', 'Fear change, as it changes you',
    'The gavel will ring twice', 'The stars can lead you astray',
    'The depths are crushing, the shallows inviting', 'From the cold, something eyes you hungrily',
    'You, too can be touched by the unknown', 'Do not fly too close to the stars',],
];
setDooming = (birthSeason) => {
  doomingP.textContent = 'Dooming: ';
  dooming = doomingArr[seasonArr.indexOf(birthSeason)][Math.floor(Math.random() * 24)];
  console.log(dooming);
  doomingP.textContent = 'Dooming: ' + dooming;
  return dooming;
};

//Set Complexion
let complexionArr = ['Pale', 'Fair', 'Light', 'Light tan', 'Tan', 'Dark tan',
  'Light brown', 'Brown', 'Dark brown', 'Ebony',];
setComplexion = () => {
  complexionP.textContent = 'Complexion: ';
  complexion = complexionArr[Math.floor(Math.random() * complexionArr.length)];
  console.log(complexion);
  complexionP.textContent = 'Complexion: ' + complexion;
  return complexion;
};

//Set hair color
let hairArr = ['']

//Set Age & Distinguishing Marks
setAge = () => {
  rollD100();
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
  ageP.textContent = 'Age Group: ';
  console.log(age);
  ageP.textContent = 'Age Group: ' + age;
  return age;
};

markArr = ['Abnormally white teeth', 'Abundance of freckles on face',
            'Acne-scarred face', 'Additional toes or fingers', 'Almond-shaped eyes',
            'Asexual appearance', 'Ashy elbows', 'Balding pate', 'Beaded mustachio',
            'Beady eyes', 'Beauty mark on face', 'Big ears', 'Blood-shot eyes',
            'Bow-legged walk', 'Branded with cattle iron', 'Broken nose',
            'Buck-toothed or snaggle-toothed', 'Bulging eyes', 'Burn scars on face and arms',
            'Bushy eyebrows', 'Carefully-groomed beard', 'Cherubic face', 'Clammy hands',
            'Claw marks over face', 'Covered in black moles', 'Curly locks of hair',
            'Devilish goatee', 'Different colored eyes', 'Dimpled cheeks', 'Doll-like face',
            'Drooping eye', 'Dry, flaking skin', 'Ear half-missing', 'Embarrassing acne scars',
            'Embarrassing tattoo on face', 'Excessive body hair', 'Eyes too far apart',
            'False finger', 'Farmer\'s tan', 'Glasgow grin', 'Golden lock of hair',
            'Hare lip', 'Hooked nose', 'Horse-faced', 'Humpbacked', 'Incredibly beautiful',
            'Itchy scabies bites', 'Jaundiced complexion', 'Lanky hair', 'Large and hairy mole',
            'Large nose', 'Large red birthmark on arms', 'Lazy eye', 'Leathery countenance',
            'Lichtenberg scar', 'Long eyelashes', 'Long mustachio', 'Long sideburns',
            'Milky eye', 'Mismatched eye color', 'Missing an eyebrow', 'Missing fingers',
            'Nervous tic', 'Older-looking face', 'Painted beard', 'Pallid countenance',
            'Patch of white hair', 'Perfect posture', 'Perpetual sneer',
            'Perpetually deep frown', 'Piercing eyes', 'Pigeon-toed stance', 'Pot belly',
            'Pox scars all over body', 'Pronounced brow', 'Purple bags beneath eyes',
            'Rancid breath', 'Rash of pimples', 'Rheumy eyes', 'Six-fingered hand',
            'Slouchy posture', 'Spiked mohawk', 'Squinting eyes or false eye patch',
            'Steely gaze', 'Strong jaw', 'Sunburn scars', 'Sunken eyes', 'Tanned, leathery skin',
            'Tarred and feathered', 'Terribly crooked teeth', 'Vacant expression',
            'Veteran\'s nose', 'Vulgar tattoo', 'Weak chin', 'Wears spectacles',
            'Webbed hands and feet', 'Widow\'s peak', 'Wind-chapped lips',
            'Yellow scum on teeth', 'Yellowed fingernails and toenails'];
setMarks = () => {
  marks[1] = null;
  marks[2] = null;
  marks[3] = null;
  mark1.textContent = 'Distinguishing Mark: ';
  mark2.textContent = 'Distinguishing Mark: ';
  mark3.textContent = 'Distinguishing Mark: ';
  switch (age) {
    case ('Adult'):
      rollD100();
      marks[1] = markArr[d100];
      updateMarks();
    break;
    case ('Middle Aged'):
      for (i = 1; i < 3; i++) {
        rollD100();
        marks[i] = markArr[d100];
      };
      updateMarks();
    break;
    case ('Elderly'):
      for (i = 1; i < 4; i++) {
        rollD100();
        marks[i] = markArr[d100];
      };
      updateMarks();
    break;
    default:
      console.log(age + ' characters receive no marks');
  };
  console.log(marks);
};
updateMarks = () => {
  mark1.textContent = 'Distinguishing Mark: ' + marks[1];
  marks[2] != null ? mark2.textContent = 'Distinguishing Mark: ' + marks[2] : null;
  marks[3] != null ? mark3.textContent = 'Distinguishing Mark: ' + marks[3] : null;
};

//Set Social Class
setSocialClass = () => {
  rollD100();
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
  classP.textContent = 'Social Class: ';
  console.log(socialClass);
  classP.textContent = 'Social Class: ' + socialClass;
  return socialClass;
};

//Set Upbringing
setUpbringing = () => {
  rollD100();
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
  upbringingP.textContent = 'Upbringing: ';
  console.log(upbringing + ', ' + favoredPrimary);
  upbringingP.textContent = 'Upbringing: ' + upbringing;
  return (upbringing, favoredPrimary);
};

//Set Archetype, Profession, Trappings
setArchetype = () => {
  rollD100();
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
const profArr = [
  ['Adherent', 'Anchorite', 'Antiquarian', 'Apothecary',
    'Astrologer', 'Diabolist', 'Engineer', 'Informer',
    'Investigator', 'Monk', 'Preacher', 'Scribe',],
  ['Artisan', 'Barber Surgeon', 'Boatman', 'Camp Follower',
    'Cheapjack', 'Coachman', 'Doomsayer', 'Jailer',
    'Laborer', 'Peasant', 'Rat Catcher', 'Servant',],
  ['Beggar', 'Burglar', 'Charlatan', 'Footpad',
    'Gambler', 'Graverobber', 'Guttersnipe', 'Highwayman',
    'Prostitute', 'Smuggler', 'Vagabond', 'Vigilante',],
  ['Animal Tamer', 'Bailiff', 'Bonepicker', 'Bounty Hunter',
    'Gamekeeper', 'Hedgewise', 'Old Believer', 'Outrider',
    'Pilgrim', 'Reeve', 'Slayer', 'Trapper',],
  ['Anarchist', 'Courtier', 'Cultist', 'Entertainer',
    'Envoy', 'Fop', 'Jester', 'Provocateur',
    'Racketeer', 'Raconteur', 'Rake', 'Valet',],
  ['Berserker', 'Bravo', 'Buccaneer', 'Dragoon',
    'Hedge Knight', 'Man-At-Arms', 'Militiaman', 'Pit Fighter',
    'Pugilist', 'Sellsword', 'Squire', 'Watchman',],
];
setProfession = () => {
  setArchetype();
  rollD100();
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
const trappingsArr = [
  ['Black lotus', 'Bottle of leeches', 'Coin purse', 'Dirk',
    'Fine clothing', 'Holy symbol', 'Loose robes', 'Quicksilver',
    'Royal water', 'Shoulder bag', 'Smelling salts (3)',
    ['soft shoes', 'leather sandals'], 'Writing kit',
    ['Cudgel', 'Staff', 'Throwing knives (3) with Bandolier',],],
  ['Bandages (3)', 'Bottle bomb', 'Grave root', 'Holy symbol',
    ['Leather sandals', 'Heavy boots'], 'Ruck sack', 'Shiv',
    'Simple attire', 'Warm vest',
    ['Shepherd\'s sling with sling stones (9)', 'Splitting maul', 'Threshing flail',],],
  ['Antivenom', ['Dark clothes', 'Tattered rags',], 'Folkbane (3)',
    'Gaff bag', ['Garish attire', 'Secondhand attire'], 'Holy symbol',
    'Lock picks', 'Mantle', 'Soft shoes', 'Stiletto',
    ['Blackjack', 'Garrote', 'Flintlock pistol with gunpowder & shot (6)'],],
  ['Animalbane (3)', 'Antivenom', 'Backpack', 'Bullwhip',
    'Heavy boots', 'Holy symbol', 'Suit of fur/hide armor', 'Survival kit',
    'Torches (3)', 'Traveling clothes', 'Waterskin', 'Wilderness cloak',
    'Wolfsbane', ['Fire-hardened spear', 'Hunting bow with arrows (9) & quiver',
      'Woodsman\'s axe'],],
  ['Coin purse', 'Fancy shoes', 'Fashionable clothing', 'Foppish hat',
    'Holy symbol', 'Knuckleduster', 'Mandrake root (3)', 'Mantle',
    'Neck ruff', 'Shoulder bag', 'Writing kit', ['Throwing knives (3) with bandolier',
      'Rapier', 'Walking cane (improvised hand weapon'],],
  ['Fire-hardened spear', 'Heavy boots', 'Lantern', 'Laudanum (3)',
    'Military attire', 'Oil pot', 'Red cap mushrooms', 'Rucksack',
    'Suit of leather armor', 'Tincture (3)', 'Wooden shield',
    ['Arbalest crossbow with bolts (9) & quiver', 'Mortuary Sword', 'Pike'],],
];
setTrappings = () => {
  trappingsP.textContent = 'Trappings: ';
  trappings = trappingsArr[archetype].join(', ');
  //need to randomize or select from nested arrays
  trappingsP.textContent = 'Trappings: ' + trappings;
}

//Set Build, Height & Weight
buildArr = ['Frail', 'Slender', 'Normal', 'Husky', 'Corpulent',];
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
orderArr = ['Adaptation', 'Ambition', 'Candor', 'Charity', 'Compassion', 
            'Cunning', 'Dignity', 'Diplomacy', 'Duty', 'Enlightenment', 
            'Ferocity', 'Gentility', 'Gravitas', 'Heroism', 'Humility', 
            'Impiety', 'Independence', 'Mystery', 'Pride', 'Romanticism', 
            'Skepticism', 'Sophistication', 'Wisdom', 'Wit', 'Zeal'];
chaosArr = ['Mayhem', 'Tyranny', 'Cruelty', 'Pity', 'Melancholy', 
            'Deceit', 'Vehemence', 'Hypocrisy', 'Fatalism', 
            'Detachment', 'Hatred', 'Cowardice', 'Vanity', 'Martyrdom', 
            'Incompetence', 'Heresy', 'Rebellion', 'Exclusion', 'Arrogance', 
            'Lechery', 'Cynicism', 'Indulgence', 'Rancor', 'Scorn', 'Fanaticism'];
setAlignment = () => {
  if (freeAlignmentCheck.checked == true) {
    alignment = { 
      order: orderArr[Math.floor(Math.random() * 24)], 
      chaos: chaosArr[Math.floor(Math.random() * 24)],
    };
  } else { 
      pair = Math.floor(Math.random() * 24);
      alignment = {
      order: orderArr[pair],
      chaos: chaosArr[pair],
    };
  }
  alignmentP.textContent = 'Alignment: ';
  console.log(alignment.order + ', ' + alignment.chaos);
  alignmentP.textContent = 'Alignment: ' + alignment.order + ', ' + alignment.chaos;
};

//Set Drawback
setDrawback = () => {
  if (drawbackCheck.checked == true) {
    rollD100();
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