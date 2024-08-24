//default hooks
import { useEffect, useState } from "react";

//css for App.js component
import "./App.css";

//components
import SingleCard from "./Components/SingleCard";

//cards src info array
const cardImages = [
  { src: "/images/avenger-a-icon.png", matched: false },
  { src: "/images/blackpanther-icon.png", matched: false },
  { src: "/images/groot-icon.png", matched: false },
  { src: "/images/iron-man-icon.png", matched: false },
  { src: "/images/ironman-icon.png", matched: false },
  { src: "/images/marvel-title-icon.png", matched: false },
  { src: "/images/spider-icon.png", matched: false },
  { src: "/images/thor-axe.png", matched: false },
  { src: "/images/venom-icon.png", matched: false },
  { src: "/images/captain-icon.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)
  //shuffle cards
  //const shuffledCards = cardImages.sort(() => Math.random() - 0.5);
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  //handle chice of the cards selected
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };


  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevturns) => prevturns + 1);
    setDisabled(false);
  };
  //compare 2 selected cards
  useEffect(() => {
   
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => 
          resetTurn(), 1000
        )
        
      }
    }
  }, [choiceOne, choiceTwo]);

  //start the game automatically!
  useEffect(()=> {
    shuffleCards()
  }, [])

  // console.log(cards, turns);
  return (
    <div className="App">
      <h1>Marvel Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          card={card} key={card.id} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>

      <p>Total Turns: {turns} </p>
    </div>
  );
}

export default App;
