let d100;
let ancestryCheck;
ancestryCheck == false;
const trappings = [
  [],
  [],
  [],
  [],
  [],
  [],
]
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

rollD100 = () => {
  d100 =  Math.floor(Math.random() * 100) + 1;
};

//Randomize All
randomizeAll = () => {
  setAge();
  setSocialClass();
  setUpbringing();
  setProfession();
  setBuild();
  setHeightWeight();

  if (ancestryCheck == true) {
    setAncestry();
  };
};

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
  console.log(d100, age);
  return age;
};

//Set Ancestry
setAncestry = () => {
  rollD100();
  switch (true) {
    case (d100 <= 20):
      ancestry = 'Dwarf';
      break;
    case (d100 <= 40):
      ancestry = 'Elf';
      break;
    case (d100 <= 60):
      ancestry = 'Gnome';
      break;
    case (d100 <= 80):
      ancestry = 'Halfling';
      break;
    case (d100 <= 100):
      ancestry = 'Ogre';
      break;
    default:
      ancestry = 'Human';
      break;
  };
  console.log(d100, ancestry);
  return ancestry;
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
  console.log(d100, socialClass);
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
  console.log(d100, upbringing, favoredPrimary);
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
  console.log(d100, archetype);
  return archetype;
};

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
  console.log(d100, archetype, profession, profArr[archetype][profession]);
  profession = profArr[archetype][profession];
  return profession;
};

//Set Build, Height & Weight
setBuild = () => {
  rollD100();
  switch (true) {
    case (d100 <= 20):
      build = 'Frail';
      buildNum = 0;
      break;
    case (d100 <= 40):
      build = 'Slender';
      buildNum = 1;
      break;
    case (d100 <= 60):
      build = 'Normal';
      buildNum = 2;
      break;
    case (d100 <= 80):
      build = 'Husky';
      buildNum = 3;
      break;
    case (d100 <= 100):
      build = 'Corpulent';
      buildNum = 4;
      break;
  };
  console.log(d100, build);
  return build, buildNum;
};

setHeightWeight = () => {

};