import { useEffect, useState } from "react";
import "./App.css";

const NUM_CARDS = 16;

const topType = shuffle([
  "NoHair",
  "EyePatch",
  "Hat",
  "Hibjab",
  "Turban",
  "WinterHat1",
  "WinterHat2",
  "LongHairBob",
  "LongHairBun",
  "LongHairCurly",
  "LongHairCurvy",
  "LongHairDreads",
  "LongHairFrida",
  "LongHairFro",
  "LongHairFroBand",
  "LongHairShavedSides",
  "LongHairMiaWallace",
  "LongHairStraightStrand",
]);

const accessoriesTypes = shuffle([
  "Blank",
  "Blank",
  "Kurt",
  "Prescription01",
  "Prescription02",
  "Round",
  "Round",
  "Sunglasses",
  "Wayfarers",
]);

const hairColors = shuffle([
  "Auburn",
  "Black",
  "Blonde",
  "BlondeGolden",
  "Brown",
  "BrownDark",
  "PastelPink",
  "Blue",
  "Platinum",
  "Red",
  "SilverGray",
]);

const facialHairType = shuffle([
  "Blank",
  "Blank",
  "BeardMedium",
  "BeardMedium",
  "BeardLight",
  "BeardMajestic",
  "MoustacheFancy",
  "MoustacheMagnum",
]);

const facialHairColor = shuffle([
  "Auburn",
  "Black",
  "Blonde",
  "BlondeGolden",
  "Brown",
  "BrownDark",
  "Platinum",
  "Red",
]);

const clotheType = shuffle([
  "BlazerShirt",
  "BlazerSweater",
  "CollarSweater",
  "GraphicShirt",
  "Hoodie",
  "Overall",
  "ShirtCrewNeck",
  "ShirtScoopNeck",
]);

const eyeType = shuffle([
  "Default",
  "Default",
  "Default",
  "Default",
  "Default",
  "Default",
  "Close",
  "Cry",
]);

const eyebrowType = shuffle([
  "Default",
  "Default",
  "DefaultNatural",
  "DefaultNatural",
  "FlatNatural",
  "Angry",
  "AngryNatural",
  "RaisedExcited",
  "RaisedExcitedNatural",
  "SadConcerned",
  "SadConcernedNatural",
  "UnibrowNatural",
  "UpDown",
  "UpDownNatural",
]);

const skinColor = shuffle([
  "Tanned",
  "Tanned",
  "Yellow",
  "Yellow",
  "Pale",
  "Pale",
  "Light",
  "Light",
  "Brown",
  "Brown",
  "DarkBrown",
  "DarkBrown",
  "Black",
  "Black",
]);

let images = [];
for (let i = 0; i < NUM_CARDS / 2; i++) {
  let params = [
    `topType=${topType[i]}`,
    `accessoriesType=${accessoriesTypes[i]}`,
    `hairColor=${hairColors[i]}`,
    `facialHairType=${facialHairType[i]}`,
    `facialHairColor=${facialHairColor[i]}`,
    `clotheType=${clotheType[i]}`,
    `eyeType=${eyeType[i]}`,
    `eyebrowType=${eyebrowType[i]}`,
    `skinColor=${skinColor[i]}`,
  ];
  images.push(`https://avataaars.io/?avatarStyle=Circle&${params.join("&")}`);
}

let avatars: any[] = [];

for (let i = 0; i < NUM_CARDS / 2; i++) {
  avatars.push({ image: images[i], name: `avatar${i}` });
  avatars.push({ image: images[i], name: `avatar${i}` });
}

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

type Found = { [index: string]: number };

function App() {
  const [cards, setCards] = useState(
    shuffle(avatars.map((a, i) => ({ ...a, flipped: false, found: false })))
  );
  const [found, setFound] = useState<Found>({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const foundCards = cards.filter((c) => c.found);
    if (foundCards.length !== NUM_CARDS) return;
    alert("You did it!");
    setTimeout(() => {
      setFound({});
      setCards(
        shuffle(cards).map((c) => {
          c.flipped = false;
          c.found = false;
          return c;
        })
      );
    }, 1000);
  }, [cards]);

  const handleClick = (index: number) => {
    if (disabled) return;
    const newCards = [...cards].map((c, i) => {
      if (i === index) {
        c.flipped = true;
      }
      return c;
    });

    const flipped = newCards.filter((c) => c.flipped && !c.found);
    let newFound = { ...found };
    console.log({ flipped });
    if (newFound[cards[index].name]) {
      newFound = { ...found, [cards[index].name]: 2 };
    } else {
      newFound = { ...found, [cards[index].name]: 1 };
    }

    if (flipped.length >= 2) {
      setDisabled(true);
      setTimeout(() => {
        setCards(
          cards.map((c) => {
            if (newFound[c.name] === 2 || c.found) {
              c.flipped = true;
              c.found = true;
            } else {
              c.flipped = false;
            }
            return c;
          })
        );
        setDisabled(false);
        setFound({});
      }, 1000);
    }
    setFound(newFound);
    setCards(newCards);
  };

  return (
    <div className="max-w-2xl mx-auto flex items-center justify-center flex-col">
      <div>
        <h1 className="text-center text-4xl text-amber-600">
          Avatar<span className="text-blue-500">Match</span>
        </h1>
        <a
          href="https://github.com/colynb/react-avatar-match-game"
          className="font-semibold text-gray-700 p-8 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          @colynb/react-avatar-match-game
        </a>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        {cards.map((card, i) => (
          <>
            <button
              key={`card${i}`}
              className={classNames(
                !card.flipped
                  ? "bg-blue-100 text-white flip-front pattern-zigzag-sm "
                  : "bg-gray-100 flip-back shadow-lg cursor-default",
                "rounded flip-content h-52 border border-gray-500"
              )}
              onClick={() => handleClick(i)}
            >
              {card.flipped ? (
                <img src={card.image} className=" w-40 h-52 p-4" />
              ) : (
                <div className="w-40 p-4 h-52 flex items-center justify-center"></div>
              )}
            </button>
          </>
        ))}
      </div>
      <div className="p-2">
        Avatars provided by{" "}
        <a href="https://getavataaars.com/" className="underline">
          https://getavataaars.com/
        </a>
      </div>
    </div>
  );
}

export default App;
