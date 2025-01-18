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
    const { getEstimation, storyPoints } = useContext(AppContext) as any;

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
            if (storyPoints > 0 || title === "") {
                setDisplayedText(displayMessage);
            }
        }

        asyncfunc();
    }, [title, description, storyPoints]);

    return (
        <div className="estimation-popup">
            <div className="bot-icon">
                <Bot size={48} />
            </div>
            <div className="message-container">
                <p className="message">{displayedText}</p>
            </div>
            <div className="button-container">
                {
                    storyPoints > 0 && storyPoints <= 13 &&
                    <Button onClick={handleAccept}>Accept</Button>
                }
                <Button variant="outline" onClick={handleExit}>Cancel</Button>
            </div>
        </div>
    );
}

export default EstimationPopup;