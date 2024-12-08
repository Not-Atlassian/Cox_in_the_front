import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronUp, Zap, Trash } from "lucide-react"

export default function TicketView({id, handleClose}: {id: number, handleClose: () => void}) {
  const [ticketTitle, setTicketTitle] = useState("BLA BLA BLA BLA BLA BLA bla bla bla bal bal abl")
  const [ticketDescription, setTicketDescription] = useState("This is an example of a ticket description. This is an example of a ticket description. This is an example of a ticket description.")
  const [comment, setComment] = useState("")
  const [assignee, setAssignee] = useState("Ion Ionescu")
  const [reporter, setReporter] = useState("Mihai Eminescu")
  const [team, setTeam] = useState("NotAtlassian")
  const [shift, setShift] = useState("(To be implemented)")
  const [storyPlates, setStoryPlates] = useState(5)
  const [parent, setParent] = useState("blzbalbal bnlab")
  const [priority, setPriority] = useState("Select priority")
  const [status, setStatus] = useState("To Do")

  const [teamName, setTeamName] = useState("Team A")
  const [projectName, setProjectName] = useState("Project X")
  const [featureName, setFeatureName] = useState("Feature Y")
  const [epicName, setEpicName] = useState("Epic Z")
  const [ticketName, setTicketName] = useState("Ticket #123")

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await fetch(`http://localhost:5047/api/Ticket?id=${id}`);
      if(!response.ok) {
        console.error("Error fetching ticket data");
        return;
      }
      const data = await response.json();
      setTicketTitle(data[0].title);
      setTicketDescription(data[0].description);
      setStoryPlates(data[0].storyPoints);
      setStatus(data[0].status);
    };
    asyncFunc();
  }, [id])

  const handleDeleteTicket = () => {
    console.log("Ticket deleted");
    // Add the logic for ticket deletion here
    // For example, you could call an API to delete the ticket or set a state to remove the ticket
    fetch(`http://localhost:5047/api/Ticket?id=${id}`, {
      method: "DELETE",
    });
    handleClose();
  }

  const handleEstimateAI = () => {
    console.log("Estimate with AI clicked")
  }

  const handlePlanningPoker = () => {
    console.log("Planning Poker clicked")
  }

  return (
    <Dialog defaultOpen onOpenChange={(open)=>{if(!open) handleClose()}}>
      <DialogContent className="max-w-4xl p-0 [&>button]:hidden">
        <DialogHeader className="p-4 bg-[#F8F9FA]">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-[#212529] text-white rounded-md hover:bg-[#343A40]">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>{teamName} / {projectName} / {featureName} / {epicName} / {ticketName}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 bg-[#212529] text-white rounded-md hover:bg-[#343A40]"
              onClick={handleDeleteTicket}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-start justify-between gap-4 pt-2">
            <DialogTitle className="text-xl font-semibold leading-relaxed">
              Title of Ticket: {ticketTitle}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="secondary"
              className="gap-1 bg-[#F1F3F5] text-gray-700 hover:bg-[#E9ECEF]"
              onClick={handleEstimateAI}
            >
              <Zap className="h-3 w-3" />
              Estimate with AI
            </Button>
            <Button
              variant="secondary"
              className="bg-[#F1F3F5] text-gray-700 hover:bg-[#E9ECEF]"
              onClick={handlePlanningPoker}
            >
              Planning Poker
            </Button>
            <div className="ml-auto">
              <Badge variant="outline" className="border-green-500 text-green-600 bg-white">
                To Do
              </Badge>
            </div>
          </div>
        </DialogHeader>
        <div className="grid md:grid-cols-[1fr,300px]">
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Description</h3>
                <div className="mt-2 rounded-lg bg-[#F8F9FA] p-4">
                  <p className="text-gray-600">{ticketDescription}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Comments</h3>
                <div className="mt-2">
                  <Label htmlFor="comment" className="text-base">Your message</Label>
                  <Textarea
                    id="comment"
                    className="mt-1"
                    placeholder="Type your message here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-l border-gray-200">
            <div className="p-4">
              <h3 className="text-xl font-semibold">Details</h3>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                  <Label className="text-base">Assignee</Label>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage alt={assignee} />
                      <AvatarFallback>{assignee.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{assignee}</span>
                  </div>
                </div>
                <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                  <Label className="text-base">Reporter</Label>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage alt={reporter} />
                      <AvatarFallback>{reporter.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{reporter}</span>
                  </div>
                </div>
                <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                  <Label className="text-base">Team</Label>
                  <span>{team}</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                  <Label className="text-base">Shift</Label>
                  <span className="text-gray-600">{shift}</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                  <Label className="text-base">Story Plates</Label>
                  <span className="text-gray-600">{storyPlates}</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                  <Label className="text-base">Parent</Label>
                  <span>{parent}</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                  <Label className="text-base">Priority</Label>
                  <span>{priority}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
