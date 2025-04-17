import Paginator from "@/assets/Paginator";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/Components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import MeosLayout from "@/Layouts/MeosLayout";
import { Link, router, usePage } from "@inertiajs/react";
import {
    AlertCircle,
    ArrowUpDown,
    Eye,
    MoreHorizontal,
    Search,
    User,
    UserPlus,
} from "lucide-react";
import { useState } from "react";

interface User {
    id: number;
    identifier: string;
    firstname: string;
    lastname: string;
    dateofbirth: string;
    height: number;
    sex: string;
    job: string;
    job_grade: string;
    phone_number: string;
    iban: string;
    jailTime: number;
    communityService: number;
    secondjob: string;
    secondjob_grade: string;
}

interface UserProps {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
    };
}

export default function Index() {
    const { users } = usePage().props as unknown as UserProps;

    const [data, setData] = useState({
        zoeken: "",
    });

    return (
        <MeosLayout>
            <div className="p-4">
                {/* Filters */}
                <div className="border-b border-zinc-800 bg-zinc-900/50 rounded-t-lg mb-4">
                    <div className="flex items-center p-4 gap-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                router.post(
                                    route("dashboard.citizen.search", data)
                                );
                            }}
                            className="relative flex-1 max-w-xl"
                        >
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Zoek op naam, geboortedatum, ID..."
                                onChange={(e) => {
                                    setData({
                                        zoeken: e.target.value,
                                    });
                                }}
                                className="pl-8 bg-zinc-800 text-zinc-400 border-zinc-700 focus:border-blue-500"
                            />
                        </form>
                    </div>
                </div>

                {/* Content */}
                <Card className="bg-zinc-900 border-zinc-800">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs border-b border-zinc-800">
                                <tr>
                                    <th className="p-4 font-medium text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Volledige naam
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    </th>
                                    <th className="p-4 font-medium text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            Geboortedatum
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    </th>
                                    <th className="p-4 font-medium text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            Geslacht
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    </th>
                                    <th className="p-4 font-medium text-zinc-400">
                                        Status
                                    </th>
                                    <th className="p-4 font-medium text-zinc-400">
                                        Acties
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {users.data.map((person: User, i: number) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-zinc-800/50"
                                    >
                                        <td className="p-4">
                                            <Link
                                                href={route(
                                                    "dashboard.citizen.show",
                                                    person.id
                                                )}
                                                className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                                    {person.firstname.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-zinc-400 hover:text-blue-400 transition-colors">
                                                        {person.firstname +
                                                            " " +
                                                            person.lastname}
                                                    </div>
                                                    <div className="font-xs text-zinc-400 hover:text-blue-400 transition-colors">
                                                        ID: {person.id}
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-4 text-zinc-400 hover:text-blue-400 transition-colors">
                                            {person.dateofbirth}
                                        </td>
                                        <td className="p-4 text-zinc-400 hover:text-blue-400 transition-colors">
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    person.sex === "m"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                                        : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                                                }
                                            >
                                                {person.sex === "m"
                                                    ? "Man"
                                                    : "Vrouw"}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-zinc-400 hover:text-blue-400 transition-colors">
                                            Status van persoon ( gezocht etc.)
                                        </td>
                                        <td className="p-4">
                                            <Link
                                                href={route(
                                                    "dashboard.citizen.show",
                                                    person.id
                                                )}
                                                className="text-zinc-400 hover:text-blue-400 transition-colors"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Paginator data={users} />
                </Card>
            </div>
        </MeosLayout>
    );
}
