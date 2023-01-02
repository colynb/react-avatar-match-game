import { useEffect, useState } from "react";
import avatar1 from "./assets/avataaars (1).svg";
import avatar2 from "./assets/avataaars (2).svg";
import avatar3 from "./assets/avataaars (3).svg";
import avatar4 from "./assets/avataaars (4).svg";
import avatar5 from "./assets/avataaars (5).svg";
import avatar6 from "./assets/avataaars (6).svg";
import avatar7 from "./assets/avataaars (7).svg";
import avatar8 from "./assets/avataaars (8).svg";
import "./App.css";

const avatars = [
  { image: avatar1, name: "avatar1" },
  { image: avatar1, name: "avatar1" },
  { image: avatar2, name: "avatar2" },
  { image: avatar2, name: "avatar2" },
  { image: avatar3, name: "avatar3" },
  { image: avatar3, name: "avatar3" },
  { image: avatar4, name: "avatar4" },
  { image: avatar4, name: "avatar4" },
  { image: avatar5, name: "avatar5" },
  { image: avatar5, name: "avatar5" },
  { image: avatar6, name: "avatar6" },
  { image: avatar6, name: "avatar6" },
  { image: avatar7, name: "avatar7" },
  { image: avatar7, name: "avatar7" },
  { image: avatar8, name: "avatar8" },
  { image: avatar8, name: "avatar8" },
];

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
    if (foundCards.length !== 16) return;
    setTimeout(() => {
      setCards(
        cards.map((c) => {
          c.flipped = false;
          c.found = false;
          return c;
        })
      );
    }, 1000);
  }, [cards]);

  // // useEffect(() => {
  // //   const flipped = cards.filter((c) => c.flipped);

  //   console.log(flipped.length % 2);
  //   if (flipped.length && flipped.length % 2 === 0) {
  //     setDisabled(true);
  //     setTimeout(() => {
  //       // setCards(
  //       //   cards.map((c) => {
  //       //     if (found[c.name] < 2) {
  //       //       c.flipped = false;
  //       //     }
  //       //     return c;
  //       //   })
  //       // );
  //       setDisabled(false);
  //       setFound({});
  //     }, 2000);
  //   }
  // }, [cards]);

  const handleClick = (index: number) => {
    if (disabled) return;
    const newCards = [...cards].map((c, i) => {
      if (i === index) {
        c.flipped = !c.flipped;
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
    <div className="max-w-2xl mx-auto h-screen flex items-center justify-center">
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        {cards.map((card, i) => (
          <div key={`card${i}`}>
            <button
              className={classNames(
                !card.flipped
                  ? "bg-blue-900 text-white flip-front"
                  : "bg-gray-400 flip-back",
                "rounded flip-content"
              )}
              onClick={() => handleClick(i)}
            >
              {card.flipped ? (
                <img src={card.image} className="object-cover w-40 h-52 p-4" />
              ) : (
                <div className="w-40 p-4 h-52 flex items-center justify-center">
                  FLIP
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
