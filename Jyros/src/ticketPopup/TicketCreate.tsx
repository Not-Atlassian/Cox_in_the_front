'use client'

import { SetStateAction, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ChevronDown, MoreVertical, Plus, Zap } from 'lucide-react'
import { Utensils, UtensilsCrossed } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CrossingKnives from "./AnimationKnives/CrossingKnives"
import EstimationPopup from "./EstimationPopup"
import { DialogTitle } from "@radix-ui/react-dialog"

const ForkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
  </svg>
)
// #TODO - this is the low priority ^

export default function Component() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [comments, setComments] = useState("")
  const [showAnimation, setShowAnimation] = useState(false)
  const [assignee, setAssignee] = useState("Unassigned")
  const [reporter, setReporter] = useState("Unassigned")
  const [team, setTeam] = useState("Unassigned")
  const [shift, setShift] = useState("(To be implemented)")
  const [storyPlates, setStoryPlates] = useState(0)
  const [parent, setParent] = useState("None")
  const [priority, setPriority] = useState("Select priority")
  const [status, setStatus] = useState("To Do")

  const [openEstimateDialog, setOpenEstimateDialog] = useState(false);
  

  const handlePriorityChange = (value: string) => setPriority(value)
  const handleStatusChange = (value: string) => setStatus(value)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cooking":
        return "bg-[#F7FFA6] text-black"
      case "In Plating":
        return "bg-[#FFB992] text-black"
      case "Bonne appétit":
        return "bg-[#FF8E8E] text-black"
      case "To Do":
      default:
        return "bg-[#C1FFB8] text-black"
    }
  }

  const getPriorityIcon = (value: string) => {
    switch (value) {
      case "High":
        return <UtensilsCrossed className="h-4 w-4" />
      case "Medium":
        return <Utensils className="h-4 w-4" />
      case "Low":
        return <ForkIcon />
      default:
        return null
    }
  }

  const [teamName, setTeamName] = useState("Team AB")
  const [projectName, setProjectName] = useState("Project X")
  const [featureName, setFeatureName] = useState("Feature Y")
  const [epicName, setEpicName] = useState("Epic Z")
  const [ticketName, setTicketName] = useState("Ticket #123")

  const handleInputChange = (setter: (value: SetStateAction<string>) => void) => (e: { target: { value: any } }) => setter(e.target.value)
  const handleNumberChange = (setter: (value: SetStateAction<number>) => void) => (e: { target: { value: any } }) => {
    const value = Number(e.target.value)
    setter(value > 5 ? 5 : value)
  }

  const handleTeamChange = (e: { target: { value: SetStateAction<string> } }) => {
    setTeam(e.target.value)
  }

  const handleParentChange = (e: { target: { value: SetStateAction<string> } }) => {
    setParent(e.target.value)
  }

  const handleTicketCreation = () => {
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
      setOpen(false)
    }, 4000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleExitEstimate = () => {
    setOpenEstimateDialog(false);
  }
  
  return (
    <>
      <div className={`p-4 ${showAnimation ? "opacity-10" : ""}`}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-4 bg-[#F8F9FA] border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8 bg-[#212529] text-white rounded-md hover:bg-[#343A40]">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span>{teamName} / {projectName} / {featureName} / {epicName} / {ticketName}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-[#212529] text-white rounded-md hover:bg-[#343A40]">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="p-6">
              <Input
                className="text-xl font-semibold border-0 px-0 mb-4"
                placeholder="Input title of ticket"
                value={title}
                onChange={handleInputChange(setTitle)}
              />
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <Dialog open={openEstimateDialog} onOpenChange={setOpenEstimateDialog}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm" className="bg-[#F1F3F5] hover:bg-[#E9ECEF] text-gray-700">
                        <ChevronDown className="h-3 w-3" />
                        <Zap className="mr-2 h-3 w-3" />
                        <DialogTitle>
                        Estimate with AI
                        </DialogTitle>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-4">
                      <EstimationPopup title = {title} description = {description} handleExit = {handleExitEstimate} setStoryPlates = {setStoryPlates} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="secondary" size="sm" className="bg-[#F1F3F5] hover:bg-[#E9ECEF] text-gray-700">
                      Planning Poker
                  </Button>
                </div>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className={`w-[200px] ${getStatusColor(status)} border-0`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="Cooking">Cooking</SelectItem>
                    <SelectItem value="In Plating">In Plating</SelectItem>
                    <SelectItem value="Bonne appétit">Bonne appétit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-[1fr,300px] gap-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                    <Textarea
                      id="description"
                      className="mt-2 min-h-[200px]"
                      placeholder="Add description here"
                      value={description}
                      onChange={handleInputChange(setDescription)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="comments" className="text-base font-semibold">Comments</Label>
                    <Label htmlFor="comments" className="block text-sm text-gray-500 mt-1">Your message</Label>
                    <Textarea
                      id="comments"
                      className="mt-1"
                      placeholder="Type your message here"
                      value={comments}
                      onChange={handleInputChange(setComments)}
                    />
                  </div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                      <Label className="text-sm">Assignee</Label>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{assignee}</span>
                        <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                      <Label className="text-sm">Reporter</Label>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{reporter}</span>
                        <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                      <Label className="text-sm">Team</Label>
                      <Input
                        value={team}
                        onChange={handleTeamChange}
                        className="h-8"
                      />
                    </div>
                    <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                      <Label className="text-sm">Shift</Label>
                      <span className="text-sm text-gray-600">{shift}</span>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                      <Label className="text-sm">Story Plates</Label>
                      <Input
                        type="number"
                        value={storyPlates}
                        onChange={handleNumberChange(setStoryPlates)}
                        max={5}
                        className="h-8"
                      />
                    </div>
                    <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                      <Label className="text-sm">Parent</Label>
                      <Input
                        value={parent}
                        onChange={handleParentChange}
                        className="h-8"
                      />
                    </div>
                    <div className="grid grid-cols-[100px,1fr] items-center gap-2">
                      <Label htmlFor="priority-select" className="text-sm">Priority</Label>
                      <Select value={priority} onValueChange={handlePriorityChange}>
                        <SelectTrigger id="priority-select" className="w-full h-8">
                          <SelectValue>
                            {priority !== "Select priority" && getPriorityIcon(priority)}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Select priority" disabled>Select priority</SelectItem>
                          <SelectItem value="High">
                            <div className="flex items-center">
                              <UtensilsCrossed className="mr-2 h-4 w-4" />
                              <span>High</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Medium">
                            <div className="flex items-center">
                              <Utensils className="mr-2 h-4 w-4" />
                              <span>Medium</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Low">
                            <div className="flex items-center">
                              <ForkIcon />
                              <span className="ml-2">Low</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleTicketCreation}>Create Ticket</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {showAnimation && <CrossingKnives />}
    </>
  )
}