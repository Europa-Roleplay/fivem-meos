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

export default function Dashboard({ userCount }: { userCount: number }) {
    return (
        <MeosLayout>
            <div className="space-y-6 p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Openstaande VTA's"
                        value="12"
                        description="4 hoge prioriteit"
                        icon={
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                        }
                        change="+2 sinds gisteren"
                        color="blue"
                    />
                    <StatCard
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
                    />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* VTA Preview */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-md font-medium">
                                Recente VTA's
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
                                {/* {vtaData.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start justify-between pb-4 border-b border-zinc-800 last:border-0 last:pb-0"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`mt-1 h-2 w-2 rounded-full ${
                                                    item.priority === "high"
                                                        ? "bg-red-500"
                                                        : item.priority ===
                                                          "medium"
                                                        ? "bg-amber-500"
                                                        : "bg-blue-500"
                                                }`}
                                            ></div>
                                            <div>
                                                <div className="font-medium">
                                                    {item.person}
                                                </div>
                                                <div className="text-sm text-zinc-400 line-clamp-1">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                item.organization === "Politie"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                item.organization === "Politie"
                                                    ? "bg-blue-500 hover:bg-blue-600"
                                                    : "bg-zinc-700 hover:bg-zinc-600"
                                            }
                                        >
                                            {item.organization}
                                        </Badge>
                                    </div>
                                ))} */}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button variant="outline" className="w-full">
                                Nieuwe VTA toevoegen
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* WOK Preview */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-md font-medium">
                                Recente WOK-meldingen
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                                asChild
                            >
                                <a href="/voertuigen">
                                    <span>Bekijk alle</span>
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </a>
                            </Button>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="space-y-4">
                                {/* {wokData.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start justify-between pb-4 border-b border-zinc-800 last:border-0 last:pb-0"
                                    >
                                        <div className="flex items-start gap-3">
                                            <Badge
                                                variant="outline"
                                                className="mt-0.5 bg-blue-500/10 text-blue-400 border-blue-500/30"
                                            >
                                                {item.license}
                                            </Badge>
                                            <div>
                                                <div className="text-sm text-zinc-400 line-clamp-1">
                                                    {item.description}
                                                </div>
                                                <div className="text-sm mt-1">
                                                    {item.officer}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {item.date}
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button variant="outline" className="w-full">
                                Nieuwe WOK-melding toevoegen
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Recent Activity and Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-md font-medium">
                                Activiteiten logboek
                            </CardTitle>
                            <CardDescription>
                                Recente activiteiten in het systeem
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* {activityData.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-3 pb-4 border-b border-zinc-800 last:border-0 last:pb-0"
                                    >
                                        <div
                                            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                                                item.type === "update"
                                                    ? "bg-blue-500/20 text-blue-500"
                                                    : item.type === "alert"
                                                    ? "bg-red-500/20 text-red-500"
                                                    : "bg-green-500/20 text-green-500"
                                            }`}
                                        >
                                            {item.type === "update" ? (
                                                <FileText className="h-4 w-4" />
                                            ) : item.type === "alert" ? (
                                                <AlertTriangle className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm">
                                                {item.message}
                                            </div>
                                            <div className="text-xs text-zinc-500 mt-1">
                                                {item.time} • {item.user}
                                            </div>
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Alerts */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-md font-medium">
                                Meldingen
                            </CardTitle>
                            <CardDescription>
                                Belangrijke meldingen
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* {alertData.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`p-3 rounded-lg ${
                                            item.severity === "high"
                                                ? "bg-red-500/10 border border-red-500/20"
                                                : item.severity === "medium"
                                                ? "bg-amber-500/10 border border-amber-500/20"
                                                : "bg-blue-500/10 border border-blue-500/20"
                                        }`}
                                    >
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle
                                                className={`h-4 w-4 mt-0.5 ${
                                                    item.severity === "high"
                                                        ? "text-red-500"
                                                        : item.severity ===
                                                          "medium"
                                                        ? "text-amber-500"
                                                        : "text-blue-500"
                                                }`}
                                            />
                                            <div>
                                                <div className="font-medium text-sm">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-zinc-400 mt-1">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                                asChild
                            >
                                <a href="/meldingen">
                                    <span>Alle meldingen bekijken</span>
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </a>
                            </Button>
                        </CardFooter>
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
