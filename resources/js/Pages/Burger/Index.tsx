import { Input } from "@/Components/ui/input";
import MeosLayout from "@/Layouts/MeosLayout";
import { Search } from "lucide-react";

export default function Index() {
    return (
        <MeosLayout>
            <div className="p-4">
                {/* Filters */}
                <div className="border-b border-zinc-800 bg-zinc-900/50 rounded-t-lg mb-4">
                    <div className="flex items-center p-4 gap-4">
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Zoek op naam, geboortedatum, ID..."
                                className="pl-8 bg-zinc-800 border-zinc-700 focus:border-blue-500"
                            />
                        </div>

                        <Select>
                            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Geslacht" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                <SelectItem value="all">Alle</SelectItem>
                                <SelectItem value="man">Man</SelectItem>
                                <SelectItem value="vrouw">Vrouw</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                <SelectItem value="all">Alle</SelectItem>
                                <SelectItem value="active">Actief</SelectItem>
                                <SelectItem value="wanted">Gezocht</SelectItem>
                                <SelectItem value="monitoring">
                                    Monitoren
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Meer filters
                        </Button>

                        <div className="ml-auto flex items-center gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Persoon toevoegen
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-900 border-zinc-800">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Nieuwe persoon toevoegen
                                        </DialogTitle>
                                        <DialogDescription>
                                            Vul de gegevens in van de nieuwe
                                            persoon.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* Add form content here */}
                                </DialogContent>
                            </Dialog>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="bg-zinc-900 border-zinc-800"
                                >
                                    <DropdownMenuItem>
                                        <FileDown className="mr-2 h-4 w-4" />
                                        Exporteer lijst
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <FileUp className="mr-2 h-4 w-4" />
                                        Importeer gegevens
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                {personData.map((person, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-zinc-800/50"
                                    >
                                        <td className="p-4">
                                            <Link
                                                href={`/personen/${person.id}`}
                                                className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                                    {person.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {person.name}
                                                    </div>
                                                    <div className="text-xs text-zinc-400">
                                                        ID: {person.id}
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-4">
                                            {person.birthDate}
                                        </td>
                                        <td className="p-4">
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    person.gender === "Man"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                                        : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                                                }
                                            >
                                                {person.gender}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            {person.status && (
                                                <Badge
                                                    variant="secondary"
                                                    className={
                                                        person.status ===
                                                        "Gezocht"
                                                            ? "bg-red-500/10 text-red-400 border-red-500/30"
                                                            : person.status ===
                                                              "Monitoren"
                                                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                                            : "bg-green-500/10 text-green-400 border-green-500/30"
                                                    }
                                                >
                                                    {person.status ===
                                                        "Gezocht" && (
                                                        <AlertCircle className="mr-1 h-3 w-3" />
                                                    )}
                                                    {person.status}
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="bg-zinc-900 border-zinc-800"
                                                >
                                                    <DropdownMenuLabel>
                                                        Acties
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/personen/${person.id}`}
                                                        >
                                                            Bekijk gegevens
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/personen/${person.id}/bewerken`}
                                                        >
                                                            Bewerk gegevens
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/personen/${person.id}/notitie`}
                                                        >
                                                            Voeg notitie toe
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-400">
                                                        Markeer als gezocht
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
                        <div className="text-sm text-zinc-400">
                            Toont 1 tot 10 van 23.562 resultaten
                        </div>
                        <div className="flex items-center gap-2">
                            <Select defaultValue="10">
                                <SelectTrigger className="w-[70px] bg-zinc-800 border-zinc-700">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex items-center gap-1">
                                <Button variant="outline" size="sm" disabled>
                                    Vorige
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="font-medium"
                                >
                                    1
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/personen?page=2">2</Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/personen?page=3">3</Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/personen?page=4">4</Link>
                                </Button>
                                <span className="px-2 text-zinc-400">...</span>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/personen?page=2356">2356</Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/personen?page=2357">2357</Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/personen?page=2">
                                        Volgende
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </MeosLayout>
    );
}
