import { useContext } from "react"
import { GeneralContext } from "../../../App"

function QuestionAndAnswer() {
    const{setLoader,isDarkMode,isSmallScreen}=useContext(GeneralContext) 

    return (
        <div className={`main-content ${isDarkMode ? 'dark' : 'light'}`}>
         <div className="category-container">
            <img src={isSmallScreen?'https://noyhasade.b-cdn.net/wp-content/uploads/2022/12/Mob_categroey_FAQ.jpg':"https://noyhasade.b-cdn.net/wp-content/uploads/2022/12/Des_categroey_FAQ.jpg"} alt="bakery-img"/>
                <div className="cover-title">
                    <h1>Q&A</h1>
                    <p>Freshly baked goods crafted with care from the finest ingredients, delivered swiftly to your doorstep.</p>
                </div>
            </div>

            <div></div>
        </div>
    )
}

export default QuestionAndAnswer
