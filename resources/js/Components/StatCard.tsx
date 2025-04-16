import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
    change: string;
    trend: "up" | "down" | null;
}

export default function StatCard({
    title,
    value,
    description,
    icon,
    change,
    trend,
}: StatCardProps) {
    const trendIcon =
        trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-500" />
        ) : trend === "down" ? (
            <ArrowDownRight className="h-3 w-3 text-red-500" />
        ) : null;

    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-zinc-400">
                            {title}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold mt-1 text-zinc-400">
                                {value}
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
                <div className="mt-4 text-xs text-zinc-400 flex items-center gap-1">
                    {trendIcon}
                    {change}
                </div>
            </CardContent>
        </Card>
    );
}
