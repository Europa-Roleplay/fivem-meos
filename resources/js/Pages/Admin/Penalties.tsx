import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { Edit, MoreHorizontal, Plus, Save, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Penalties({
    initialPenalties,
}: {
    initialPenalties: any[];
}) {
    console.log(initialPenalties);
    const [searchQuery, setSearchQuery] = useState("");
    const [penalties, setPenalties] = useState(initialPenalties);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentPenalty, setCurrentPenalty] = useState<any>(null);
    const [newPenalty, setNewPenalty] = useState({
        name: "",
        type: "celstraf",
        amount: "",
    });

    useEffect(() => {
        console.log("edit", currentPenalty);
    });

    const filteredPenalties = penalties.filter((penalty) =>
        penalty.penalty_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddPenalty = () => {
        router.post(route("admin.penalties.store"), newPenalty);
        setIsAddDialogOpen(false);
        window.location.reload();
    };

    const handleEditPenalty = () => {
        router.post(route("admin.penalties.update", currentPenalty.id), {
            ...currentPenalty,
        });

        setIsEditDialogOpen(false);
    };

    const handleDeletePenalty = () => {
        router.delete(route("admin.penalties.destroy", currentPenalty.id));
        setIsDeleteDialogOpen(false);

        setPenalties((prevPenalties) =>
            prevPenalties.filter((penalty) => penalty.id !== currentPenalty.id)
        );
    };

    const formatDuration = (amount: number, type: string) => {
        if (type === "celstraf") {
            return `${amount} maanden`;
        } else if (type === "taakstraf") {
            return `${amount} uur`;
        } else if (type === "boete") {
            return `€${amount.toLocaleString("nl-NL", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
        } else {
            return `${amount}`;
        }
    };
    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-zinc-400">
                        Staffen Beheer
                    </h1>

                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nieuwe Straf
                    </Button>
                </div>

                <div className="flex items-center mb-6 gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Zoek op artikel of beschrijving..."
                            className="pl-8 bg-zinc-800 border-zinc-700 focus:border-blue-500 text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="bg-zinc-900 border-zinc-800">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                <TableHead className="text-zinc-400">
                                    Artikel
                                </TableHead>
                                <TableHead className="text-zinc-400">
                                    Type
                                </TableHead>
                                <TableHead className="text-zinc-400">
                                    Duur
                                </TableHead>
                                <TableHead className="text-zinc-400 w-[100px]">
                                    Acties
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPenalties.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-8 text-zinc-500"
                                    >
                                        Geen straffen gevonden
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPenalties.map((penalty) => (
                                    <TableRow
                                        key={penalty.id}
                                        className="border-zinc-800"
                                    >
                                        <TableCell className="font-medium text-zinc-400">
                                            {penalty.penalty_name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    penalty.penalty_type ===
                                                    "celstraf"
                                                        ? "bg-red-500/10 text-red-400 border-red-500/30"
                                                        : penalty.penalty_type ===
                                                          "taakstraf"
                                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                                        : "bg-green-500/10 text-green-400 border-green-500/30"
                                                }
                                            >
                                                {penalty.penalty_type ===
                                                "celstraf"
                                                    ? "Celstraf"
                                                    : penalty.penalty_type ===
                                                      "taakstraf"
                                                    ? "Taakstraf"
                                                    : "Boete"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-zinc-400">
                                            {formatDuration(
                                                penalty.amount,
                                                penalty.penalty_type
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setCurrentPenalty(
                                                            penalty
                                                        );
                                                        setIsEditDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4 text-zinc-400" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setCurrentPenalty(
                                                            penalty
                                                        );
                                                        setIsDeleteDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <Trash className="h-4 w-4 text-red-400" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-400">
                                Nieuwe Straf Toevoegen
                            </DialogTitle>
                            <DialogDescription>
                                Vul de details in voor de nieuwe straf.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="article"
                                    className="text-right text-zinc-400"
                                >
                                    Artikel
                                </Label>
                                <Input
                                    id="article"
                                    placeholder="Art. 5 WVW"
                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                    value={newPenalty.name}
                                    onChange={(e) =>
                                        setNewPenalty({
                                            ...newPenalty,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-zinc-400">
                                    Type
                                </Label>
                                <RadioGroup
                                    className="col-span-3 flex gap-4"
                                    value={newPenalty.type}
                                    onValueChange={(value) =>
                                        setNewPenalty({
                                            ...newPenalty,
                                            type: value,
                                        })
                                    }
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            className="text-zinc-400"
                                            value="celstraf"
                                            id="celstraf"
                                        />
                                        <Label
                                            htmlFor="celstraf"
                                            className="text-zinc-400"
                                        >
                                            Celstraf
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            className="text-zinc-400"
                                            value="taakstraf"
                                            id="taakstraf"
                                        />
                                        <Label
                                            htmlFor="taakstraf"
                                            className="text-zinc-400"
                                        >
                                            Taakstraf
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            className="text-zinc-400"
                                            value="boete"
                                            id="boete"
                                        />
                                        <Label
                                            htmlFor="boete"
                                            className="text-zinc-400"
                                        >
                                            Boete
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="duration"
                                    className="text-right text-zinc-400"
                                >
                                    {newPenalty.type === "boete"
                                        ? "Bedrag (€)"
                                        : `Duur ${
                                              newPenalty.type === "celstraf"
                                                  ? "(maanden)"
                                                  : "(uren)"
                                          }`}
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    placeholder="0"
                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                    value={newPenalty.amount}
                                    onChange={(e) =>
                                        setNewPenalty({
                                            ...newPenalty,
                                            amount: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Annuleren
                            </Button>
                            <Button onClick={handleAddPenalty}>
                                Toevoegen
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit */}

                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-400">
                                Straf Bewerken
                            </DialogTitle>
                            <DialogDescription>
                                Wijzig de details van de straf.
                            </DialogDescription>
                        </DialogHeader>
                        {currentPenalty && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4 text-zinc-400">
                                    <Label
                                        htmlFor="edit-article"
                                        className="text-right"
                                    >
                                        Artikel
                                    </Label>
                                    <Input
                                        id="edit-article"
                                        className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                        value={currentPenalty.penalty_name}
                                        onChange={(e) =>
                                            setCurrentPenalty({
                                                ...currentPenalty,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-zinc-400">
                                        Type
                                    </Label>
                                    <RadioGroup
                                        className="col-span-3 flex gap-4"
                                        value={currentPenalty.penalty_type}
                                        onValueChange={(value) =>
                                            setCurrentPenalty({
                                                ...currentPenalty,
                                                type: value,
                                            })
                                        }
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                className="text-zinc-400"
                                                value="celstraf"
                                                id="edit-celstraf"
                                            />
                                            <Label
                                                htmlFor="edit-celstraf"
                                                className="text-zinc-400"
                                            >
                                                Celstraf
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                className="text-zinc-400"
                                                value="taakstraf"
                                                id="edit-taakstraf"
                                            />
                                            <Label
                                                htmlFor="edit-taakstraf"
                                                className="text-zinc-400"
                                            >
                                                Taakstraf
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                className="text-zinc-400"
                                                value="boete"
                                                id="edit-boete"
                                            />
                                            <Label
                                                htmlFor="edit-boete"
                                                className="text-zinc-400"
                                            >
                                                Boete
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-duration"
                                        className="text-right text-zinc-400"
                                    >
                                        {currentPenalty.penalty_type === "boete"
                                            ? "Bedrag (€)"
                                            : `Duur ${
                                                  currentPenalty.penalty_type ===
                                                  "celstraf"
                                                      ? "(maanden)"
                                                      : "(uren)"
                                              }`}
                                    </Label>
                                    <Input
                                        id="edit-duration"
                                        type="number"
                                        className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                        value={currentPenalty.amount}
                                        onChange={(e) =>
                                            setCurrentPenalty({
                                                ...currentPenalty,
                                                amount: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                            >
                                Annuleren
                            </Button>
                            <Button onClick={handleEditPenalty}>
                                <Save className="mr-2 h-4 w-4" />
                                Opslaan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete */}

                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-400">
                                Straf Verwijderen
                            </DialogTitle>
                            <DialogDescription>
                                Weet je zeker dat je deze straf wilt
                                verwijderen?
                            </DialogDescription>
                        </DialogHeader>
                        {currentPenalty && (
                            <div className="py-4">
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md">
                                    <p className="font-medium text-zinc-400">
                                        {currentPenalty.penalty_name}
                                    </p>
                                    <p className="text-sm text-zinc-400 mt-1">
                                        Type:{" "}
                                        {currentPenalty.penalty_type ===
                                        "celstraf"
                                            ? "Celstraf"
                                            : "Taakstraf"}{" "}
                                        | Duur: {currentPenalty.amount}
                                    </p>
                                </div>
                                <p className="text-sm text-zinc-400 mt-4">
                                    Deze actie kan niet ongedaan worden gemaakt.
                                    De straf zal permanent worden verwijderd uit
                                    het systeem.
                                </p>
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                            >
                                Annuleren
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeletePenalty}
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                Verwijderen
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
