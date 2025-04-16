import { Badge } from "@/Components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Clock,
    Edit,
    FileText,
    Plus,
    Save,
    Star,
} from "lucide-react";

export default function Dossier({ user }: { user: any }) {
    console.log(user);
    const getActivityStatusColor = (status: string) => {
        switch (status) {
            case "Actief":
                return "bg-green-500/10 text-green-400 border-green-500/30";
            case "Geoorloofd afwezig":
                return "bg-amber-500/10 text-amber-400 border-amber-500/30";
            case "Inactief":
                return "bg-red-500/10 text-red-400 border-red-500/30";
            default:
                return "bg-blue-500/10 text-blue-400 border-blue-500/30";
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.users")}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold text-zinc-400">
                            Personeelsdossier: {user.name}
                        </h1>
                    </div>
                </div>

                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="bg-zinc-800 border-zinc-700 grid grid-cols-3">
                        <TabsTrigger value="general">
                            <FileText className="mr-2 h-4 w-4" />
                            Algemene Informatie
                        </TabsTrigger>
                        <TabsTrigger value="activity">
                            <Clock className="mr-2 h-4 w-4" />
                            Activiteit
                        </TabsTrigger>
                        <TabsTrigger value="notes">
                            <FileText className="mr-2 h-4 w-4" />
                            Notities & Waarschuwingen
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="mt-4 space-y-6">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-zinc-400">
                                    Basisinformatie
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="name"
                                            className="text-zinc-400"
                                        >
                                            Naam
                                        </Label>
                                        <Input
                                            readOnly
                                            id="name"
                                            value={user.name}
                                            className="col-span-2 text-white bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="rank"
                                            className="text-zinc-400"
                                        >
                                            Rang
                                        </Label>
                                        <Input
                                            readOnly
                                            id="rank"
                                            value={user.job_grade.name}
                                            className="col-span-2 bg-zinc-800 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="department"
                                            className="text-zinc-400"
                                        >
                                            Afdeling
                                        </Label>
                                        <Input
                                            id="department"
                                            readOnly
                                            value={user.job_grade.job}
                                            className="col-span-2 bg-zinc-800 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="email"
                                            className="text-zinc-400"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            value={user.email}
                                            className="col-span-2 bg-zinc-800 border-zinc-700 text-white"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="joinDate"
                                            className="text-zinc-400"
                                        >
                                            In dienst sinds
                                        </Label>
                                        <Input
                                            id="joinDate"
                                            value={new Date(
                                                user.created_at
                                            ).toLocaleString("nl-NL", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                            className="col-span-2 bg-zinc-800 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label
                                            htmlFor="lastPromotionDate"
                                            className="text-zinc-400"
                                        >
                                            Laatste promotie
                                        </Label>
                                        <Input
                                            id="lastPromotionDate"
                                            value="moet nog komen"
                                            className="col-span-2 bg-zinc-800 border-zinc-700 text-white"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trainings */}
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-zinc-400">
                                        Trainingen
                                    </CardTitle>
                                    <CardDescription>
                                        Voltooide trainingen en opleidingen
                                    </CardDescription>
                                </div>
                                <Button
                                    size="sm"
                                    // onClick={() => setIsAddTrainingOpen(true)}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Training toevoegen
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* {user.trainings.map(
                                        (training: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-md border border-zinc-800"
                                            >
                                                <div>
                                                    <div className="font-medium">
                                                        {training.name}
                                                    </div>
                                                    <div className="text-sm text-zinc-400">
                                                        {training.date} •{" "}
                                                        {training.instructor}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )
                                    )} */}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Specializations */}
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-zinc-400">
                                        Specialisaties
                                    </CardTitle>
                                    <CardDescription>
                                        Vaardigheden en expertisegebieden
                                    </CardDescription>
                                </div>
                                <Button
                                    size="sm"
                                    // onClick={() => setIsAddSpecOpen(true)}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Specialisatie toevoegen
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* {user.specializations.map(
                                        (spec: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-md border border-zinc-800"
                                            >
                                                <div>
                                                    <div className="font-medium">
                                                        {spec.name}
                                                    </div>
                                                    <div className="flex items-center text-sm text-zinc-400">
                                                        Niveau: {spec.level}
                                                        <div className="flex ml-2">
                                                            {[
                                                                ...Array(
                                                                    Number.parseInt(
                                                                        spec.level
                                                                    )
                                                                ),
                                                            ].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-3 w-3 text-amber-400 fill-amber-400"
                                                                />
                                                            ))}
                                                            {[
                                                                ...Array(
                                                                    3 -
                                                                        Number.parseInt(
                                                                            spec.level
                                                                        )
                                                                ),
                                                            ].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-3 w-3 text-zinc-600"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )
                                    )} */}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-4 space-y-6">
                        {/* Activity Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="text-3xl font-bold text-white">
                                            0
                                        </div>
                                        <div className="text-sm text-zinc-400 mt-1">
                                            Arrestaties
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="text-3xl font-bold text-white">
                                            0
                                        </div>
                                        <div className="text-sm text-zinc-400 mt-1">
                                            Boetes
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="text-3xl font-bold text-white">
                                            0
                                        </div>
                                        <div className="text-sm text-zinc-400 mt-1">
                                            Taakstraffen
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="text-3xl font-bold text-white">
                                            0
                                        </div>
                                        <div className="text-sm text-zinc-400 mt-1">
                                            Rapporten
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Monthly Activity Chart */}
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-zinc-400">
                                    Maandelijkse Activiteit
                                </CardTitle>
                                <CardDescription>
                                    Totaal aantal acties per maand
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    {/* Bar chart */}
                                    <div className="relative h-64 mt-4">
                                        {/* Y-axis labels */}
                                        <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-zinc-400">
                                            <span>50</span>
                                            <span>40</span>
                                            <span>30</span>
                                            <span>20</span>
                                            <span>10</span>
                                            <span>0</span>
                                        </div>

                                        {/* Chart area */}
                                        <div className="absolute left-8 right-0 inset-y-0 border-l border-b border-zinc-800">
                                            {/* Horizontal grid lines */}
                                            <div className="absolute inset-x-0 h-[20%] border-t border-dashed border-zinc-800"></div>
                                            <div className="absolute inset-x-0 h-[40%] border-t border-dashed border-zinc-800"></div>
                                            <div className="absolute inset-x-0 h-[60%] border-t border-dashed border-zinc-800"></div>
                                            <div className="absolute inset-x-0 h-[80%] border-t border-dashed border-zinc-800"></div>

                                            {/* Bars */}
                                            <div className="absolute inset-x-0 inset-y-0 flex items-end justify-around">
                                                {/* {user.activityStats.monthlyActivity.map(
                                                    (
                                                        month: string,
                                                        i: number
                                                    ) => (
                                                        <div
                                                            key={i}
                                                            className="flex flex-col items-center"
                                                        >
                                                            <div
                                                                className="w-8 bg-blue-500 rounded-t"
                                                                style={{
                                                                    height: `${
                                                                        (month.value /
                                                                            50) *
                                                                        100
                                                                    }%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )
                                                )} */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* X-axis labels */}
                                    <div className="flex justify-around px-8 text-xs text-zinc-400 mt-2">
                                        {/* {user.activityStats.monthlyActivity.map(
                                            (month, i) => (
                                                <span key={i}>
                                                    {month.month}
                                                </span>
                                            )
                                        )} */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activity Breakdown */}
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-zinc-400">
                                    Activiteit Verdeling
                                </CardTitle>
                                <CardDescription>
                                    Verdeling van verschillende soorten
                                    activiteiten
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80 flex items-center justify-center">
                                    {/* Donut chart */}
                                    <div className="relative w-64 h-64">
                                        {/* Segments */}
                                        <div
                                            className="absolute inset-0 rounded-full border-[32px] border-blue-500/80"
                                            style={{
                                                clipPath:
                                                    "polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 50%)",
                                                transform: "rotate(0deg)",
                                            }}
                                        ></div>
                                        <div
                                            className="absolute inset-0 rounded-full border-[32px] border-red-500/80"
                                            style={{
                                                clipPath:
                                                    "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                                                transform: "rotate(0deg)",
                                            }}
                                        ></div>
                                        <div
                                            className="absolute inset-0 rounded-full border-[32px] border-amber-500/80"
                                            style={{
                                                clipPath:
                                                    "polygon(50% 50%, 50% 100%, 0 100%, 0 50%)",
                                                transform: "rotate(0deg)",
                                            }}
                                        ></div>
                                        {/* Inner circle for donut effect */}
                                        <div className="absolute inset-[32px] rounded-full bg-zinc-900"></div>

                                        {/* Center text */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">
                                                    {/* {user.activityStats.activityBreakdown.reduce(
                                                        (sum, item) =>
                                                            sum + item.value,
                                                        0
                                                    )} */}
                                                </div>
                                                <div className="text-xs text-zinc-400">
                                                    Totale activiteiten
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="ml-8 space-y-4">
                                        {/* {user.activityStats.activityBreakdown.map(
                                            (item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div
                                                        className={`w-4 h-4 rounded-full ${
                                                            i === 0
                                                                ? "bg-blue-500/80"
                                                                : i === 1
                                                                ? "bg-red-500/80"
                                                                : i === 2
                                                                ? "bg-amber-500/80"
                                                                : "bg-green-500/80"
                                                        }`}
                                                    ></div>
                                                    <div>
                                                        <div className="font-medium">
                                                            {item.type}
                                                        </div>
                                                        <div className="text-sm text-zinc-400">
                                                            {item.value} acties
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )} */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-4 space-y-6">
                        {/* Notes */}
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-zinc-400">
                                    Notities
                                </CardTitle>
                                <CardDescription>
                                    Aantekeningen over de medewerker
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    {/* {user.notes.map((note) => (
                                        <div
                                            key={note.id}
                                            className="p-3 bg-zinc-800 rounded-md"
                                        >
                                            <div className="text-sm">
                                                {note.text}
                                            </div>
                                            <div className="text-xs text-zinc-400 mt-2">
                                                {new Date(
                                                    note.date
                                                ).toLocaleString("nl-NL")}{" "}
                                                • {note.author}
                                            </div>
                                        </div>
                                    ))} */}
                                </div>

                                <div className="pt-4 border-t border-zinc-800 mt-4">
                                    <h3 className="font-medium mb-2 text-zinc-400">
                                        Nieuwe notitie toevoegen
                                    </h3>
                                    <Textarea
                                        placeholder="Voeg een notitie toe over deze medewerker..."
                                        className="bg-zinc-800 border-zinc-700 focus:border-blue-500 min-h-[100px] focus:text-white"
                                        // value={note}
                                        // onChange={(e) =>
                                        //     setNote(e.target.value)
                                        // }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    // onClick={handleAddNote}
                                >
                                    Notitie opslaan
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Warnings */}
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-zinc-400">
                                        Waarschuwingen
                                    </CardTitle>
                                    <CardDescription>
                                        Officiële waarschuwingen
                                    </CardDescription>
                                </div>
                                <Button
                                    size="sm"
                                    // onClick={() => setIsAddWarningOpen(true)}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Waarschuwing toevoegen
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* {user.warnings.length === 0 ? (
                                        <div className="text-center py-8 text-zinc-500">
                                            Geen waarschuwingen
                                        </div>
                                    ) : (
                                        user.warnings.map((warning) => (
                                            <div
                                                key={warning.id}
                                                className="p-3 bg-red-500/10 border border-red-500/30 rounded-md"
                                            >
                                                <div className="font-medium">
                                                    {warning.reason}
                                                </div>
                                                <div className="text-xs text-zinc-400 mt-2">
                                                    {warning.date} • Uitgegeven
                                                    door: {warning.issuedBy}
                                                </div>
                                            </div>
                                        ))
                                    )} */}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Add Training Dialog */}
                <Dialog
                // open={isAddTrainingOpen}
                // onOpenChange={setIsAddTrainingOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle>Training Toevoegen</DialogTitle>
                            <DialogDescription>
                                Voeg een nieuwe training of opleiding toe.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="training-name"
                                    className="text-right"
                                >
                                    Naam
                                </Label>
                                <Input
                                    id="training-name"
                                    placeholder="Naam van de training"
                                    className="col-span-3 bg-zinc-800 border-zinc-700"
                                    // value={newTraining.name}
                                    // onChange={(e) =>
                                    //     setNewTraining({
                                    //         ...newTraining,
                                    //         name: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="training-date"
                                    className="text-right"
                                >
                                    Datum
                                </Label>
                                <Input
                                    id="training-date"
                                    type="date"
                                    className="col-span-3 bg-zinc-800 border-zinc-700"
                                    // value={newTraining.date}
                                    // onChange={(e) =>
                                    //     setNewTraining({
                                    //         ...newTraining,
                                    //         date: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="training-instructor"
                                    className="text-right"
                                >
                                    Instructeur
                                </Label>
                                <Input
                                    id="training-instructor"
                                    placeholder="Naam van de instructeur"
                                    className="col-span-3 bg-zinc-800 border-zinc-700"
                                    // value={newTraining.instructor}
                                    // onChange={(e) =>
                                    //     setNewTraining({
                                    //         ...newTraining,
                                    //         instructor: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                // onClick={() => setIsAddTrainingOpen(false)}
                            >
                                Annuleren
                            </Button>
                            {/* <Button onClick={handleAddTraining}>
                                Toevoegen
                            </Button> */}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Add Specialization Dialog */}
                <Dialog>
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle>Specialisatie Toevoegen</DialogTitle>
                            <DialogDescription>
                                Voeg een nieuwe specialisatie of vaardigheid
                                toe.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="spec-name"
                                    className="text-right"
                                >
                                    Naam
                                </Label>
                                <Input
                                    id="spec-name"
                                    placeholder="Naam van de specialisatie"
                                    className="col-span-3 bg-zinc-800 border-zinc-700"
                                    // value={newSpec.name}
                                    // onChange={(e) =>
                                    //     setNewSpec({
                                    //         ...newSpec,
                                    //         name: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="spec-level"
                                    className="text-right"
                                >
                                    Niveau
                                </Label>
                                <Select
                                // value={newSpec.level}
                                // onValueChange={(value) =>
                                //     setNewSpec({ ...newSpec, level: value })
                                // }
                                >
                                    <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Selecteer een niveau" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="1">
                                            Niveau 1 (Basis)
                                        </SelectItem>
                                        <SelectItem value="2">
                                            Niveau 2 (Gevorderd)
                                        </SelectItem>
                                        <SelectItem value="3">
                                            Niveau 3 (Expert)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                // onClick={() => setIsAddSpecOpen(false)}
                            >
                                Annuleren
                            </Button>
                            {/* <Button onClick={handleAddSpec}>Toevoegen</Button> */}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Add Warning Dialog */}
                <Dialog
                // open={isAddWarningOpen}
                // onOpenChange={setIsAddWarningOpen}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle>Waarschuwing Toevoegen</DialogTitle>
                            <DialogDescription>
                                Voeg een officiële waarschuwing toe.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="warning-reason"
                                    className="text-right"
                                >
                                    Reden
                                </Label>
                                <Input
                                    id="warning-reason"
                                    placeholder="Reden voor de waarschuwing"
                                    className="col-span-3 bg-zinc-800 border-zinc-700"
                                    // value={newWarning.reason}
                                    // onChange={(e) =>
                                    //     setNewWarning({
                                    //         ...newWarning,
                                    //         reason: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="warning-date"
                                    className="text-right"
                                >
                                    Datum
                                </Label>
                                <Input
                                    id="warning-date"
                                    type="date"
                                    className="col-span-3 bg-zinc-800 border-zinc-700"
                                    // value={newWarning.date}
                                    // onChange={(e) =>
                                    //     setNewWarning({
                                    //         ...newWarning,
                                    //         date: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="warning-issued-by"
                                    className="text-right"
                                >
                                    Uitgegeven door
                                </Label>
                                <Input
                                    id="warning-issued-by"
                                    placeholder="Naam van de uitgever"
                                    className="col-span-3 bg-zinc-800 border-zinc-700"
                                    // value={newWarning.issuedBy}
                                    // onChange={(e) =>
                                    //     setNewWarning({
                                    //         ...newWarning,
                                    //         issuedBy: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                // onClick={() => setIsAddWarningOpen(false)}
                            >
                                Annuleren
                            </Button>
                            {/* <Button onClick={handleAddWarning}>
                                Toevoegen
                            </Button> */}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
