import React from 'react'
import "./singleCards.css";


export default function SingleCard({card, handleChoice, flipped, disabled}) {
   
    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
       
    }


  return (
    
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
            {
         
           
              <div>
                <img className="front" src={card.src} alt="card front" />
                <img className="back" 
                src="%PUBLIC_URL%/images/cover.png" 
                alt="card back" 
                onClick={handleClick}/>
              </div>
          
         
        }
            </div>
       
        </div>
        
      
 
  )
}
