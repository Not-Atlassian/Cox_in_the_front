import { Archive, ClipboardList, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useNavigate, useLocation } from 'react-router-dom' // Import useLocation
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="border-b p-4 pl-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">TN</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-xl">Team Name</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="pl-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => navigate("/backlog")}
              className={`justify-start text-base ${
                location.pathname === "/backlog" ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
            >
              <ClipboardList className="h-5 w-5 mr-3" />
              <span>Backlog</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => navigate("/board")}
              className={`justify-start text-base ${
                location.pathname === "/board" ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
            >
              <Archive className="h-5 w-5 mr-3" />
              <span>Board</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => navigate("/availability")}
              className={`justify-start text-base ${
                location.pathname === "/availability" ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              <span>Availability</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideBar
