import React from 'react';
import Sidebar from '@/components/layout/Sidebar'; // Custom component
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from 'react-router-dom';
import { Settings, User, LogOut, Bell, LayoutDashboard, FileText, MessageSquare, Package, Users, LineChart, Menu, Search, CircleUser } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    // In a real app: clear session/token from localStorage or context
    navigate('/login');
  };

  const sidebarNavItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview", current: true },
    { to: "#", icon: Package, label: "Orders" },
    { to: "#", icon: FileText, label: "Reports" },
    { to: "#", icon: Users, label: "Customers" },
    { to: "#", icon: LineChart, label: "Analytics" },
    { to: "#", icon: MessageSquare, label: "Messages" },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar title="Acme Inc." className="hidden md:block border-r bg-muted/40">
        {sidebarNavItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${item.current ? 'bg-muted text-primary' : ''}`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
        <div className="mt-auto"> {/* Pushes settings to bottom */}
           <Link
             to="#"
             className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
           >
             <Settings className="h-4 w-4" />
             Settings
           </Link>
        </div>
      </Sidebar>
      
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {/* Mobile Sidebar Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <Sidebar title="Acme Inc." className="block md:hidden border-r-0">
                 {sidebarNavItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${item.current ? 'bg-muted text-primary' : ''}`}
                    >
                        <item.icon className="h-5 w-5" /> {/* Slightly larger for mobile touch */}
                        {item.label}
                    </Link>
                 ))}
                 <div className="mt-auto">
                    <Link
                        to="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                 </div>
                </Sidebar>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation Menu (optional, can be removed if sidebar is primary) */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard" aria-label="Dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                 <Link to="#" aria-label="Projects">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="w-full flex-1">
            <form className="ml-auto hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search dashboard..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <Button variant="outline" size="icon" className="shrink-0">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full shrink-0">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('#')}> <User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('#')}> <Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl text-slate-800 dark:text-slate-100">Dashboard Overview</h1>
          </div>
          <div
            className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm p-4 md:p-8"
            x-chunk="dashboard-02-chunk-1" // for shadcn examples, can be removed
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome, User!</CardTitle>
                  <CardDescription>Here's a quick look at your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is a placeholder for key metrics or welcome information. You can customize this area.</p>
                  <img src="https://images.unsplash.com/photo-1543286386-71314a475272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Dashboard illustrative graph" className="mt-4 rounded-lg shadow-md aspect-video object-cover" />
                </CardContent>
                 <CardFooter>
                    <Button>View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Note</CardTitle>
                  <CardDescription>Jot down something important.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="quickNoteDashboard">Your Note</Label>
                  <Textarea id="quickNoteDashboard" placeholder="Type your note here..." rows={4} />
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Save Note</Button>
                </CardFooter>
              </Card>
            
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>A log of recent actions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-full"><Package className="h-5 w-5 text-green-600 dark:text-green-400" /></div>
                        <div>
                            <p className="font-medium text-sm">New order #12345 placed.</p>
                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-800/30 p-2 rounded-full"><User className="h-5 w-5 text-blue-600 dark:text-blue-400" /></div>
                        <div>
                            <p className="font-medium text-sm">Profile updated successfully.</p>
                            <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;