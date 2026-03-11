import React, { useEffect, useState } from 'react'

const Rating = ({initialrating , onRate}) => {

  const [rating, setRating] = useState(initialrating || 0)
  const handleRating = (value)=> {
    setRating(value);
    if(onRate) onratechange(value)
  }
useEffect(() => {
  if(initialrating){ setRating(initialrating)
   }
},[initialrating])
  return (
    <div>
      {Array.from({length: 6}, (_, index)=> {
        const starValue = index + 1;
        return (
          <span key = {index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-600' : 'text-gray-400'}`}
             onClick={() => handleRating(starValue)}>
            &#9733;
          </span>
        )
      })}
    </div>
  )
}

export default Rating
