/*
 * "Have You Seine It?" — a city-wide Paris scavenger hunt.
 *
 * This is the ONLY file you need to edit to change the hunt. Each item:
 *   id     – stable short id (used for the image filename and saved progress)
 *   title  – kid-friendly name, read aloud by a grown-up
 *   find   – the "can you see…?" spotting challenge
 *   where  – a gentle location hint (kept loose — the city is big!)
 *   fact   – one short, delightful fact
 *   color  – background colour shown behind the icon/photo
 *   icon   – emoji shown when there's no photo
 *
 * Most cards use a bright emoji. A few less-familiar things (the métro sign,
 * the Wallace fountain, Sacré-Cœur, the bouquinistes) are "photo-friendly":
 * drop a photo at images/<id>.jpg (your own snapshot works great!) and it
 * replaces the emoji automatically. See images/SOURCES.md.
 */
window.HUNT = {
  id: "paris",
  title: "Have You Seine It?",
  subtitle: "A treasure hunt across Paris 🗼🔎",
  items: [
    {
      id: "eiffel-tower",
      title: "The Giant Iron Tower",
      find: "Find the HUGE iron tower that pokes all the way up into the clouds!",
      where: "You can spot it from all over the city — look up high!",
      fact: "The Eiffel Tower is made of iron and grows a tiny bit taller on hot days. It has 1,665 steps to the top!",
      color: "#8d99ae",
      icon: "🗼",
    },
    {
      id: "seine-boat",
      title: "A Boat on the River",
      find: "Spot a long boat gliding down the river Seine and sliding under a bridge.",
      where: "On the water, winding right through the middle of Paris.",
      fact: "The big glass riverboats are called bateaux-mouches — that means 'fly boats'!",
      color: "#457b9d",
      icon: "🛥️",
    },
    {
      id: "carousel",
      title: "A Twirly Carousel",
      find: "Find a merry-go-round with painted horses going round and round.",
      where: "Near the parks and big sights — listen for the music!",
      fact: "Paris has carousels all over the city, and many of them are over 100 years old.",
      color: "#e63946",
      icon: "🎠",
    },
    {
      id: "metro-sign",
      title: "The Swirly Métro Sign",
      find: "Find the curly green 'Métropolitain' sign at the top of the stairs going down to the trains.",
      where: "At the entrances to the underground métro.",
      fact: "An artist named Hector Guimard made these signs curl like green plants, over 120 years ago.",
      color: "#2a9d8f",
      icon: "🚇",
    },
    {
      id: "wallace-fountain",
      title: "The Little Green Fountain",
      find: "Find a small green fountain with four ladies holding up the roof — the water is for drinking!",
      where: "On street corners and in parks all over the city.",
      fact: "A man named Richard Wallace gave Paris these pretty fountains so everyone could have free, clean water.",
      color: "#2d6a4f",
      icon: "⛲",
    },
    {
      id: "baguette",
      title: "A Crunchy Baguette",
      find: "Can you spot someone carrying a long, crunchy baguette?",
      where: "Coming out of a boulangerie — that's a bakery.",
      fact: "Lots of Parisians buy a fresh baguette every single day. Squeeze it and the crust goes 'crack!'",
      color: "#e9c46a",
      icon: "🥖",
    },
    {
      id: "louvre-pyramid",
      title: "The Glass Pyramid",
      find: "Find the giant glass pyramid standing in front of the big palace.",
      where: "In the courtyard of the Louvre.",
      fact: "The Louvre is one of the biggest museums in the whole world — and a shiny glass pyramid is its front door!",
      color: "#6d6875",
      icon: "🔺",
    },
    {
      id: "sacre-coeur",
      title: "The White Church on the Hill",
      find: "Find the big, round, snowy-white church sitting on top of a hill.",
      where: "High up in Montmartre — climb the steps or ride the little funicular.",
      fact: "Sacré-Cœur sits on the highest hill in Paris, and its white stone gets even whiter when it rains!",
      color: "#dee2e6",
      icon: "⛪",
    },
    {
      id: "arc-triomphe",
      title: "The Giant Stone Arch",
      find: "Find the enormous stone archway right in the middle of a busy roundabout.",
      where: "At the top of a long, grand avenue full of shops.",
      fact: "The Arc de Triomphe is so tall a daredevil once flew a little airplane straight through it!",
      color: "#b08968",
      icon: "🏛️",
    },
    {
      id: "sidewalk-cafe",
      title: "A Sidewalk Café",
      find: "Find a café with tiny round tables and chairs out on the sidewalk.",
      where: "On almost every corner — maybe stop for a hot chocolate!",
      fact: "Parisians love to sit at little café tables facing the street, just to watch the world go by.",
      color: "#d4a373",
      icon: "☕",
    },
    {
      id: "bouquinistes",
      title: "Green Boxes of Old Books",
      find: "Find the green metal boxes full of old books and pictures by the river.",
      where: "Along the stone walls beside the Seine.",
      fact: "These riverside book sellers are called bouquinistes, and their green boxes have lined the Seine for hundreds of years.",
      color: "#386641",
      icon: "📚",
    },
    {
      id: "pigeons",
      title: "Strutting Pigeons",
      find: "How many pigeons can you count strutting and pecking on the ground?",
      where: "In every square and park — especially where someone drops a crumb!",
      fact: "Watch closely: pigeons bob their heads back and forth every time they take a step.",
      color: "#adb5bd",
      icon: "🐦",
    },
  ],
};
