import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import {
    ArrowUpDown,
    Edit,
    Eye,
    Search,
    Shield,
    Trash,
    UserPlus,
    UserSearch,
} from "lucide-react";
import { useState } from "react";

export default function Users({
    userData,
    jobGrades,
}: {
    userData: any[];
    jobGrades: any[];
}) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [search, setSearch] = useState("");

    const [users, setUsers] = useState(userData);

    const {
        data,
        setData,
        post,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        name: "",
        email: "",
        discord: "",
        password: "",
        active: true,
        job_grade_id: "",
    });

    return (
        <AdminLayout>
            <div className="">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-zinc-400">
                        Gebruikersbeheer
                    </h1>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Nieuwe Gebruiker
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800">
                            <DialogHeader>
                                <DialogTitle className="text-zinc-400">
                                    Nieuwe gebruiker toevoegen
                                </DialogTitle>
                                <DialogDescription>
                                    Vul de gegevens in van de nieuwe gebruiker.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right text-zinc-400"
                                    >
                                        Naam
                                    </Label>
                                    <Input
                                        id="name"
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                        }}
                                        placeholder="Volledige naam"
                                        className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="email"
                                        className="text-right text-zinc-400"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        onChange={(e) => {
                                            setData("email", e.target.value);
                                        }}
                                        placeholder="email@europaroleplay.com"
                                        className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="discord"
                                        className="text-right text-zinc-400"
                                    >
                                        Discord ID
                                    </Label>
                                    <Input
                                        id="discord"
                                        type="string"
                                        onChange={(e) => {
                                            setData("discord", e.target.value);
                                        }}
                                        placeholder="123456789"
                                        className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="password"
                                        className="text-right text-zinc-400"
                                    >
                                        Wachtwoord
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        onChange={(e) => {
                                            setData("password", e.target.value);
                                        }}
                                        className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="role"
                                        className="text-right text-zinc-400"
                                    >
                                        Rol
                                    </Label>
                                    <Select
                                        onValueChange={(value) => {
                                            setData("job_grade_id", value);
                                        }}
                                    >
                                        <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200">
                                            <SelectValue placeholder="Selecteer een rol" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800">
                                            <SelectGroup>
                                                <SelectLabel className="text-white font-bold">
                                                    Politie
                                                </SelectLabel>
                                                {jobGrades
                                                    .filter(
                                                        (jobGrade) =>
                                                            jobGrade.job ===
                                                            "politie"
                                                    )
                                                    .map((jobGrade) => (
                                                        <SelectItem
                                                            className="text-zinc-400"
                                                            key={jobGrade.id}
                                                            value={jobGrade.id}
                                                            onClick={() => {
                                                                setData(
                                                                    "job_grade_id",
                                                                    jobGrade.id
                                                                );
                                                            }}
                                                        >
                                                            {jobGrade.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel className="text-white font-bold">
                                                    KMAR
                                                </SelectLabel>
                                                {jobGrades
                                                    .filter(
                                                        (jobGrade) =>
                                                            jobGrade.job ===
                                                            "kmar"
                                                    )
                                                    .map((jobGrade) => (
                                                        <SelectItem
                                                            className="text-zinc-400"
                                                            key={jobGrade.id}
                                                            value={jobGrade.id}
                                                            onClick={() => {
                                                                setData(
                                                                    "job_grade_id",
                                                                    jobGrade.id
                                                                );
                                                            }}
                                                        >
                                                            {jobGrade.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        post(route("admin.users.store"), {
                                            onSuccess: () => {
                                                reset();
                                                setOpen(false);
                                            },
                                        });
                                    }}
                                >
                                    Gebruiker aanmaken
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <div className="border-b border-zinc-800 bg-zinc-900/50 rounded-t-lg mb-4">
                    <div className="flex items-center p-4 gap-4">
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                            <Input
                                type="text"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setUsers(
                                        userData.filter((user) =>
                                            user.name
                                                .toLowerCase()
                                                .includes(
                                                    e.target.value.toLowerCase()
                                                )
                                        )
                                    );
                                }}
                                placeholder="Zoek op naam, email, rol..."
                                className="pl-8 bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:text-white"
                            />
                        </div>
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
                                            <UserSearch className="h-4 w-4" />
                                            Naam
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    </th>
                                    <th className="p-4 font-medium text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            Email
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    </th>
                                    <th className="p-4 font-medium text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            Rol
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    </th>
                                    <th className="p-4 font-medium text-zinc-400">
                                        Laatste login
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
                                {users.map((user, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-zinc-800/50"
                                    >
                                        <td className="p-4">
                                            <Link
                                                href={route(
                                                    "admin.users.dossier",
                                                    user
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">
                                                            {user.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-4 text-white">
                                            {user.email}
                                        </td>
                                        <td className="p-4">
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    user.job_grade.job ===
                                                    "admin"
                                                        ? "bg-red-500/10 text-red-400 border-red-500/30"
                                                        : user.job_grade.job ===
                                                          "politie"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                                        : user.job_grade.job ===
                                                          "kmar"
                                                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                                                        : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                                                }
                                            >
                                                {user.job_grade.job ===
                                                    "Administrator" && (
                                                    <Shield className="mr-1 h-3 w-3" />
                                                )}
                                                {user.job_grade.name}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-white">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString("nl-NL", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        user.active
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    }`}
                                                ></div>
                                                <span className="text-white">
                                                    {user.active
                                                        ? "Actief"
                                                        : "Inactief"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route(
                                                        "admin.users.dossier",
                                                        user
                                                    )}
                                                >
                                                    <Eye className="h-4 w-4 text-white" />
                                                </Link>
                                                <Dialog
                                                    open={editOpen}
                                                    onOpenChange={setEditOpen}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            onClick={() => {
                                                                setData(
                                                                    "name",
                                                                    user.name
                                                                );
                                                                setData(
                                                                    "email",
                                                                    user.email
                                                                );
                                                                setData(
                                                                    "job_grade_id",
                                                                    user
                                                                        .job_grade
                                                                        .id
                                                                );
                                                                setData(
                                                                    "active",
                                                                    user.active
                                                                );
                                                            }}
                                                            variant="ghost"
                                                            size="icon"
                                                            title="Bewerken"
                                                        >
                                                            <Edit className="h-4 w-4 text-blue-500 hover:bg-none" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-zinc-900 border-zinc-800">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-zinc-400">
                                                                Gebruiker
                                                                bewerken
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Update de
                                                                gebruiker
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="name"
                                                                    className="text-right text-zinc-400"
                                                                >
                                                                    Naam
                                                                </Label>
                                                                <Input
                                                                    id="name"
                                                                    defaultValue={
                                                                        user.name
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setData(
                                                                            "name",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    placeholder="Volledige naam"
                                                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="email"
                                                                    className="text-right text-zinc-400"
                                                                >
                                                                    Email
                                                                </Label>
                                                                <Input
                                                                    id="email"
                                                                    defaultValue={
                                                                        user.email
                                                                    }
                                                                    type="email"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setData(
                                                                            "email",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    placeholder="email@europaroleplay.com"
                                                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="password"
                                                                    className="text-right text-zinc-400"
                                                                >
                                                                    Wachtwoord
                                                                </Label>
                                                                <Input
                                                                    id="password"
                                                                    type="password"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setData(
                                                                            "password",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="role"
                                                                    className="text-right text-zinc-400"
                                                                >
                                                                    Rol
                                                                </Label>
                                                                <Select
                                                                    defaultValue={
                                                                        user
                                                                            .job_grade
                                                                            .id
                                                                    }
                                                                    onValueChange={(
                                                                        value
                                                                    ) => {
                                                                        setData(
                                                                            "job_grade_id",
                                                                            value
                                                                        );
                                                                    }}
                                                                >
                                                                    <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700 text-zinc-200">
                                                                        <SelectValue placeholder="Selecteer een rol" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                                                        <SelectGroup>
                                                                            <SelectLabel className="text-white font-bold">
                                                                                Politie
                                                                            </SelectLabel>
                                                                            {jobGrades
                                                                                .filter(
                                                                                    (
                                                                                        jobGrade
                                                                                    ) =>
                                                                                        jobGrade.job ===
                                                                                        "politie"
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        jobGrade
                                                                                    ) => (
                                                                                        <SelectItem
                                                                                            className="text-zinc-400"
                                                                                            key={
                                                                                                jobGrade.id
                                                                                            }
                                                                                            value={
                                                                                                jobGrade.id
                                                                                            }
                                                                                            onClick={() => {
                                                                                                setData(
                                                                                                    "job_grade_id",
                                                                                                    jobGrade.id
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                jobGrade.name
                                                                                            }
                                                                                        </SelectItem>
                                                                                    )
                                                                                )}
                                                                        </SelectGroup>
                                                                        <SelectGroup>
                                                                            <SelectLabel className="text-white font-bold">
                                                                                KMAR
                                                                            </SelectLabel>
                                                                            {jobGrades
                                                                                .filter(
                                                                                    (
                                                                                        jobGrade
                                                                                    ) =>
                                                                                        jobGrade.job ===
                                                                                        "kmar"
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        jobGrade
                                                                                    ) => (
                                                                                        <SelectItem
                                                                                            className="text-zinc-400"
                                                                                            key={
                                                                                                jobGrade.id
                                                                                            }
                                                                                            value={
                                                                                                jobGrade.id
                                                                                            }
                                                                                            onClick={() => {
                                                                                                setData(
                                                                                                    "job_grade_id",
                                                                                                    jobGrade.id
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                jobGrade.name
                                                                                            }
                                                                                        </SelectItem>
                                                                                    )
                                                                                )}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                type="submit"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    post(
                                                                        route(
                                                                            "admin.users.update",
                                                                            user
                                                                        ),
                                                                        {
                                                                            onSuccess:
                                                                                () => {
                                                                                    reset();
                                                                                    setEditOpen(
                                                                                        false
                                                                                    );
                                                                                },
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                Gebruiker
                                                                bewerken
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            title="Verwijderen"
                                                        >
                                                            <Trash className="h-4 w-4 text-red-400" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-400">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Weet je het
                                                                zeker?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Deze actie kan
                                                                niet ongedaan
                                                                worden gemaakt.
                                                                Dit account zal
                                                                permanent van
                                                                onze server
                                                                worden
                                                                verwijderd.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="text-zinc-400 hover:text-zinc-200 bg-zinc-900">
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                className="text-white bg-red-500 hover:bg-red-600 hover:text-red-200 border-zinc-800"
                                                                onClick={() => {
                                                                    destroy(
                                                                        route(
                                                                            "admin.users.destroy",
                                                                            user
                                                                        ),
                                                                        {
                                                                            onSuccess:
                                                                                () => {
                                                                                    setEditOpen(
                                                                                        false
                                                                                    );
                                                                                },
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                Ik weet het
                                                                zeker
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                <Switch
                                                    defaultChecked={user.active}
                                                    onCheckedChange={(
                                                        value
                                                    ) => {
                                                        router.post(
                                                            route(
                                                                "admin.users.status",
                                                                user
                                                            ),
                                                            {
                                                                status: value,
                                                            }
                                                        );
                                                    }}
                                                    id={`user-status-${i}`}
                                                    title={
                                                        user.active
                                                            ? "Deactiveren"
                                                            : "Activeren"
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            ;
        </AdminLayout>
    );
}
