import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus } from "lucide-react";
import CrossingKnives from "./AnimationKnives/CrossingKnives"; // Import the CrossingKnives component

export default function TicketCreate() {
  const [open, setOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // state for showing the animation

  // Input field states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [assignee, setAssignee] = useState("Unassigned");
  const [reporter, setReporter] = useState("Unassigned");
  const [team, setTeam] = useState("Unassigned");
  const [shift, setShift] = useState("");
  const [storyPoints, setStoryPoints] = useState(0);
  const [parent, setParent] = useState("None");
  const [priority, setPriority] = useState("Medium");

  // Handlers for input fields
  const handleTitleChange = (e: { target: { value: SetStateAction<string> } }) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: { target: { value: SetStateAction<string> } }) =>
    setDescription(e.target.value);
  const handleCommentsChange = (e: { target: { value: SetStateAction<string> } }) =>
    setComments(e.target.value);
  const handleAssigneeChange = (e: { target: { value: SetStateAction<string> } }) =>
    setAssignee(e.target.value);
  const handleReporterChange = (e: { target: { value: SetStateAction<string> } }) =>
    setReporter(e.target.value);
  const handleTeamChange = (e: { target: { value: SetStateAction<string> } }) =>
    setTeam(e.target.value);
  const handleShiftChange = (e: { target: { value: SetStateAction<string> } }) =>
    setShift(e.target.value);
  const handleStoryPointsChange = (e: { target: { value: string } }) =>
    setStoryPoints(Number(e.target.value)); // Convert the string to a number
  const handleParentChange = (e: { target: { value: SetStateAction<string> } }) =>
    setParent(e.target.value);
  const handlePriorityChange = (e: { target: { value: SetStateAction<string> } }) =>
    setPriority(e.target.value);

  const handleTicketCreation = () => {
    // Show the animation
    setShowAnimation(true);

    // Simulate a delay to match the animation duration before closing
    setTimeout(() => {
      setShowAnimation(false); // Hide animation after a short delay
      setOpen(false); // Close the ticket creation dialog
    }, 4000); // Assuming the animation duration is 3 seconds
  };

  return (
    <div className="p-4">
      <Dialog 
      open={open} 
      onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Ticket
          </Button>
        </DialogTrigger>
        <DialogContent
          className={`max-w-3xl transition-opacity duration-500 ${showAnimation ? "opacity-20" : "opacity-100"}`} // Apply opacity change with smooth transition
        >
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Go back</span>
              </Button>
              <DialogTitle className="text-xl font-semibold">Team Name/ Project Name/ Feature/ Epic/ Ticket</DialogTitle>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-[2fr,1fr] gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Input
                  className="text-lg"
                  placeholder="Input title of ticket"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm">
                  <span className="sr-only">Estimate with AI</span>
                  AI
                </Button>
                <Button variant="secondary" size="sm">Planning Poker</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-[200px]"
                  placeholder="Add description here"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Type your message here"
                  value={comments}
                  onChange={handleCommentsChange}
                />
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="space-y-4">
                {/* Rest of the input fields */}
                <div className="space-y-2">
                  <Label htmlFor="story-points">Story Points</Label>
                  <Input
                    id="story-points"
                    type="number"
                    value={storyPoints}
                    onChange={handleStoryPointsChange}
                    min={0}
                    max={5}
                  />
                </div>
                {/* Other fields */}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={handleTicketCreation}
            >
              Create Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Render the crossing knives animation if showAnimation is true */}
      {showAnimation && <CrossingKnives />}
    </div>
  );
}
