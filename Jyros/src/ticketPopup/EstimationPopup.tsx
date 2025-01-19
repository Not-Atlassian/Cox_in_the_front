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
        getEstimation(title, description);
    }, []);

    useEffect(() => {
        const asyncfunc =  async  () => {
            setDisplayedText("Thinking...");
            let displayMessage = "";
            if (title === "") {
                displayMessage = "Unfortunately, story point estimation could not be performed on a ticket with no title.";
            }
            else {
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

            setEstimation(storyPoints);
            // console.log("displayMessage", displayMessage);
            // console.log("estimation", estimation);
            // console.log("storyPoints", storyPoints);
            // console.log("storyPoints !== estimation", storyPoints !== estimation);

            // necessary condition in order to prevent duplicated triggers of useEffect to try to print 
            // their respective messages
            // estimation doesn't actually store anything besides 0 and 1, storyPoints is initialised 
            // in AppContext with -1 and is set to -1 when no input is provided for the model
            // I don't fully understand why it works, and I think that some things I do are not required, 
            // but I shall not be the one to figure this out
            if (estimation > 0 && storyPoints !== estimation || title === "" && storyPoints === -1) {
                console.log("displayMessage", displayMessage);
                console.log("estimation", estimation);
                console.log("storyPoints", storyPoints);
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
    }, [title, description, storyPoints]);

    useEffect(() => {
        console.log("initialization")
        setEstimation(1);
    }, []);

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