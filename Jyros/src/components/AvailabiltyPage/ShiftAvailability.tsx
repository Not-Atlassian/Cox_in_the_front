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
import { parse } from 'path'


interface Developer {
  id: number
  name: string
  availableDays: number
}

interface Adjustment {
  adjustmentPoints: number
  reason: string
}

export default function ShiftAvailability() {

    const {usersInShift, fetchUsersInShift, fetchUserAvailability, shifts, fetchShifts, fetchShiftAdjustment, addAdjustment, updateAvailability, shiftAdjustment, fetchShiftAdjustmentList, setAdjustments,adjustments} = useContext(AppContext) as any;

    const [currentShift, setCurrentShift] = useState<number>(1);
    const [developers, setDevelopers] = useState<Developer[]>([])

    useEffect(() => {
        fetchUsersInShift(currentShift);
        fetchShifts();
        fetchShiftAdjustment(currentShift);
        const fetchTest = async () => {
        let test = await fetchShiftAdjustmentList(currentShift);
        console.log("Test-----------------", test);
        }
        fetchTest();
        
      }, [fetchUsersInShift, fetchShifts, currentShift]);
      
      useEffect(() => {
        const fetchAvailability = async () => {
          let newDevelopers: Developer[] = [];
          for (let i = 0; i < usersInShift.length; i++) {
            const user = usersInShift[i];
            const availability = await fetchUserAvailability(user.userId, currentShift);
            newDevelopers.push({
              id: user.userId,
              name: user.username,
              availableDays: availability.availabilityPoints
            });
          }
          setDevelopers(newDevelopers);
          const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
          sleep(1000);
          // setTotalDays(developers.reduce((sum, dev) => sum + dev.availableDays, 0));
      };
  
      if (usersInShift.length > 0) {
        fetchAvailability();
      }
    }, [usersInShift, fetchUserAvailability]);


    useEffect(() => {
      setTotalDays(developers.reduce((sum, dev) => sum + dev.availableDays, 0));
    }, [developers])
  
  // const [adjustments, setAdjustments] = useState<Adjustment[]>([
  //   { days: 1, reason: 'Team Planning Meeting' }
  // ])
  
  const [newAdjustment, setNewAdjustment] = useState<Adjustment>({
    adjustmentPoints: 0,
    reason: ''
  })

  // let totalDays = developers.reduce((sum, dev) => sum + dev.availableDays, 0)
  const [totalDays, setTotalDays] = useState(0);


  const handleUpdateAvailability = () => {
    developers.forEach(developer => {
      let newAvailability = { userId : developer.id,sprintId: currentShift, availabilityPoints: developer.availableDays }
      updateAvailability(developer.id, currentShift, newAvailability);
    })
  }

  const handleAddAdjustment = () => {
    if (newAdjustment.adjustmentPoints && newAdjustment.reason) {
      setAdjustments([...adjustments, newAdjustment])
      setNewAdjustment({ adjustmentPoints: 0, reason: '' })
      let adjustmentToAdd = {
        AdjustmentPoints: newAdjustment.adjustmentPoints,
        reason: newAdjustment.reason
      }
      addAdjustment(currentShift, adjustmentToAdd);
      setTotalDays(totalDays - newAdjustment.adjustmentPoints);


    }
  }

  const handleRemoveAdjustment = (index: number) => {
    setAdjustments(adjustments.filter((_, i) => i !== index))
  }

  const onShiftChange = (e: any) => {
    setDevelopers([]);
    setAdjustments([]);
    setCurrentShift(e);

  }

  return (
    <div className="max-w-4xl mx-auto p-6 pl-0 pr-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-center">Shift Availability</h1>
        <div className="flex justify-center">
          <Select
            value={currentShift.toString()}
            onValueChange={onShiftChange}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              {shifts.map((shift: any) => (
          <SelectItem key={shift.sprintId} value={shift.sprintId.toString()}>
            {shift.name}
          </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center items-center gap-6 text-base text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{totalDays} Availablilty Points</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{shiftAdjustment} Adjustments</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{totalDays - shiftAdjustment} Total Days</span>
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
              <label className="text-base text-muted-foreground">Availabilty Points</label>
              <Input
                type="number"
                value={developer.availableDays !== undefined ? developer.availableDays : 0}
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
              value={newAdjustment.adjustmentPoints || ''}
              onChange={(e) => setNewAdjustment({
                ...newAdjustment,
                adjustmentPoints: parseInt(e.target.value)
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
                {adjustment.adjustmentPoints} {adjustment.adjustmentPoints === 1 ? 'day' : 'days'} - {adjustment.reason}
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