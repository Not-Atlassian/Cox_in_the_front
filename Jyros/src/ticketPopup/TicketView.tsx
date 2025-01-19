import { useContext, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronUp, Zap, Trash, ChevronDown, HelpCircle } from "lucide-react"

import { AppContext } from "@/context/AppContext"
import { Context } from "vm"
import EstimationPopup from "./EstimationPopup"
import EstimatorDetailsPopup from "./EstimatorDetailsPopup"

export default function TicketView({ id, handleClose }: { id: number, handleClose: () => void }) {
  const [ticketTitle, setTicketTitle] = useState("BLA BLA BLA BLA BLA BLA bla bla bla bal bal abl")
  const [ticketDescription, setTicketDescription] = useState("This is an example of a ticket description. This is an example of a ticket description. This is an example of a ticket description.")
  const [comment, setComment] = useState("")
  const [assignee, setAssignee] = useState("Ion Ionescu")
  const [reporter, setReporter] = useState("Mihai Eminescu")
  const [team, setTeam] = useState("NotAtlassian")
  const [shift, setShift] = useState(0)
  const [storyPlates, setStoryPlates] = useState(5)
  const [parent, setParent] = useState("blzbalbal bnlab")
  const [priority, setPriority] = useState("Select priority")
  const [status, setStatus] = useState("To Do")

  const [teamName, setTeamName] = useState("Team A")
  const [projectName, setProjectName] = useState("Project X")
  const [featureName, setFeatureName] = useState("Feature Y")
  const [epicName, setEpicName] = useState("Epic Z")
  const [ticketName, setTicketName] = useState("Ticket #123")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteDialogOpen2, setIsDeleteDialogOpen2] = useState(false);
  const [isDeleteDialogOpen3, setIsDeleteDialogOpen3] = useState(false);

  const context = useContext(AppContext);
  const { removeTicket, fetchTicket, ticket } = context as Context;

  const [dialogPosition2, setDialogPosition2] = useState({ top: 0, left: 0 });
  const [dialogPosition3, setDialogPosition3] = useState({ top: 0, left: 0 });
  
  const [openEstimateDialog, setOpenEstimateDialog] = useState(false);
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  useEffect(() => {
    setDialogPosition2(generateRandomPosition());
    setDialogPosition3(generateRandomPosition());
  }, []);

  const generateRandomPosition = () => {
    const top = Math.floor(Math.random() * (window.innerHeight - 200));
    const left = Math.floor(Math.random() * (window.innerWidth - 300));
    return { top, left };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!ticket || ticket.id !== id)
        await fetchTicket(id);
    };
    fetchData();
  }, [id, fetchTicket])

  useEffect(() => {
    if (ticket) {
      setTicketTitle(ticket.title);
      setTicketDescription(ticket.description);
      setStoryPlates(ticket.storyPoints);
      setStatus(ticket.status);
      setShift(ticket.sprintId)
    } else {
      console.log("Ticket not found");
    }
  }, [ticket]);

  const handleDeleteTicket = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Perform the delete action here

    setIsDeleteDialogOpen(false);
    handleDeleteTicket2();
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteTicket2 = () => {
    setIsDeleteDialogOpen2(true);
  };

  const confirmDelete2 = () => {
    // Perform the delete action here

    setIsDeleteDialogOpen2(false);
    handleDeleteTicket3();

  };

  const cancelDelete2 = () => {
    setIsDeleteDialogOpen2(false);
  };

  const handleDeleteTicket3 = () => {
    setIsDeleteDialogOpen3(true);
  };

  const confirmDelete3 = () => {
    // Perform the delete action here
    console.log("Ticket deleted");
    removeTicket(id);
    setIsDeleteDialogOpen3(false);
    handleClose();
  };

  const cancelDelete3 = () => {
    setIsDeleteDialogOpen3(false);
  };

  const handleExitEstimate = () => {
    setOpenEstimateDialog(false);
  }

  








































































































































































































  // NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA NIGGA











































































































































  




















  const handleEstimateAI = () => {
    console.log("Estimate with AI clicked")
  }

  const handlePlanningPoker = () => {
    console.log("Planning Poker clicked")
  }

  const statusColorClass = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-yellow-200 text-yellow-800";
      case "Cooking":
        return "bg-blue-200 text-blue-800";
      case "In Plating":
        return "bg-green-200 text-green-800";
      case "Bon appétit":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={(open) => { if (!open) handleClose() }}>
      <DialogContent className="max-w-4xl p-0 [&>button]:hidden">
        <DialogHeader className="p-4 bg-[#F8F9FA]">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-[#212529] text-white rounded-md hover:bg-[#343A40]" onClick={handleClose}>
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
            <Dialog open={openEstimateDialog} onOpenChange={setOpenEstimateDialog}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-[#F1F3F5] hover:bg-[#E9ECEF] text-gray-700">
                  <ChevronDown className="h-3 w-3" />
                  <Zap className="mr-2 h-3 w-3" />
                  <DialogTitle className="text-sm">
                    Estimate with AI
                  </DialogTitle>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4">
                <EstimationPopup title={ticketTitle} description={ticketDescription} handleExit={handleExitEstimate} setStoryPlates={setStoryPlates} />
              </DialogContent>
            </Dialog>

            <Dialog open={openHelpDialog} onOpenChange={setOpenHelpDialog}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-[#F1F3F5] hover:bg-[#E9ECEF] text-gray-700">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4 w-full h-full max-w-none max-h-none overflow-auto">
                <div className="w-full h-full">
                  <EstimatorDetailsPopup />
                </div>
              </DialogContent>
            </Dialog>
            {/*<Button
              variant="secondary"
              className="gap-1 bg-[#F1F3F5] text-gray-700 hover:bg-[#E9ECEF]"
              onClick={handleEstimateAI}
            >
              <Zap className="h-3 w-3" />
              Estimate with AI
            </Button>*/}
            <Button
              variant="secondary"
              className="bg-[#F1F3F5] text-gray-700 hover:bg-[#E9ECEF]"
              onClick={handlePlanningPoker}
            >
              Planning Poker
            </Button>
            <div className="ml-auto">
              <Badge variant="outline" className={statusColorClass(status)}>
                {status}
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
      {isDeleteDialogOpen && (
        <Dialog defaultOpen onOpenChange={(open) => { if (!open) cancelDelete() }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {isDeleteDialogOpen2 && (
        <Dialog defaultOpen onOpenChange={(open) => { if (!open) cancelDelete2() }}>
          <DialogContent style={{ position: 'absolute', top: dialogPosition2.top, left: dialogPosition2.left }}>
            <DialogHeader>
              <DialogTitle>Are you really sure ?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={confirmDelete2}>Delete</Button>
              <Button variant="destructive" onClick={cancelDelete2}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isDeleteDialogOpen3 && (
        <Dialog defaultOpen onOpenChange={(open) => { if (!open) cancelDelete3() }}>
          <DialogContent style={{ position: 'absolute', top: dialogPosition3.top, left: dialogPosition3.left }}>
            <DialogHeader>
              <DialogTitle>Are you really, really, reeeeaaally sure ?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="default" onClick={confirmDelete3}>Delete</Button>
              <Button variant="default" onClick={cancelDelete3}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </Dialog>
  )
}
