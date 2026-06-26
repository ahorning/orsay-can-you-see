/*
 * "Learn before we go" collection — works grouped by artist.
 *
 * Used by both the study gallery and the guess-the-artist quiz.
 * All works are in the Louvre, so she'll meet them again in person.
 *
 * Each artist:  id, name, face (emoji), color, fact (kid-friendly), works[]
 * Each work:    id (also the image filename), title, fact, color, icon
 *
 * Real photos go in images/<id>.jpg (see images/SOURCES.md). Missing photos
 * fall back to the coloured emoji placeholder.
 *
 * Note: the Louvre's most famous statues (Venus de Milo, Winged Victory) have
 * no known artist, so they live together in one "Famous Statues" group along
 * with Canova's Psyche & Cupid.
 */
window.ARTISTS = {
  title: "Learn Before We Go",
  subtitle: "Get to know the treasures of the Louvre 🎨",
  artists: [
    {
      id: "leonardo",
      name: "Leonardo da Vinci",
      face: "🙂",
      color: "#5b6c3f",
      fact: "Leonardo was a painter AND an inventor. He painted very slowly and softly, so edges seem to melt like smoke.",
      works: [
        { id: "mona-lisa", title: "Mona Lisa", icon: "🙂", color: "#5b6c3f",
          fact: "The most famous smile in the world — and she's smaller than you'd guess!" },
        { id: "virgin-st-anne", title: "The Virgin and Child with St. Anne", icon: "🐑", color: "#457b9d",
          fact: "A baby, his mama, his grandma — and a woolly little lamb." },
      ],
    },
    {
      id: "delacroix",
      name: "Eugène Delacroix",
      face: "🚩",
      color: "#1d3557",
      fact: "Delacroix loved bold colours and big, exciting action. His paintings feel like they're moving.",
      works: [
        { id: "liberty", title: "Liberty Leading the People", icon: "🚩", color: "#1d3557",
          fact: "A brave lady holds the flag high and leads everyone forward." },
      ],
    },
    {
      id: "gericault",
      name: "Théodore Géricault",
      face: "🌊",
      color: "#52796f",
      fact: "Géricault painted enormous, dramatic scenes. He even visited real ships to get the waves just right.",
      works: [
        { id: "raft-medusa", title: "The Raft of the Medusa", icon: "🌊", color: "#52796f",
          fact: "Shipwrecked people on a raft wave at a tiny rescue ship far away." },
      ],
    },
    {
      id: "david",
      name: "Jacques-Louis David",
      face: "👑",
      color: "#7b1e2b",
      fact: "David painted grand, important moments with lots of people, gold and fancy clothes.",
      works: [
        { id: "coronation-napoleon", title: "The Coronation of Napoleon", icon: "👑", color: "#7b1e2b",
          fact: "A giant golden party with crowns — count how many people you can see!" },
      ],
    },
    {
      id: "veronese",
      name: "Paolo Veronese",
      face: "🍇",
      color: "#3d5a80",
      fact: "Veronese painted the BIGGEST painting in the whole museum, packed with music, food and friends.",
      works: [
        { id: "wedding-cana", title: "The Wedding Feast at Cana", icon: "🍇", color: "#3d5a80",
          fact: "Over a hundred party guests — and even some dogs and a cat!" },
      ],
    },
    {
      id: "vermeer",
      name: "Johannes Vermeer",
      face: "🧵",
      color: "#e9c46a",
      fact: "Vermeer painted small, quiet pictures of everyday life, with beautiful soft light.",
      works: [
        { id: "lacemaker", title: "The Lacemaker", icon: "🧵", color: "#e9c46a",
          fact: "A girl works hard at her lace — the painting is teeny tiny!" },
        { id: "astronomer", title: "The Astronomer", icon: "🌍", color: "#6d6875",
          fact: "A man studies the stars with a spinning globe by the window." },
      ],
    },
    {
      id: "ingres",
      name: "J.-A.-D. Ingres",
      face: "🪶",
      color: "#6d597a",
      fact: "Ingres loved smooth, curvy lines and made his paintings look soft as silk.",
      works: [
        { id: "grande-odalisque", title: "La Grande Odalisque", icon: "🪶", color: "#6d597a",
          fact: "A lady looks back over her shoulder — spot the peacock-feather fan." },
      ],
    },
    {
      id: "statues",
      name: "Famous Statues",
      face: "🏛️",
      color: "#b8b3a7",
      fact: "Some of the Louvre's most famous treasures are statues — and the oldest are so old that nobody knows who made them!",
      works: [
        { id: "venus-de-milo", title: "Venus de Milo", icon: "🗿", color: "#b8b3a7",
          fact: "A marble lady over 2,000 years old — her arms were lost long ago." },
        { id: "winged-victory", title: "Winged Victory of Samothrace", icon: "🪽", color: "#a39b88",
          fact: "A goddess with huge stone wings, standing at the top of a staircase." },
        { id: "psyche-cupid", title: "Psyche Revived by Cupid's Kiss", icon: "💞", color: "#cdc7bb",
          fact: "Antonio Canova carved this gentle hug from one big block of marble." },
      ],
    },
  ],
};
