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
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import { Edit, GraduationCap, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Trainingen({ trainingen }: { trainingen: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentTraining, setCurrentTraining] = useState<any>(null);

    const filteredTrainings = trainingen.filter(
        (training) =>
            training.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            training.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    const { data, setData, post, reset } = useForm({
        name: "",
        description: "",
        job: "",
    });

    const openEditDialog = (training: any) => {
        setCurrentTraining(training);
        setData({
            name: training.name,
            description: training.description,
            job: training.job,
        });
        setIsEditDialogOpen(true);
    };

    const handleAddTraining = () => {
        post(route("admin.trainingen"), {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                reset();
            },
        });
    };

    const handleEditTraining = () => {
        if (!currentTraining) return;

        post(route("admin.trainingen.update", currentTraining.id), {
            onSuccess: () => {
                setIsEditDialogOpen(false);
                reset();
                setCurrentTraining(null);
            },
        });
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-zinc-400">
                        Trainingen Beheer
                    </h1>

                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nieuwe Training
                    </Button>
                </div>

                <div className="flex items-center mb-6 gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Zoek op naam of beschrijving..."
                            className="pl-8 bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="bg-zinc-900 border-zinc-800">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-800">
                                <TableHead className="text-zinc-400">
                                    Naam
                                </TableHead>
                                <TableHead className="text-zinc-400">
                                    Beschrijving
                                </TableHead>
                                <TableHead className="text-zinc-400">
                                    Afdeling
                                </TableHead>
                                <TableHead className="text-zinc-400 w-[100px]">
                                    Acties
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTrainings.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-4 text-zinc-500"
                                    >
                                        Geen trainingen gevonden
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTrainings.map((training) => (
                                    <TableRow
                                        key={training.id}
                                        className="border-zinc-800"
                                    >
                                        <TableCell className="text-zinc-400 font-medium">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-blue-400" />
                                                {training.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-400">
                                            {training.description}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    training.job === "politie"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                                        : "bg-green-500/10 text-green-400 border-green-500/30"
                                                }
                                            >
                                                {training.job}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        openEditDialog(training)
                                                    }
                                                >
                                                    <Edit className="h-4 w-4 text-white" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setCurrentTraining(
                                                            training
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

                {/* Add Training Dialog */}
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-400">
                                Nieuwe Training Toevoegen
                            </DialogTitle>
                            <DialogDescription>
                                Vul de details in voor de nieuwe training.
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
                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="Naam van de training"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right text-zinc-400"
                                >
                                    Beschrijving
                                </Label>
                                <Textarea
                                    id="description"
                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="Beschrijving van de training"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="job"
                                    className="text-right text-zinc-400"
                                >
                                    Afdeling
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setData("job", value)
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue
                                            className="text-white"
                                            placeholder="Selecteer afdeling"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="text-whit">
                                        <SelectItem value="politie">
                                            Politie
                                        </SelectItem>
                                        <SelectItem value="kmar">
                                            KMAR
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Annuleren
                            </Button>
                            <Button onClick={handleAddTraining}>
                                Toevoegen
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Training Dialog */}
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-400">
                                Training Bewerken
                            </DialogTitle>
                            <DialogDescription>
                                Wijzig de details van de training.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-zinc-400">
                                    Naam
                                </Label>
                                <Input
                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-zinc-400">
                                    Beschrijving
                                </Label>
                                <Textarea
                                    className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-zinc-400">
                                    Afdeling
                                </Label>
                                <Select
                                    value={data.job}
                                    onValueChange={(value) =>
                                        setData("job", value)
                                    }
                                >
                                    <SelectTrigger className="w-[180px] text-white">
                                        <SelectValue placeholder="Selecteer afdeling" />
                                    </SelectTrigger>
                                    <SelectContent className="text-zinc-400">
                                        <SelectItem value="politie">
                                            Politie
                                        </SelectItem>
                                        <SelectItem value="kmar">
                                            KMAR
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                            >
                                Annuleren
                            </Button>
                            <Button onClick={handleEditTraining}>
                                Opslaan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-400">
                                Training verwijderen
                            </DialogTitle>
                            <DialogDescription>
                                Weet je zeker dat je deze training wilt
                                verwijderen?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                            >
                                Annuleren
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    router.delete(
                                        route(
                                            "admin.trainingen.destroy",
                                            currentTraining.id
                                        ),
                                        {
                                            onSuccess: () => {
                                                setIsDeleteDialogOpen(false);
                                                setCurrentTraining(null);
                                            },
                                        }
                                    );
                                }}
                            >
                                Verwijderen
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
