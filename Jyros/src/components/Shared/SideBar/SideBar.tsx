import { Archive, ChevronLeft, ClipboardList, MoreVertical, Plus, Users, Utensils } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

const SideBar = () => {
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
      <SidebarMenuButton className="justify-start text-base">
        <ClipboardList className="h-5 w-5 mr-3" />
        <span>Backlog</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton className="justify-start text-base" isActive>
        <Archive className="h-5 w-5 mr-3" />
        <span>Board</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton className="justify-start text-base">
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