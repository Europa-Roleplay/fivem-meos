import StatCard from "@/Components/StatCard";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    Car,
    Clock,
    FileText,
    User,
    Users,
} from "lucide-react";

export default function Dashboard({
    activePolice,
    activeKMAR,
}: {
    activePolice: number;
    activeKMAR: number;
}) {
    const activityLogs = [
        {
            type: "user",
            message:
                "Gebruiker 'Agent Klaassen' heeft een nieuw rapport aangemaakt",
            time: "14:35",
            user: "Systeem",
        },
        {
            type: "alert",
            message:
                "Beveiligingswaarschuwing: 3 mislukte inlogpogingen voor gebruiker 'jdoe'",
            time: "13:22",
            user: "Beveiliging",
        },
        {
            type: "vehicle",
            message: "Voertuig 'AAT 770' gemarkeerd als gestolen",
            time: "11:47",
            user: "Agent De Vries",
        },
        {
            type: "system",
            message: "Systeem update voltooid - versie 2.4.1",
            time: "10:15",
            user: "Systeem",
        },
        {
            type: "user",
            message:
                "Nieuwe gebruiker 'Stagiair Peters' toegevoegd aan het systeem",
            time: "09:30",
            user: "Admin",
        },
    ];

    const topUsers = [
        { name: "Agent Klaassen", role: "Senior Agent", actions: 87 },
        { name: "Agent De Vries", role: "Hoofdagent", actions: 72 },
        { name: "Agent Jansen", role: "Agent", actions: 65 },
        { name: "Agent Pietersen", role: "Agent", actions: 58 },
        { name: "Agent Bakker", role: "Hoofdagent", actions: 52 },
    ];

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                <StatCard
                    title="Actieve Agenten"
                    value={activePolice}
                    description="Momenteel ingelogd"
                    icon={<Users className="h-5 w-5 text-blue-500" />}
                    change="+3 sinds gisteren"
                    trend="up"
                />
                <StatCard
                    title="Actieve KMAR leden"
                    value={activeKMAR}
                    description="Momenteel ingelogd"
                    icon={<Users className="h-5 w-5 text-blue-500" />}
                    change="+3 sinds gisteren"
                    trend="up"
                />
                {/* <StatCard
                    title="Rapporten Vandaag"
                    value="42"
                    description="12 wachtend op review"
                    icon={<FileText className="h-5 w-5 text-green-500" />}
                    change="+8 sinds gisteren"
                    trend="up"
                />
                <StatCard
                    title="Meldingen"
                    value="18"
                    description="3 hoge prioriteit"
                    icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
                    change="-2 sinds gisteren"
                    trend="down"
                /> */}
            </div>

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-zinc-400">
                            Activiteit per Afdeling
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Verdeling van rapporten en meldingen
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 flex items-center justify-center">
                            
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-zinc-400">
                            Activiteit per Tijdstip
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Aantal acties per uur van de dag
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 flex flex-col justify-between">
                            
                        </div>
                    </CardContent>
                </Card>
            </div> */}

            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-md font-medium text-zinc-400">
                            Recente Activiteit
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                            asChild
                        >
                            <Link href="/admin/logs">
                                <span>Bekijk alle logs</span>
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activityLogs.map((log, i) => (
                                <div
                                    key={i}
                                    className="flex gap-3 pb-4 border-b border-zinc-800 last:border-0 last:pb-0 text-zinc-400"
                                >
                                    <div
                                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${log.type === "user"
                                                ? "bg-blue-500/20 text-blue-500"
                                                : log.type === "system"
                                                    ? "bg-purple-500/20 text-purple-500"
                                                    : log.type === "vehicle"
                                                        ? "bg-green-500/20 text-green-500"
                                                        : "bg-red-500/20 text-red-500"
                                            }`}
                                    >
                                        {log.type === "user" ? (
                                            <User className="h-4 w-4" />
                                        ) : log.type === "system" ? (
                                            <BarChart3 className="h-4 w-4" />
                                        ) : log.type === "vehicle" ? (
                                            <Car className="h-4 w-4" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-sm">
                                            {log.message}
                                        </div>
                                        <div className="text-xs text-zinc-500 mt-1">
                                            {log.time} • {log.user}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-zinc-400">
                            Top Gebruikers
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Meest actieve gebruikers deze week
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topUsers.map((user, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between pb-4 border-b border-zinc-800 last:border-0 last:pb-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-zinc-400">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-zinc-400">
                                                {user.role}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                                    >
                                        {user.actions} acties
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div> */}
        </AdminLayout>
    );
}
