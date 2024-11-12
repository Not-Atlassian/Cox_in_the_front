import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";



const JyrosSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <h2>Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li>Users</li>
                        <li>Settings</li>
                    </ul>
                </nav>
            </SidebarContent>
        </Sidebar>
    );
}

export default JyrosSidebar;