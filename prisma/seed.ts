import { db } from '../src/lib/db';

async function main() {
  // Clean up existing data
  await db.artwork.deleteMany();
  await db.artist.deleteMany();
  await db.artMovement.deleteMany();

  // Create Art Movements
  const renaissance = await db.artMovement.create({
    data: {
      name: 'Renaissance',
      description: 'The Renaissance was a cultural movement that profoundly affected European intellectual life in the early modern period. Beginning in Italy, it spread to the rest of Europe by the 16th century. Its influence was felt in art, architecture, philosophy, literature, music, science, technology, and politics. Renaissance artists applied humanism to their work, depicting the human form with anatomical accuracy and creating perspective to add realism.',
      period: '1400–1600',
      imageUrl: '/movements/renaissance.png',
    },
  });

  const baroque = await db.artMovement.create({
    data: {
      name: 'Baroque',
      description: 'The Baroque style used contrast, movement, exuberant detail, deep color, grandeur, and surprise to achieve a sense of awe. The style began in Rome around 1600 and spread to most of Europe. Baroque painters like Caravaggio, Rembrandt, and Vermeer mastered the use of chiaroscuro—strong contrasts between light and dark—to create dramatic, theatrical compositions.',
      period: '1600–1750',
      imageUrl: '/movements/baroque.png',
    },
  });

  const impressionism = await db.artMovement.create({
    data: {
      name: 'Impressionism',
      description: 'Impressionism originated in Paris in the 1860s and 1870s. Characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, inclusion of movement as a crucial element, and unusual visual angles. The name derives from Claude Monet\'s painting Impression, Sunrise.',
      period: '1860–1900',
      imageUrl: '/movements/impressionism.png',
    },
  });

  const postImpressionism = await db.artMovement.create({
    data: {
      name: 'Post-Impressionism',
      description: 'Post-Impressionism emerged as a reaction against Impressionism\'s concern for the naturalistic depiction of light and colour. Post-Impressionists extended Impressionism while rejecting its limitations: they continued using vivid colours, often thick application of paint, and real-life subject matter, but were more inclined to emphasize geometric forms, distort form for expressive effect, and use unnatural or arbitrary colour.',
      period: '1880–1910',
      imageUrl: '/movements/post-impressionism.png',
    },
  });

  const modernism = await db.artMovement.create({
    data: {
      name: 'Modernism',
      description: 'Modernism in art refers to a series of reforming cultural movements in art and architecture. Embracing abstraction and rejecting traditional forms, modernist artists experimented with new ways of seeing and with fresh ideas about the nature of materials and functions of art. Movements within modernism include Cubism, Futurism, Abstract Expressionism, and others.',
      period: '1900–1970',
      imageUrl: '/movements/modernism.png',
    },
  });

  const surrealism = await db.artMovement.create({
    data: {
      name: 'Surrealism',
      description: 'Surrealism was a cultural movement featuring elements of surprise, unexpected juxtapositions, and non sequitur. Artists painted unnerving, illogical scenes with photographic precision, created strange creatures from everyday objects, and developed painting techniques that allowed the unconscious to express itself. The movement drew heavily on the theories of Sigmund Freud.',
      period: '1920–1960',
      imageUrl: '/movements/surrealism.png',
    },
  });

  // Create Artists
  const leonardo = await db.artist.create({
    data: {
      name: 'Leonardo da Vinci',
      bio: 'Leonardo da Vinci (1452–1519) was an Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect. While his fame initially rested on his achievements as a painter, he also became known for his notebooks, in which he made drawings and notes on a variety of subjects. He is widely considered one of the greatest painters of all time.',
      birthYear: 1452,
      deathYear: 1519,
      nationality: 'Italian',
      imageUrl: '/artists/leonardo.png',
    },
  });

  const michelangelo = await db.artist.create({
    data: {
      name: 'Michelangelo',
      bio: 'Michelangelo di Lodovico Buonarroti Simoni (1475–1564), known simply as Michelangelo, was an Italian sculptor, painter, architect, and poet of the High Renaissance. His work exerted an unparalleled influence on the development of Western art. He was considered the greatest living artist in his lifetime, and ever since then he has been held to be one of the greatest artists of all time.',
      birthYear: 1475,
      deathYear: 1564,
      nationality: 'Italian',
      imageUrl: '/artists/michelangelo.png',
    },
  });

  const rembrandt = await db.artist.create({
    data: {
      name: 'Rembrandt van Rijn',
      bio: 'Rembrandt Harmenszoon van Rijn (1606–1669) was a Dutch draughtsman, painter, and printmaker. An innovative and prolific master in three media, he is generally considered the greatest Dutch painter and printmaker of the 17th century, and the most important in Dutch art history. His works depict a range of style and subject matter, from portraits and self-portraits to landscapes and allegorical scenes.',
      birthYear: 1606,
      deathYear: 1669,
      nationality: 'Dutch',
      imageUrl: '/artists/rembrandt.png',
    },
  });

  const vermeer = await db.artist.create({
    data: {
      name: 'Johannes Vermeer',
      bio: 'Johannes Vermeer (1632–1675) was a Dutch Baroque Period painter who specialized in domestic interior scenes of middle-class life. He was a moderately successful provincial painter in his lifetime, recognized in Delft and The Hague. He produced relatively few paintings—about 34 are attributed to him—and used very expensive pigments, cornflower blue and yellow, lavishly in his work.',
      birthYear: 1632,
      deathYear: 1675,
      nationality: 'Dutch',
      imageUrl: '/artists/vermeer.png',
    },
  });

  const botticelli = await db.artist.create({
    data: {
      name: 'Sandro Botticelli',
      bio: 'Sandro Botticelli (1445–1510) was an Italian painter of the Early Renaissance. He belonged to the Florentine School under the patronage of Lorenzo de\' Medici, a movement that Giorgio Vasari would characterize less than a hundred years later as a "golden age." Botticelli\'s posthumous reputation suffered until the late 19th century, when his work was rediscovered by the Pre-Raphaelites.',
      birthYear: 1445,
      deathYear: 1510,
      nationality: 'Italian',
      imageUrl: '/artists/botticelli.png',
    },
  });

  const monet = await db.artist.create({
    data: {
      name: 'Claude Monet',
      bio: 'Oscar-Claude Monet (1840–1926) was a French painter and founder of Impressionist painting, regarded as the key precursor to modernism, especially in his attempts to paint nature as he perceived it. His ambition to document the French countryside led to his method of painting the same scene many times to capture the changing of light and the passing of the seasons. His 1872 painting Impression, Sunrise gave the Impressionist movement its name.',
      birthYear: 1840,
      deathYear: 1926,
      nationality: 'French',
      imageUrl: '/artists/monet.png',
    },
  });

  const vanGogh = await db.artist.create({
    data: {
      name: 'Vincent van Gogh',
      bio: 'Vincent Willem van Gogh (1853–1890) was a Dutch Post-Impressionist painter who posthumously became one of the most famous and influential figures in Western art history. In a decade, he created about 2,100 artworks, including approximately 860 oil paintings, most of them in the last two years of his life. His bold colors and dramatic, impulsive, and expressive brushwork contributed to the foundations of modern art.',
      birthYear: 1853,
      deathYear: 1890,
      nationality: 'Dutch',
      imageUrl: '/artists/van-gogh.png',
    },
  });

  const picasso = await db.artist.create({
    data: {
      name: 'Pablo Picasso',
      bio: 'Pablo Ruiz Picasso (1881–1973) was a Spanish painter, sculptor, printmaker, ceramicist, and theatre designer who spent most of his adult life in France. One of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture, the co-invention of collage, and for the wide variety of styles that he helped develop and explore.',
      birthYear: 1881,
      deathYear: 1973,
      nationality: 'Spanish',
      imageUrl: '/artists/picasso.png',
    },
  });

  const dali = await db.artist.create({
    data: {
      name: 'Salvador Dalí',
      bio: 'Salvador Domingo Felipe Jacinto Dalí i Domènech (1904–1989) was a Spanish surrealist artist renowned for his technical skill, precise draftsmanship, and the striking and bizarre images in his work. Heavily influenced by Renaissance masters, Dalí combined extraordinary artistic talent with a flamboyant persona. His best-known work, The Persistence of Memory, was completed in August 1931.',
      birthYear: 1904,
      deathYear: 1989,
      nationality: 'Spanish',
      imageUrl: '/artists/dali.png',
    },
  });

  const kahlo = await db.artist.create({
    data: {
      name: 'Frida Kahlo',
      bio: 'Magdalena Carmen Frida Kahlo y Calderón (1907–1954) was a Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico. Employing a folk art style, she explored questions of identity, postcolonialism, gender, class, and race in Mexican society. Her paintings often had strong autobiographical elements and mixed realism with fantasy.',
      birthYear: 1907,
      deathYear: 1954,
      nationality: 'Mexican',
      imageUrl: '/artists/kahlo.png',
    },
  });

  // Create Artworks
  await db.artwork.create({
    data: {
      title: 'Mona Lisa',
      description: 'The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world." The painting\'s novel qualities include the subject\'s enigmatic expression, the monumentality of the composition, and the subtle modelling of forms.',
      year: 1503,
      medium: 'Oil on poplar panel',
      dimensions: '77 cm × 53 cm',
      imageUrl: '/artworks/mona-lisa.png',
      featured: true,
      artistId: leonardo.id,
      movementId: renaissance.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'The Creation of Adam',
      description: 'The Creation of Adam is a fresco painting by Italian artist Michelangelo, which forms part of the Sistine Chapel\'s ceiling. The work illustrates the Biblical creation narrative from the Book of Genesis in which God gives life to Adam. It is the most well-known of the Sistine Chapel fresco panels, and its fame is rivaled only by the Mona Lisa.',
      year: 1512,
      medium: 'Fresco',
      dimensions: '280 cm × 570 cm',
      imageUrl: '/artworks/creation-of-adam.png',
      featured: true,
      artistId: michelangelo.id,
      movementId: renaissance.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'The Birth of Venus',
      description: 'The Birth of Venus is a painting by the Italian artist Sandro Botticelli, probably made in the mid 1480s. It depicts the goddess Venus arriving at the shore after her birth, when she had emerged from the sea fully-grown. The painting is in the Uffizi Gallery in Florence. It is one of the most celebrated and iconic works of the Renaissance.',
      year: 1485,
      medium: 'Tempera on canvas',
      dimensions: '172.5 cm × 278.9 cm',
      imageUrl: '/artworks/birth-of-venus.png',
      featured: true,
      artistId: botticelli.id,
      movementId: renaissance.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'The Night Watch',
      description: 'The Night Watch is a 1642 painting by Rembrandt van Rijn. It is in the collection of the Rijksmuseum in Amsterdam. It is one of the most famous Dutch Golden Age paintings, notable for its dramatic use of light and shadow (chiaroscuro), and for the perception of motion in what would have traditionally been a static military group portrait.',
      year: 1642,
      medium: 'Oil on canvas',
      dimensions: '363 cm × 437 cm',
      imageUrl: '/artworks/night-watch.png',
      featured: true,
      artistId: rembrandt.id,
      movementId: baroque.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'Girl with a Pearl Earring',
      description: 'Girl with a Pearl Earring is an oil painting by Dutch Golden Age painter Johannes Vermeer, dated c. 1665. Going by various names over the centuries, it became known by its present name towards the end of the 20th century after the earring worn by the girl portrayed there. The work has been in the collection of the Mauritshuis in The Hague since 1902.',
      year: 1665,
      medium: 'Oil on canvas',
      dimensions: '44.5 cm × 39 cm',
      imageUrl: '/artworks/girl-with-pearl-earring.png',
      featured: true,
      artistId: vermeer.id,
      movementId: baroque.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'Impression, Sunrise',
      description: 'Impression, Sunrise is a painting by Claude Monet first shown at what would become known as the "Exhibition of the Impressionists" in Paris in April 1874. The painting is credited with inspiring the name of the Impressionist movement. It depicts the port of Le Havre, Monet\'s hometown, and is his most famous impressionist painting.',
      year: 1872,
      medium: 'Oil on canvas',
      dimensions: '48 cm × 63 cm',
      imageUrl: '/artworks/impression-sunrise.png',
      featured: true,
      artistId: monet.id,
      movementId: impressionism.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'Water Lilies',
      description: 'Water Lilies is a series of approximately 250 oil paintings by French Impressionist Claude Monet. The paintings depict his flower garden at his home in Giverny, and were the main focus of his artistic production during the last thirty years of his life. Many of the works were painted while Monet suffered from cataracts. The paintings are on display at museums worldwide.',
      year: 1906,
      medium: 'Oil on canvas',
      dimensions: '89.9 cm × 94.1 cm',
      imageUrl: '/artworks/water-lilies.png',
      featured: true,
      artistId: monet.id,
      movementId: impressionism.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'The Starry Night',
      description: 'The Starry Night is an oil-on-canvas painting by the Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, with the addition of an imaginary village. It has been in the permanent collection of the Museum of Modern Art in New York City since 1941.',
      year: 1889,
      medium: 'Oil on canvas',
      dimensions: '73.7 cm × 92.1 cm',
      imageUrl: '/artworks/starry-night.png',
      featured: true,
      artistId: vanGogh.id,
      movementId: postImpressionism.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'Café Terrace at Night',
      description: 'Café Terrace at Night is an oil painting by the Dutch artist Vincent van Gogh, also known as The Cafe Terrace on the Place du Forum. It was painted in Arles, France, in mid-September 1888. It is the first painting in which he used a background with stars. It is currently held at the Kröller-Müller Museum in the Netherlands.',
      year: 1888,
      medium: 'Oil on canvas',
      dimensions: '80.7 cm × 65.3 cm',
      imageUrl: '/artworks/cafe-terrace.png',
      featured: false,
      artistId: vanGogh.id,
      movementId: postImpressionism.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'Guernica',
      description: 'Guernica is a large 1937 oil painting on canvas by Spanish artist Pablo Picasso. One of Picasso\'s best known works, regarded by many art critics as the most moving and powerful anti-war painting in history, it is exhibited in the Museo Reina Sofía in Madrid. The grey, black, and white painting portrays the suffering of people and animals wrenched by violence and chaos.',
      year: 1937,
      medium: 'Oil on canvas',
      dimensions: '349.3 cm × 776.6 cm',
      imageUrl: '/artworks/guernica.png',
      featured: true,
      artistId: picasso.id,
      movementId: modernism.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'Number 31, 1949',
      description: 'One of the most famous examples of Abstract Expressionism, this monumental work by Jackson Pollock exemplifies his revolutionary drip painting technique. The canvas captures the raw energy and improvisational nature of his creative process, with layers of paint creating an intricate web of lines and splashes that seem to pulse with kinetic energy.',
      year: 1949,
      medium: 'Oil and enamel on canvas',
      dimensions: '269 cm × 531 cm',
      imageUrl: '/artworks/abstract-expressionism.png',
      featured: false,
      artistId: picasso.id,
      movementId: modernism.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'The Persistence of Memory',
      description: 'The Persistence of Memory is a 1931 painting by Spanish artist Salvador Dalí. It is one of Dalí\'s most iconic and recognizable works, and has been widely reproduced and parodied. The painting depicts soft, melting pocket watches draped over various objects in a dreamlike landscape. It has been in the collection of the Museum of Modern Art in New York City since 1934.',
      year: 1931,
      medium: 'Oil on canvas',
      dimensions: '24.1 cm × 33 cm',
      imageUrl: '/artworks/persistence-of-memory.png',
      featured: true,
      artistId: dali.id,
      movementId: surrealism.id,
    },
  });

  await db.artwork.create({
    data: {
      title: 'The Two Fridas',
      description: 'The Two Fridas is an oil painting by Mexican artist Frida Kahlo. The painting was the first large-scale work done by Kahlo and is considered one of her most notable paintings. It is a double self-portrait, depicting two versions of Kahlo seated side by side. One wears a European-style Victorian dress, the other a traditional Tehuana dress.',
      year: 1939,
      medium: 'Oil on canvas',
      dimensions: '173.5 cm × 173 cm',
      imageUrl: '/artworks/two-fridas.png',
      featured: true,
      artistId: kahlo.id,
      movementId: surrealism.id,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
