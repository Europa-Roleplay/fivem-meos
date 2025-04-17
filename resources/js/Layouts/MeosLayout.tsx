import { Button } from "@/Components/ui/button";
import FlashHandler from "@/assets/FlashHandler";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Toaster } from "@/Components/ui/toaster";
import { Link, usePage } from "@inertiajs/react";
import {
    AlertTriangle,
    Bell,
    Book,
    Car,
    ChevronDown,
    CreditCard,
    FileText,
    Fingerprint,
    Gavel,
    Hammer,
    Home,
    Menu,
    Ticket,
    User,
    Users,
    X,
} from "lucide-react";
import { PropsWithChildren, useState } from "react";

export default function MeosLayout({ children }: PropsWithChildren) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = window.location.pathname;
    const isUserAdmin = usePage().props.auth.can.admin;

    return (
        <div className="flex h-screen overflow-hidden">
            <div
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex flex-col`}
            >
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        {sidebarOpen && (
                            <span className="text-xl font-bold text-blue-500">
                                MEOS
                            </span>
                        )}
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? (
                            <X className="h-5 w-5 text-white" />
                        ) : (
                            <Menu className="h-5 w-5 text-white" />
                        )}
                    </Button>
                </div>

                <div className="p-3">
                    <nav className="space-y-2">
                        <NavItem
                            href={route("dashboard.index")}
                            icon={<Home />}
                            label="Dashboard"
                            active={pathname === "/dashboard"}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href={route("dashboard.citizen")}
                            icon={<Users />}
                            label="Personen"
                            active={pathname?.startsWith("/dashboard/burgers")}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href={route("admin.trainingen")}
                            icon={<Book />}
                            label="Trainingen"
                            active={pathname?.startsWith("/admin/trainingen")}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href="/boetes"
                            icon={<CreditCard />}
                            label="Boetes"
                            active={pathname?.startsWith("/boetes")}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href="/staffen"
                            icon={<Gavel />}
                            label="Staffen"
                            active={pathname?.startsWith("/straffen")}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href="/rapporten"
                            icon={<FileText />}
                            label="Rapporten"
                            active={pathname?.startsWith("/rapporten")}
                            expanded={sidebarOpen}
                        />
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4 ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 h-8 px-2"
                                >
                                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-white" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="bg-zinc-900 border-zinc-800"
                            >
                                <DropdownMenuLabel className="text-white">
                                    Mijn Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="text-white">
                                    <Link href="/profiel">Profiel</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="text-white">
                                    <Link href="/instellingen">
                                        Instellingen
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="text-white">
                                    <Link href="/uitloggen">Uitloggen</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {isUserAdmin && (
                                    <DropdownMenuItem
                                        asChild
                                        className="text-white"
                                    >
                                        <Link href="/admin">
                                            Admin Paneel
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page content */}
                <div className="flex-1 overflow-auto bg-zinc-950 p-4">
                    <Toaster />
                    <FlashHandler />
                    {children}
                </div>
            </div>
        </div>
    );
}

function NavItem({
    href,
    icon,
    label,
    active = false,
    expanded = true,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    expanded?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${active
                    ? "bg-blue-500 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
        >
            <div className="flex-shrink-0">{icon}</div>
            {expanded && <span>{label}</span>}
        </Link>
    );
}
