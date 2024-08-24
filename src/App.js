//default hooks
import { useEffect, useState } from "react";

//css for App.js component
import "./App.css";

//components
import SingleCard from "./Components/SingleCard";

//cards src info array
const cardImages = [
  { src: `${process.env.PUBLIC_URL}/images/avenger-a-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/blackpanther-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/groot-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/iron-man-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/ironman-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/thanos-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/spider-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/thor-axe.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/venom-icon.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/images/captain-icon.png`, matched: false },
];

function App() {
  //actual cards
  const [cards, setCards] = useState([]);
  //cards that are flipped
  const [turns, setTurns] = useState(0);
  
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //timer for the reset
  const [time, setTime] = useState(60);
  const [isActive, setIsActive] = useState()

  //hints
  const [revealed, setRevealed] = useState(false); // New state for revealing all cards
  const [hintUsed, setHintUsed] = useState(false); // New state for hint usage



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
    setHintUsed(false); // Reset the hint for a new game
    setTime(60);
  };


  //use hint function 
  const useHint = () => {
    setRevealed(true);
    setTimeout(() => {
      setRevealed(false);
      setHintUsed(true); //disable hint after use
      }, 1000);
    }
    
  
  //handle chice of the cards selected
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
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


  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevturns) => prevturns + 1);
    setDisabled(false);
  };


  //start the game automatically!
  useEffect(()=> {
    shuffleCards()
    setTime(60);
    setIsActive(true);
  }, [])

  //Timer logic inside useEffect
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 60) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, time]);
  

  //Stop timer once game ends (when all the cards are matched)
  
useEffect(() => {
  const allMatched = cards.every(card => card.matched);
  if (allMatched && cards.length > 0) {
    setIsActive(false);  // Stop the timer
  }
}, [cards]);

//resetting game if timer hits 0s
useEffect(() => {
  if (time === 0) {
    shuffleCards(); // Reset game if timer reaches 0 seconds
  }
}, [time]);
  // useEffect(() => {
  //   let intervalId = null;
  //   if
  // }, [])
  // console.log(cards, turns);
  return (
    <div className="App">
      <div className="marvel-title">
      <h1 className="title">Magic Marvel</h1>
      </div>
     
      <button onClick={shuffleCards}>New Game</button>
      <button className= {hintUsed ? "disabled" : ""} onClick={useHint} disabled={hintUsed}>Hint</button> {/* Hint Button */}
      <div>
        <p>Timer: {time}s</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          card={card} key={card.id} 
          handleChoice={handleChoice} 
          flipped={revealed || card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>

      <p>Total Turns: {turns} </p>
    </div>
  );
}

export default App;
