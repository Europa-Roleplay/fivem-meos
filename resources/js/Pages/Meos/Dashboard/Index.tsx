import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { NumberTicker } from "@/Components/ui/number-ticker";
import MeosLayout from "@/Layouts/MeosLayout";
import { AlertTriangle, ArrowRight, Car, FileText, Users } from "lucide-react";

export default function Dashboard({
    userCount,
    wantedCitizens,
}: {
    userCount: number;
    wantedCitizens: any[];
}) {

    console.log(wantedCitizens)

    return (
        <MeosLayout>
            <div className="space-y-6 p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Gezochte personen"
                        value={wantedCitizens.length.toString()}
                        description=""
                        icon={
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                        }
                        change=""
                        color="red"
                    />
                    {/* <StatCard
                        title="WOK-meldingen"
                        value="28"
                        description="8 nieuwe vandaag"
                        icon={<Car className="h-5 w-5 text-blue-500" />}
                        change="+8 sinds gisteren"
                        color="amber"
                    />
                    <StatCard
                        title="Gezochte personen"
                        value="6"
                        description="2 hoge prioriteit"
                        icon={<Users className="h-5 w-5 text-red-500" />}
                        change="-1 sinds gisteren"
                        color="red"
                    />
                    <StatCard
                        title="Recente rapporten"
                        value="42"
                        description="12 wachtend op review"
                        icon={<FileText className="h-5 w-5 text-green-500" />}
                        change="+5 sinds gisteren"
                        color="green"
                    /> */}
                </div>

                {/* Recent Activity */}
                <div className="">
                    {/* VTA Preview */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-md font-medium text-zinc-400">
                                Gezochte personen
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                                asChild
                            >
                                <a href="/personen">
                                    <span>Bekijk alle</span>
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </a>
                            </Button>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="space-y-4">
                                {wantedCitizens.map((citizen, i) => (
                                    <a
                                        key={i}
                                        href={route("dashboard.citizen.show", citizen.id)}
                                        className="flex items-start justify-between pb-4 border-b border-zinc-800 last:border-0 last:pb-0 hover:bg-zinc-800/50 p-2 rounded-md"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`mt-1 h-2 w-2 rounded-full ${
                                                    citizen.wanted === 1
                                                        ? "bg-red-500"
                                                        : "bg-blue-500"
                                                }`}
                                            ></div>
                                            <div>
                                                <div className="font-medium text-zinc-400">
                                                    {citizen.firstname}{" "}
                                                    {citizen.lastname}
                                                </div>
                                                <div className="text-sm text-zinc-400 line-clamp-1">
                                                    {citizen.wanted_text}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="default"
                                            className="bg-red-500 hover:bg-red-600"
                                        >
                                            Gezocht
                                        </Badge>
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MeosLayout>
    );
}

interface StatCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    change: string;
    color: "blue" | "amber" | "red" | "green";
}

function StatCard({
    title,
    value,
    description,
    icon,
    change,
    color,
}: StatCardProps) {
    const colorClasses = {
        blue: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
        amber: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
        red: "from-red-500/20 to-red-600/5 border-red-500/30",
        green: "from-green-500/20 to-green-600/5 border-green-500/30",
    };

    return (
        <Card
            className={`bg-gradient-to-br ${colorClasses[color]} border-zinc-800/80`}
        >
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-zinc-400">
                            {title}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold mt-1 text-zinc-400">
                                <NumberTicker
                                    className="text-zinc-400"
                                    value={parseInt(value)}
                                />
                            </h3>
                            <p className="text-xs text-zinc-400">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="p-2 rounded-full bg-zinc-800/50">
                        {icon}
                    </div>
                </div>
                <div className="mt-4 text-xs text-zinc-400">{change}</div>
            </CardContent>
        </Card>
    );
}
