/*
 * Orsay scavenger-hunt content.
 *
 * This is the ONLY file you need to edit to change the hunt. Each item:
 *   id     – stable short id (used for the image filename and saved progress)
 *   title  – kid-friendly name, read aloud by a grown-up
 *   find   – the "can you see…?" spotting challenge
 *   where  – a gentle location hint (rooms get rehung, so keep it loose)
 *   fact   – one short, delightful fact about the artist/painting
 *   color  – background colour for the placeholder until a real photo is added
 *   icon   – emoji shown on the placeholder
 *
 * Real photos go in images/<id>.jpg (see images/SOURCES.md + fetch-images.sh).
 * If a photo is missing, the app shows a nice coloured placeholder instead.
 */
window.HUNT = {
  title: "Orsay, Can You See?",
  subtitle: "A treasure hunt for art detectives 🔎",
  items: [
    {
      id: "clock",
      title: "The Giant Clock",
      find: "Can you find the HUGE clock? You can see Paris right through it!",
      where: "On the upper floor — the museum used to be a train station!",
      fact: "Long ago, trains came right inside this building. The big clock told travellers when to hop aboard.",
      color: "#c9a227",
      icon: "🕰️",
    },
    {
      id: "little-dancer",
      title: "The Little Ballerina",
      find: "Find the little dancer statue. She is wearing a REAL cloth tutu!",
      where: "In a glass case, near the other Degas dancers.",
      fact: "Edgar Degas loved ballerinas. This little dancer is over 140 years old and still stands on her tiptoes.",
      color: "#b5838d",
      icon: "🩰",
    },
    {
      id: "ballet-class",
      title: "Dancers in Fluffy Skirts",
      find: "How many ballerinas can you count in this painting?",
      where: "Upstairs with the other Degas dancers.",
      fact: "Degas painted dancers practising, yawning and scratching — not just performing on stage.",
      color: "#e5989b",
      icon: "💃",
    },
    {
      id: "poppies",
      title: "A Field of Red Flowers",
      find: "Find the lady with the umbrella and the little boy in the red poppies.",
      where: "Upstairs, under the big glass roof with the other Monet paintings.",
      fact: "Claude Monet painted outside, fast, to catch the sunshine before it moved.",
      color: "#e63946",
      icon: "🌺",
    },
    {
      id: "water-lilies",
      title: "A Pond Full of Flowers",
      find: "Can you spot the lily pads floating on the water?",
      where: "Near the other Monet paintings.",
      fact: "Monet had a real flower pond in his garden and painted it again and again.",
      color: "#457b9d",
      icon: "🪷",
    },
    {
      id: "starry-rhone",
      title: "Stars Over the River",
      find: "Find the twinkly stars and the yellow lights shining on the water.",
      where: "Upstairs, with the Van Gogh paintings.",
      fact: "Vincent van Gogh loved the night. He painted the stars sparkling on the river in Arles.",
      color: "#1d3557",
      icon: "🌟",
    },
    {
      id: "vangogh-selfportrait",
      title: "The Man with the Orange Beard",
      find: "Find the man looking at you. Can you see the swirly blue everywhere?",
      where: "With the other Van Gogh paintings.",
      fact: "Van Gogh painted himself a LOT — he couldn't afford to pay other people to model for him.",
      color: "#2a9d8f",
      icon: "🧑‍🎨",
    },
    {
      id: "bedroom-arles",
      title: "A Cozy Little Bedroom",
      find: "Count the pictures hanging on the bedroom wall. How many beds do you see?",
      where: "With the other Van Gogh paintings.",
      fact: "This was Van Gogh's own bedroom. He loved it so much he painted it three times!",
      color: "#e9c46a",
      icon: "🛏️",
    },
    {
      id: "moulin-galette",
      title: "People Dancing Outside",
      find: "Everyone is dancing and laughing! Can you find a little dog or a pretty hat?",
      where: "Upstairs with the bright, happy Renoir paintings.",
      fact: "Pierre-Auguste Renoir painted a sunny Sunday party. Look how the sunlight makes dots of light!",
      color: "#f4a261",
      icon: "🎉",
    },
    {
      id: "snake-charmer",
      title: "A Jungle at Night",
      find: "Can you spot the snake hiding in the dark jungle?",
      where: "On a lower floor — look for the mysterious dark painting.",
      fact: "Henri Rousseau never visited a real jungle. He imagined it all from plants and his dreams!",
      color: "#2d6a4f",
      icon: "🐍",
    },
    {
      id: "arearea",
      title: "Find the Orange Dog",
      find: "There's a little orange dog hiding in this painting. Can you see it?",
      where: "With the colourful Gauguin paintings.",
      fact: "Paul Gauguin sailed far away to a sunny island and painted with big, bright colours.",
      color: "#e76f51",
      icon: "🐕",
    },
    {
      id: "white-cat",
      title: "The Funny White Cat",
      find: "Find the white cat with the SUPER long legs and a big arched-up back!",
      where: "On a lower floor, with Bonnard and the Nabi painters.",
      fact: "Pierre Bonnard made the cat's legs extra long and stretchy on purpose, just to be funny. Look at its sly little smile!",
      color: "#d9a441",
      icon: "🐱",
    },
  ],
};
