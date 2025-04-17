import { Badge } from "@/Components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import MeosLayout from "@/Layouts/MeosLayout";
import { router } from "@inertiajs/react";
import { Briefcase, FileText, User, Users } from "lucide-react";
import { useState } from "react";

export default function Show({ user, jobs }: { user: any; jobs: any[] }) {
    const [note, setNote] = useState<string>("");

    console.log(user);
    return (
        <MeosLayout>
            <div className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="bg-zinc-800 border-zinc-700 grid grid-cols-3">
                        <TabsTrigger value="personal">
                            <User className="mr-2 h-4 w-4" />
                            Persoonlijke Info
                        </TabsTrigger>
                        <TabsTrigger value="work">
                            <Briefcase className="mr-2 h-4 w-4" />
                            Werk & Organisatie
                        </TabsTrigger>
                        <TabsTrigger value="notes">
                            <FileText className="mr-2 h-4 w-4" />
                            Notities
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="mt-4">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="text-zinc-400">
                                        Persoonlijke Informatie
                                    </span>
                                    {/* <Badge
                                        variant="secondary"
                                        className={
                                            person.status === "Gezocht"
                                                ? "bg-red-500/10 text-red-400 border-red-500/30"
                                                : person.status === "Monitoren"
                                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                                : "bg-green-500/10 text-green-400 border-green-500/30"
                                        }
                                    >
                                        {person.status}
                                    </Badge> */}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoRow
                                    label="Voornaam"
                                    value={user.firstname}
                                />
                                <InfoRow
                                    label="Achternaam"
                                    value={user.lastname}
                                />
                                <InfoRow
                                    label="Geboortedatum"
                                    value={user.dateofbirth}
                                />
                                <InfoRow label="Geslacht" value={user.sex} />
                                <InfoRow
                                    label="Lengte"
                                    value={`${user.height} cm`}
                                />
                                <InfoRow label="IBAN" value={user.iban} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="work" className="mt-4">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-zinc-400">
                                    Werk & Organisatie
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium flex items-center text-zinc-300">
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        Primaire Baan
                                    </h3>
                                    <InfoRow label="Functie" value={user.job} />
                                    <InfoRow
                                        label="Grade"
                                        value={user.job_grade}
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-zinc-800">
                                    <h3 className="font-medium flex items-center text-zinc-300">
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        Tweede Baan
                                    </h3>
                                    <InfoRow
                                        label="Functie"
                                        value={user.secondjob}
                                    />
                                    <InfoRow
                                        label="Grade"
                                        value={user.secondjob_grade}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-4">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-zinc-400">
                                    Notities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    {user.notes.map((note: any) => (
                                        <div
                                            key={note.id}
                                            className="p-3 bg-zinc-800 rounded-md"
                                        >
                                            <div className="text-sm text-zinc-300">
                                                {note.note}
                                            </div>
                                            <div className="text-xs text-zinc-400 mt-2">
                                                {new Date(
                                                    note.created_at
                                                ).toLocaleString("nl-NL")}{" "}
                                                • {note.author.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-zinc-800 mt-4">
                                    <h3 className="font-medium mb-2 text-zinc-400">
                                        Nieuwe notitie toevoegen
                                    </h3>
                                    <Textarea
                                        placeholder="Voeg een notitie toe over deze persoon..."
                                        className="bg-zinc-800 border-zinc-700 focus:border-blue-500 min-h-[100px] text-white"
                                        value={note}
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-zinc-800"
                                    onClick={() => {
                                        router.post(route("note.store"), {
                                            note: note,
                                            citizen_id: user.id,
                                        });
                                        setNote("");
                                    }}
                                >
                                    Notitie opslaan
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </MeosLayout>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-zinc-400">{label}</span>
            <span className="text-zinc-300">{value ?? "Onbekend"}</span>
        </div>
    );
}
