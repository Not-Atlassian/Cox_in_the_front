import SideBar from "@/components/Shared/SideBar/SideBar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import ShiftAvailability from "./ShiftAvailability"


const Availability = () => {

  return (
    <>
      <div>
        <SidebarProvider>
          <SideBar />
          <SidebarInset className="flex-1 overflow-auto">
            <header className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Team Name/ Project Name/ Backlog</h1>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </header>
            <div style={{ "marginLeft": "5rem" }}>
              <ShiftAvailability/>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  )
}


export default Availability