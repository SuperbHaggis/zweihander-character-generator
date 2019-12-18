let d100;
let d10;
let sum = 0;
let nonHuman;
nonHuman == false;
let freeAlignment;
freeAlignment == false;
const trappings = [
  [],
  [],
  [],
  [],
  [],
  [],
]

rollD100 = () => {
  d100 =  Math.floor(Math.random() * 100) + 1;
};
rolld10 = () => {
  d10 = Math.floor(Math.random() * 10) + 1;
}

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
  setAge();
  setBuild();
  //setHeightWeight();
  setAlignment();
};

//Set Attributes
roll3d10 = () => {
  sum = 0;
  for (i = 0; i < 3; i++) {
    rolld10();
    //console.log(d10);
    sum += d10;
  }
  return sum;
};

let primaryAttributes = [];
let primaryBonuses = [];
//let combat;
//let cb;
//let brawn;
//let bb;
//let agility;
//let ab;
//let perception;
//let pb;
//let intelligence;
//let ib;
//let willpower;
//let wb;
//let fellowship;
//let fb;

setAttributes = () => {
  for (j = 0; j < 7; j++) {
    primaryAttributes[j] = (roll3d10() + 25 + '%');
    primaryBonuses[j] = primaryAttributes[j].charAt(0);
  }
  primaryBonuses = primaryBonuses.map(v => parseInt(v, 10));
  console.log(primaryAttributes);
  console.log(primaryBonuses);
}

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
  if (nonHuman == true) {
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
  console.log(ancestralTrait);
};
setAncestryTrait = () => {
  //select appropriate traits based on weights (5 at 8%, 6 at 7%, 1 at 6%)
}


//Set Birth Season & Dooming
let seasonArr = ['Spring', 'Summer', 'Autumn', 'Winter',];
setSeason = () => {
  let birthSeason = seasonArr[Math.floor(Math.random() * seasonArr.length)];
  console.log(birthSeason);
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
  let dooming = doomingArr[seasonArr.indexOf(birthSeason)][Math.floor(Math.random() * 24)];
  console.log(dooming);
  return dooming;
}

//Set Complexion
let complexionArr = ['Pale', 'Fair', 'Light', 'Light tan', 'Tan', 'Dark tan',
  'Light brown', 'Brown', 'Dark brown', 'Ebony',];
setComplexion = () => {
  let complexion = complexionArr[Math.floor(Math.random() * complexionArr.length)];
  console.log(complexion);
  return complexion;
}

//Set hair color
let hairArr = ['']

//Set Age
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
  console.log(age);
  return age;
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
  console.log(socialClass);
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
  console.log(upbringing, favoredPrimary);
  return (upbringing, favoredPrimary);
};

//Set Archetype & Profession
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
  console.log(archetype);
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
  console.log(archetype, profession, profArr[archetype][profession]);
  profession = profArr[archetype][profession];
  return profession;
};

//Set Build, Height & Weight
buildArr = ['Frail', 'Slender', 'Normal', 'Husky', 'Corpulent',];

setBuild = () => {
  let build = buildArr[Math.floor(Math.random() * buildArr.length)];
  console.log(build);
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
  if (freeAlignment == true) {
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
  console.log(alignment);
};
