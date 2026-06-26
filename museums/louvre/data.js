/*
 * Louvre scavenger-hunt content.
 *
 * This is the ONLY file you need to edit to change the hunt. Each item:
 *   id     – stable short id (used for the image filename and saved progress)
 *   title  – kid-friendly name, read aloud by a grown-up
 *   find   – the "can you see…?" spotting challenge
 *   where  – a gentle location hint (rooms get rehung, so keep it loose)
 *   fact   – one short, delightful fact about the artist/artwork
 *   color  – background colour for the placeholder until a real photo is added
 *   icon   – emoji shown on the placeholder
 *
 * Real photos go in images/<id>.jpg (see images/SOURCES.md + fetch-louvre-images.sh).
 * If a photo is missing, the app shows a nice coloured placeholder instead.
 */
window.HUNT = {
  title: "Louvre, Can You See?",
  subtitle: "A treasure hunt for art detectives 🔎",
  items: [
    {
      id: "pyramid",
      title: "The Glass Pyramid",
      find: "Find the GIANT glass pyramid before you even go inside!",
      where: "Right in the middle of the courtyard, at the front door.",
      fact: "The Louvre is so big it would take days to see it all. You go in under a sparkly glass pyramid made of hundreds of windows.",
      color: "#c9a227",
      icon: "🔺",
    },
    {
      id: "mona-lisa",
      title: "The Smiling Lady",
      find: "Find the famous lady with the tiny, mysterious smile. Do her eyes follow you?",
      where: "In a big room with the biggest crowd — she is smaller than you think!",
      fact: "Leonardo da Vinci painted her so carefully it took years. Nobody is quite sure why she is smiling!",
      color: "#5b6c3f",
      icon: "🙂",
    },
    {
      id: "venus-de-milo",
      title: "The Lady with No Arms",
      find: "Find the tall marble lady. Where did her arms go? Nobody knows!",
      where: "Among the ancient Greek statues — she stands up high.",
      fact: "This statue is over 2,000 years old. Her arms broke off long, long ago and were never found.",
      color: "#b8b3a7",
      icon: "🗿",
    },
    {
      id: "winged-victory",
      title: "The Angel with Wings",
      find: "Find the giant lady with big stone wings, standing at the top of the stairs.",
      where: "On a grand staircase, like she's about to fly down to say hello.",
      fact: "She is a Greek goddess of victory. Her wings look like they are caught in the wind, even though she's made of stone!",
      color: "#a39b88",
      icon: "🪽",
    },
    {
      id: "liberty",
      title: "The Lady with the Flag",
      find: "Find the brave lady holding a big flag, leading everybody forward.",
      where: "With the large French paintings — look for the red, white and blue flag.",
      fact: "Eugène Delacroix painted her marching for freedom. Can you spot the little boy beside her?",
      color: "#1d3557",
      icon: "🚩",
    },
    {
      id: "raft-medusa",
      title: "People on a Raft",
      find: "Find the HUGE painting of people on a wooden raft in the big waves.",
      where: "With the giant French paintings — it's taller than a grown-up!",
      fact: "Théodore Géricault painted a real shipwreck. The people are waving at a tiny ship far away. Can you find it?",
      color: "#52796f",
      icon: "🌊",
    },
    {
      id: "coronation-napoleon",
      title: "The Big Golden Party",
      find: "Find the enormous painting full of fancy people, gold and crowns.",
      where: "In the big French gallery — it's one of the largest paintings of all!",
      fact: "Jacques-Louis David painted Napoleon's crowning day, with more than a hundred people. Find the lady kneeling in white.",
      color: "#7b1e2b",
      icon: "👑",
    },
    {
      id: "wedding-cana",
      title: "The Giant Feast",
      find: "Find the biggest painting of all — a huge party with music and food!",
      where: "On the wall right across from the Smiling Lady.",
      fact: "Paolo Veronese filled this giant painting with over a hundred guests, musicians and even dogs and a cat!",
      color: "#3d5a80",
      icon: "🍇",
    },
    {
      id: "psyche-cupid",
      title: "The Gentle Kiss",
      find: "Find the white marble statue of two people with wings, very gently hugging.",
      where: "Among the smooth marble sculptures.",
      fact: "Antonio Canova carved this from one big block of marble. The wings and soft skin are all hard, cold stone!",
      color: "#cdc7bb",
      icon: "🪽",
    },
    {
      id: "lacemaker",
      title: "The Busy Little Worker",
      find: "Find the tiny painting of a girl looking down, working very carefully.",
      where: "With the small Dutch paintings — this one is teeny tiny!",
      fact: "Johannes Vermeer painted this girl making lace. The picture is smaller than a cereal box!",
      color: "#e9c46a",
      icon: "🧵",
    },
    {
      id: "grande-odalisque",
      title: "The Lady Looking Back",
      find: "Find the painting of a lady turning to look back over her shoulder.",
      where: "With the elegant French paintings.",
      fact: "Jean-Auguste-Dominique Ingres loved smooth, curvy lines. Spot the peacock-feather fan!",
      color: "#6d597a",
      icon: "🪶",
    },
    {
      id: "virgin-st-anne",
      title: "Three Together and a Lamb",
      find: "Find the painting of a baby reaching for a little woolly lamb.",
      where: "Near the Smiling Lady — it's by the same painter, Leonardo.",
      fact: "Leonardo da Vinci painted a grandma, a mama and a baby — and a gentle little lamb. Behind them are misty blue mountains.",
      color: "#457b9d",
      icon: "🐑",
    },
  ],
};
