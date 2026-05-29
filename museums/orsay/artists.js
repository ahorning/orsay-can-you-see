/*
 * "Learn before we go" collection — paintings grouped by artist.
 *
 * Used by both the study gallery and the guess-the-artist quiz.
 * All works are in the Musée d'Orsay, so she'll meet them again in person.
 *
 * Each artist:  id, name, face (emoji), color, fact (kid-friendly), works[]
 * Each work:    id (also the image filename), title, fact, color, icon
 *
 * Real photos go in images/<id>.jpg (see images/SOURCES.md). Missing photos
 * fall back to the coloured emoji placeholder.
 */
window.ARTISTS = {
  title: "Learn Before We Go",
  subtitle: "Get to know the artists of the Musée d'Orsay 🎨",
  artists: [
    {
      id: "monet",
      name: "Claude Monet",
      face: "🌅",
      color: "#457b9d",
      fact: "Monet painted outdoors, very fast, to catch the sunlight before it changed. Look for soft, dabby brushstrokes!",
      works: [
        { id: "poppies", title: "Poppy Field", icon: "🌺", color: "#e63946",
          fact: "A sunny walk through red poppies — find the lady with the umbrella." },
        { id: "water-lilies", title: "Blue Water Lilies", icon: "🪷", color: "#457b9d",
          fact: "Monet had a real lily pond and painted it again and again." },
        { id: "gare-saint-lazare", title: "The Gare Saint-Lazare", icon: "🚂", color: "#6d6875",
          fact: "A train station full of steam and smoke — just like the building the museum is in!" },
        { id: "rouen-cathedral", title: "Rouen Cathedral", icon: "⛪", color: "#c9a227",
          fact: "He painted the same church many times to show how light changes all day." },
      ],
    },
    {
      id: "vangogh",
      name: "Vincent van Gogh",
      face: "🌻",
      color: "#1d3557",
      fact: "Van Gogh used thick, swirly paint and loved bright yellows and blues. You can almost feel the paint move!",
      works: [
        { id: "starry-rhone", title: "Starry Night Over the Rhône", icon: "🌟", color: "#1d3557",
          fact: "Twinkly stars and golden lights shining on the dark water." },
        { id: "vangogh-selfportrait", title: "Self-Portrait", icon: "🧑‍🎨", color: "#2a9d8f",
          fact: "Van Gogh painted himself a lot — find the swirly blue all around him." },
        { id: "bedroom-arles", title: "The Bedroom", icon: "🛏️", color: "#e9c46a",
          fact: "His own little bedroom. He loved it so much he painted it three times!" },
        { id: "church-auvers", title: "The Church at Auvers", icon: "⛪", color: "#3a0ca3",
          fact: "A wobbly little church under a deep blue sky." },
      ],
    },
    {
      id: "degas",
      name: "Edgar Degas",
      face: "🩰",
      color: "#b5838d",
      fact: "Degas loved dancers and everyday moments — yawning, stretching, tying a shoe. Look for people caught mid-movement.",
      works: [
        { id: "ballet-class", title: "The Ballet Class", icon: "💃", color: "#e5989b",
          fact: "Dancers practising in fluffy skirts — how many can you count?" },
        { id: "little-dancer", title: "Little Dancer Aged Fourteen", icon: "🩰", color: "#b5838d",
          fact: "A statue wearing a REAL cloth tutu, standing on her tiptoes." },
        { id: "racehorses", title: "Racehorses before the Stands", icon: "🐎", color: "#90be6d",
          fact: "Horses and jockeys waiting to race — Degas loved drawing them too." },
      ],
    },
    {
      id: "renoir",
      name: "Auguste Renoir",
      face: "🎉",
      color: "#f4a261",
      fact: "Renoir painted happy people, parties and sunshine. Look for dots of golden light and smiling faces.",
      works: [
        { id: "moulin-galette", title: "Dance at the Moulin de la Galette", icon: "🎉", color: "#f4a261",
          fact: "A sunny outdoor party with dancing — spot a little dog or a pretty hat." },
        { id: "girls-piano", title: "Young Girls at the Piano", icon: "🎹", color: "#e9c46a",
          fact: "Two girls making music together." },
        { id: "swing", title: "The Swing", icon: "🌳", color: "#90be6d",
          fact: "Sunlight dapples through the trees onto a girl on a swing." },
      ],
    },
    {
      id: "gauguin",
      name: "Paul Gauguin",
      face: "🏝️",
      color: "#e76f51",
      fact: "Gauguin sailed to a faraway island and painted with big, bold, bright colours.",
      works: [
        { id: "arearea", title: "Arearea (Joyousness)", icon: "🐕", color: "#e76f51",
          fact: "Find the little orange dog hiding in the picture!" },
        { id: "tahitian-women", title: "Tahitian Women on the Beach", icon: "🏖️", color: "#f4a261",
          fact: "Two friends sitting on a warm, sandy beach." },
      ],
    },
    {
      id: "cezanne",
      name: "Paul Cézanne",
      face: "🍎",
      color: "#6d6875",
      fact: "Cézanne built his pictures from simple shapes — and he LOVED painting apples.",
      works: [
        { id: "card-players", title: "The Card Players", icon: "🃏", color: "#6d6875",
          fact: "Two men playing a quiet game of cards — find their pipes." },
        { id: "apples-oranges", title: "Apples and Oranges", icon: "🍎", color: "#e63946",
          fact: "A tumble of fruit on a crumpled white cloth." },
        { id: "sainte-victoire", title: "Mont Sainte-Victoire", icon: "⛰️", color: "#457b9d",
          fact: "A big mountain he painted over and over from his home." },
      ],
    },
  ],
};
