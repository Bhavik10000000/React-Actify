import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  Settings2Icon,
  CommandIcon,
} from "lucide-react";
import { useContext } from "react";
import { MyContext } from "@/context/MyContext";

// interface Value {
//   name: string;
//   email: string;
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const contextValue = useContext(MyContext) as any;
  const name = contextValue?.name || "Bhavik";
  const email = contextValue?.email || "bhavik@gmail.com";
  const data = {
    user: {
      name: name,
      email: email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: <LayoutDashboardIcon />,
      },
      {
        title: "Users",
        url: "#",
        icon: <UsersIcon />,
      },
      {
        title: "Settings",
        url: "#",
        icon: <Settings2Icon />,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
