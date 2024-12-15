'use client'

import { useContext, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { AppContext } from '@/context/AppContext'


interface Developer {
  name: string
  availableDays: number
}

interface Adjustment {
  days: number
  reason: string
}

export default function ShiftAvailability() {

    const {users, fetchUsers} = useContext(AppContext);

    const [developers, setDevelopers] = useState<Developer[]>([
        { name: 'John Doe', availableDays: 5 },

    ])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        let devs: Developer[] = [];
        users.map((user: any) => {
          devs.push({ name: user.username, availableDays: 5 });
          console.log(devs);
        });
        setDevelopers(devs);
      }, [users]);

  
  const [adjustments, setAdjustments] = useState<Adjustment[]>([
    { days: 1, reason: 'Team Planning Meeting' }
  ])
  
  const [newAdjustment, setNewAdjustment] = useState<Adjustment>({
    days: 0,
    reason: ''
  })

  const totalDays = developers.reduce((sum, dev) => sum + dev.availableDays, 0)
  const totalAdjustments = adjustments.reduce((sum, adj) => sum + adj.days, 0)

  const handleUpdateAvailability = () => {
    // Handle update logic here
    console.log('Updating availability:', developers)
  }

  const handleAddAdjustment = () => {
    if (newAdjustment.days && newAdjustment.reason) {
      setAdjustments([...adjustments, newAdjustment])
      setNewAdjustment({ days: 0, reason: '' })
    }
  }

  const handleRemoveAdjustment = (index: number) => {
    setAdjustments(adjustments.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pl-0 pr-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-center">Shift Availability</h1>
        
        <div className="flex justify-center">
          <Select defaultValue="shift1">
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shift1">Shift 1</SelectItem>
              <SelectItem value="shift2">Shift 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center items-center gap-6 text-base text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{totalDays} Available Days</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{totalAdjustments} Adjustments</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{totalDays + totalAdjustments} Total Days</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {developers.map((developer, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-base text-muted-foreground">Developer Name</label>
              <Input
                value={developer.name}
                onChange={(e) => {
                  const newDevelopers = [...developers]
                  newDevelopers[index].name = e.target.value
                  setDevelopers(newDevelopers)
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-muted-foreground">Available Days</label>
              <Input
                type="number"
                value={developer.availableDays}
                onChange={(e) => {
                  const newDevelopers = [...developers]
                  newDevelopers[index].availableDays = parseInt(e.target.value)
                  setDevelopers(newDevelopers)
                }}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button onClick={handleUpdateAvailability}>Update Availability</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Adjustments</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-base text-muted-foreground">Days</label>
            <Input
              type="number"
              value={newAdjustment.days || ''}
              onChange={(e) => setNewAdjustment({
                ...newAdjustment,
                days: parseInt(e.target.value)
              })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-base text-muted-foreground">Reason</label>
            <Textarea
              value={newAdjustment.reason}
              onChange={(e) => setNewAdjustment({
                ...newAdjustment,
                reason: e.target.value
              })}
            />
          </div>

          <Button onClick={handleAddAdjustment}>Add Adjustment</Button>
        </div>

        <div className="space-y-2">
          {adjustments.map((adjustment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <span className="text-base">
                {adjustment.days} {adjustment.days === 1 ? 'day' : 'days'} - {adjustment.reason}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveAdjustment(index)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}