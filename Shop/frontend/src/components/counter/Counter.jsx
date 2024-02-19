import { useState } from "react";
import './counter.css'
function Counter() {
    const [count, setCount] = useState(0);
    if(count<0){
        setCount(0)
    }
    return (
        <div className="counter">
            <button className="counter-btn" onClick={(ev) => 
            {setCount(count - 1);ev.stopPropagation()}}>-</button>

            <p>{count}</p>

            <button className="counter-btn" onClick={(ev) => 
            {setCount(count + 1);ev.stopPropagation()}}>+</button>
            
        </div>
    )
}

export default Counter
