const pangrams = [
  "Pijamalı hasta yağız şoföre çabucak güvendi.",
  "The quick brown fox jumps over the lazy dog.",
  "Jived fox nymph grabs quick waltz.",
  "Glib jocks quiz nymph to vex dwarf.",
  "Sphinx of black quartz,judge my vow.",
  "How vexingly quick daft zebras jump!",
  "The five boxing wizards jump quickly.",
  "Jackdaws love my big sphinx of quartz.",
  "Pack my box with five dozen liquor jugs.",
];

function getRandomPangram() {
  return pangrams[Math.floor(Math.random() * pangrams.length)];
}

export default getRandomPangram;
