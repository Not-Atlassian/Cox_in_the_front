import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from 'lucide-react';
import './EstimationPopup.css'
import { AppContext } from "@/context/AppContext";

const EstimationPopup = ({ title, description, handleExit, setStoryPlates }: { 
  title: string, 
  description: string,
  handleExit: () => void,
  setStoryPlates: (storyPlates: number) => void
}) => {

    const [displayedText, setDisplayedText] = useState("Thinking...");
    const [isTyping, setIsTyping] = useState<boolean>(true);
    const { getEstimation, storyPoints } = useContext(AppContext) as any;
    const [estimation, setEstimation] = useState<number>(0);

    const handleAccept = () => {
        if (storyPoints > 0) {
            setStoryPlates(storyPoints);
            handleExit();
        }
        else {
            handleExit();
        }
    }


    useEffect(() => {
        const asyncfunc =  async  () => {
            setDisplayedText("Thinking...");
            let displayMessage = "";
            if (title === "") {
                displayMessage = "Unfortunately, story point estimation could not be performed on a ticket with no title.";
            }
            else {
                await getEstimation(title, description);
                if (storyPoints > 13) {
                    if (description === "") {
                        displayMessage = `Ticket with title "${title}" and no description is estimated to be too large. Consider breaking it down into smaller tickets.`;
                    }
                    else {
                        displayMessage = `Ticket with title "${title}" and description "${description}" is estimated to be too large. Consider breaking it down into smaller tickets.`;
                    }
                }

                else {

                    if (description === "") {
                        displayMessage = `Ticket with title "${title}" and no description is estimated to be worth ${storyPoints} story points.`;
                    }

                    else {
                        displayMessage = `Ticket with title "${title}" and description "${description}" is estimated to be worth ${storyPoints} story points.`;
                    }
                }
            }

            console.log("displayMessage", displayMessage);
            console.log("estimation", estimation);
            console.log("storyPoints", storyPoints);
            console.log("storyPoints !== estimation", storyPoints !== estimation);
            if (storyPoints > 0 && storyPoints !== estimation || title === "") {
                setEstimation(storyPoints);
                let index = 0;
                const typingInterval = setInterval(() => {
                    if (index < displayMessage.length + 1) {
                        setDisplayedText(displayMessage.slice(0, index));
                        index++;
                    } else {
                        clearInterval(typingInterval);
                        setIsTyping(false);
                    }
                }, 30);

                return () => clearInterval(typingInterval);   
            }
        }

        asyncfunc();
    }, [storyPoints]);

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
                {
                    storyPoints > 0 && storyPoints <= 13 &&
                    <Button onClick={handleAccept} disabled={isTyping}>Accept</Button>
                }
                <Button variant="outline" onClick={handleExit}>Cancel</Button>
            </div>
        </div>
    );
}

export default EstimationPopup;