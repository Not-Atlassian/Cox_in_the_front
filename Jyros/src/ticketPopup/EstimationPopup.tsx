import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from 'lucide-react';
import './EstimationPopup.css'

const EstimationPopup = ({ title, description, handleExit, setStoryPlates }: { 
  title: string, 
  description: string,
  handleExit: () => void,
  setStoryPlates: (storyPlates: number) => void
}) => {
    const [estimation, setEstimation] = useState<number>(0);
    const [displayedText, setDisplayedText] = useState("Thinking...");
    const [isTyping, setIsTyping] = useState(true);

    const handleAccept = () => {
        if (estimation > 0) {
            setStoryPlates(estimation);
            handleExit();
        }
        else {
            handleExit();
        }
    }


    useEffect(() => {
        //TODO: Get request to change estimation
        const asyncfunc =  async  () => {
            let displayMessage = "";
        if(title !== ""){
            const response = await fetch(`http://localhost:7048/api/Ticket/EstimateStoryPoints?title=${title}&description=${description}`);
            const data = await response.json();
            setEstimation(data);
        }
        if (title === "") {
            displayMessage = "Unfortunately, story point estimation could not be performed on a ticket with no title.";
        } else if (description === "") {
            displayMessage = `Ticket with title "${title}" and no description is estimated to be worth ${estimation} story points.`;
        } else {
            displayMessage = `Ticket with title "${title}" and description "${description}" is estimated to be worth ${estimation} story points.`;
        }

        // let index = 0;
        // const typingInterval = setInterval(() => {
        //     if (index < displayMessage.length - 1) {
        //         setDisplayedText((prev) => prev + displayMessage[index]);
        //         index++;
        //     } else {
        //         clearInterval(typingInterval);
        //         setIsTyping(false);
        //     }
        // }, 30);

        //return () => clearInterval(typingInterval);    
        setDisplayedText(displayMessage);
        setIsTyping(false);
        }

        asyncfunc();
    }, [title, description, estimation]);

    return (
        <div className="estimation-popup">
            <div className="bot-icon">
                <Bot size={48} />
            </div>
            <div className="message-container">
                <p className="message">{displayedText}</p>
                {isTyping && <span className="typing-indicator">▋</span>}
            </div>
            <div className="button-container">
                <Button onClick={handleAccept} disabled={isTyping}>Accept</Button>
                <Button variant="outline" onClick={handleExit}>Cancel</Button>
            </div>
        </div>
    );
}

export default EstimationPopup;