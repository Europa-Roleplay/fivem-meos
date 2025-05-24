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
    NotebookPen,
    Ticket,
    User,
    Users,
    X,
} from "lucide-react";
import { PropsWithChildren, useState } from "react";
import type { PageProps } from "@/types";

export default function AdminLayout({ children }: PropsWithChildren) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = window.location.pathname;
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <div className="flex h-screen overflow-hidden">
            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-20"
                } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex flex-col`}
            >
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        {sidebarOpen && (
                            <span className="text-xl font-bold text-red-500">
                                ADMIN
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
                            href={route("admin.index")}
                            icon={<Home />}
                            label="Dashboard"
                            active={pathname === "/admin"}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href={route("admin.users")}
                            icon={<Users />}
                            label="Personen"
                            active={pathname?.startsWith("/admin/gebruikers")}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href={route("admin.trainingen")}
                            icon={<Book />}
                            label="Specialisaties"
                            active={pathname?.startsWith(
                                "/admin/specialisaties"
                            )}
                            expanded={sidebarOpen}
                        />
                        <NavItem
                            href={route("admin.penalties")}
                            icon={<Book />}
                            label="Straffen"
                            active={pathname?.startsWith("/admin/staffen")}
                            expanded={sidebarOpen}
                        />
                        {/* <NavItem
                            href={route("admin.boetes")}
                            icon={<CreditCard />}
                            label="Boetes"
                            active={pathname?.startsWith("/boetes")}
                            expanded={sidebarOpen}
                        /> */}
                        {/* <NavItem
                            href="/staffen"
                            icon={<Gavel />}
                            label="Staffen"
                            active={pathname?.startsWith("/straffen")}
                            expanded={sidebarOpen}
                        /> */}
                        {/* <NavItem
                            href="/rapporten"
                            icon={<FileText />}
                            label="Rapporten"
                            active={pathname?.startsWith("/rapporten")}
                            expanded={sidebarOpen}
                        /> */}
                        {/* <NavItem
                            href={route("admin.logboek")}
                            icon={<NotebookPen />}
                            label="Logboek"
                            active={pathname?.startsWith("/logboek")}
                            expanded={sidebarOpen}
                        /> */}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4 ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 h-8 px-2"
                                >
                                    {user.profile_photo_path ? (
                                        <img
                                            src={`/storage/${user.profile_photo_path}`}
                                            alt="Profielfoto"
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                    ) : (
                                        // Vervang dit eventueel door een echte icon component van Inertia of je eigen
                                        <User className="w-5 h-5 text-white" />
                                    )}
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
                                <DropdownMenuItem
                                    asChild
                                    className="text-white"
                                >
                                    <Link href="/profiel">Profiel</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    asChild
                                    className="text-white"
                                >
                                    <Link href="/instellingen">
                                        Instellingen
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    asChild
                                    className="text-white"
                                >
                                    <Link href="/log-out">Uitloggen</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    asChild
                                    className="text-white"
                                >
                                    <Link href="/dashboard">
                                        Terug naar Dashboard
                                    </Link>
                                </DropdownMenuItem>
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
            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                active
                    ? "bg-red-500 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
        >
            <div className="flex-shrink-0">{icon}</div>
            {expanded && <span>{label}</span>}
        </Link>
    );
}
