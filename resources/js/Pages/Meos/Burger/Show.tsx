import Checkbox from "@/Components/Checkbox";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/Components/ui/command";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import MeosLayout from "@/Layouts/MeosLayout";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Briefcase, FileText, Save, User, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Show({
    user,
    jobs,
    licences,
    penalties,
}: {
    user: any;
    jobs: any[];
    licences: any[];
    penalties: any[];
}) {
   
    const [note, setNote] = useState<string>("");
    const [veroordelen, setVeroordelen] = useState<boolean>(false);

    const [selectedPenalties, setSelectedPenalties] = useState<any[]>([]);
    const [handCuff, setHandcuff] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
    const [pvb, setPvb] = useState<string>("");

    const [wantedReason, setWantedReason] = useState<string>("");

     useEffect(() => {
        if (user.wanted) {
            setWantedReason(user.wanted_text);
        }
     }, [user.wanted, user.wanted_text]);

    const submit = () => {
        router.post(route("dashboard.citizen.punish", user.identifier), {
            identifier: user.identifier,
            penalties: selectedPenalties,
            handcuff: handCuff,
            pvb: pvb,
            search: search,
        });
    };

    return (
        <MeosLayout>
            <div className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="bg-zinc-800 border-zinc-700 grid grid-cols-4">
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
                        <TabsTrigger value="penalties">
                            <FileText className="mr-2 h-4 w-4" />
                            Strafblad
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
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-400">
                                            Gezocht
                                        </span>
                                        <span
                                            className="text-zinc-300 cursor-pointer"
                                            onClick={() => {
                                                axios
                                                    .post(
                                                        route(
                                                            "api.updateWantedStatus",
                                                            {
                                                                identifier: user.identifier,
                                                                wanted: false,
                                                            }
                                                        )
                                                    )
                                                    .then(() => {
                                                        window.location.reload();
                                                    })
                                                    .catch((err) =>
                                                        console.error(err)
                                                    );
                                            }}
                                        >
                                            <span className={user.wanted ? "text-red-500 font-bold" : ""}>  
                                                {user.wanted ? "Ja" : "Nee"}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                {user.wanted == "1" && (
                                    <>
                                        <Label id="info" className="text-zinc-400">Informatie</Label>
                                        <Textarea 
                                            className="text-zinc-300 border-red-500" 
                                            value={wantedReason || ""} 
                                            onChange={(e) => {
                                                setWantedReason(e.target.value);
                                            }} 
                                        />
                                        <Button 
                                            className="mt-2 bg-red-500 hover:bg-red-600" 
                                            onClick={() => {
                                                axios.post(route("api.updateWantedReason", {
                                                    identifier: user.identifier,
                                                    reason: wantedReason || ""
                                                })).then(() => {
                                                    window.location.reload();
                                                }).catch((err) => console.error(err));
                                            }}
                                        >
                                            <Save />
                                        </Button>
                                    </>
                                )}
                                <Separator />
                                <h2 className="text-zinc-400">Rijbewijzen</h2>
                                <InfoRow
                                    ribba={true}
                                    identifier={user.identifier}
                                    licenceType="dmv"
                                    label="Theorie"
                                    value={
                                        licences.includes("dmv") ? "Ja" : "Nee"
                                    }
                                ></InfoRow>
                                <InfoRow
                                    ribba={true}
                                    identifier={user.identifier}
                                    licenceType="drive"
                                    label="Rijbewijs B"
                                    value={
                                        licences.includes("drive")
                                            ? "Ja"
                                            : "Nee"
                                    }
                                />
                                <InfoRow
                                    ribba={true}
                                    identifier={user.identifier}
                                    licenceType="drive_bike"
                                    label="Rijbewijs A"
                                    value={
                                        licences.includes("drive_bike")
                                            ? "Ja"
                                            : "Nee"
                                    }
                                />
                                <InfoRow
                                    ribba={true}
                                    identifier={user.identifier}
                                    licenceType="drive_truck"
                                    label="Rijbewijs C1 ( Vrachtwagen )"
                                    value={
                                        licences.includes("drive_truck")
                                            ? "Ja"
                                            : "Nee"
                                    }
                                />
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
                    <TabsContent value="penalties" className="mt-4">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-zinc-400">
                                    Strafblad
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button
                                    className="w-full bg-red-600 hover:bg-red-700"
                                    onClick={() => {
                                        setVeroordelen(true);
                                    }}
                                >
                                    Veroordeel persoon
                                </Button>
                                {user.convictions.length > 0 ? (
                                    user.convictions.map((conviction: any) => (
                                        <div
                                            key={conviction.id}
                                            className="p-3 bg-zinc-800 rounded-md space-y-2"
                                        >
                                            <div className="text-sm text-zinc-300">
                                                <strong>
                                                    Veroordeling ID:
                                                </strong>{" "}
                                                {conviction.id}
                                            </div>
                                            <div className="text-sm text-zinc-300">
                                                <strong>Delicten:</strong>
                                            </div>
                                            {conviction.conviction_punishments.map(
                                                (punishment: any) => (
                                                    <div
                                                        key={punishment.id}
                                                        className="p-2 bg-zinc-700 rounded-md"
                                                    >
                                                        <div className="text-sm text-zinc-300">
                                                            <strong>
                                                                Penalty Name:
                                                            </strong>{" "}
                                                            {
                                                                punishment.penalty_name
                                                            }
                                                        </div>
                                                        <div className="text-sm text-zinc-300">
                                                            <strong>
                                                                Penalty Type:
                                                            </strong>{" "}
                                                            {
                                                                punishment.penalty_type
                                                            }
                                                        </div>
                                                        <div className="text-sm text-zinc-300">
                                                            <strong>
                                                                Amount:
                                                            </strong>{" "}
                                                            {punishment.amount}
                                                        </div>
                                                        <div className="text-xs text-zinc-400 mt-2">
                                                            {new Date(
                                                                punishment.created_at
                                                            ).toLocaleString(
                                                                "nl-NL"
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-zinc-400">
                                        Deze persoon heeft geen strafblad.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <Dialog open={veroordelen} onOpenChange={setVeroordelen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 rounded-lg min-h-[800px]">
                    <div className="p-4 space-y-4">
                        <Label className="text-zinc-300" htmlFor="straf">
                            Selecteer een straf
                        </Label>
                        <Command className="rounded-lg border border-zinc-700 shadow-md bg-zinc-800 text-zinc-300 max-h-72">
                            <CommandInput
                                placeholder="Zoek op straffen"
                                className="bg-zinc-700 text-zinc-200 placeholder-zinc-500 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <CommandList className="max-h-60 overflow-y-auto">
                                <CommandEmpty className="p-2 text-zinc-400">
                                    Geen straffen gevonden.
                                </CommandEmpty>
                                <CommandGroup
                                    heading="Celstraffen"
                                    className="p-2 text-zinc-400"
                                >
                                    {penalties
                                        .filter(
                                            (penalty: any) =>
                                                penalty.penalty_type ===
                                                "celstraf"
                                        )
                                        .map((penalty: any) => (
                                            <CommandItem
                                                onSelect={() => {
                                                    const selectedPenalty =
                                                        penalties.find(
                                                            (p: any) =>
                                                                p.id ===
                                                                penalty.id
                                                        );
                                                    if (selectedPenalty) {
                                                        setSelectedPenalties(
                                                            (prev) => {
                                                                if (
                                                                    prev.some(
                                                                        (p) =>
                                                                            p.id ===
                                                                            selectedPenalty.id
                                                                    )
                                                                ) {
                                                                    return prev;
                                                                }
                                                                return [
                                                                    ...prev,
                                                                    selectedPenalty,
                                                                ];
                                                            }
                                                        );
                                                    }
                                                }}
                                                value={penalty.id}
                                                key={penalty.id}
                                                className={`cursor-pointer hover:bg-zinc-700 rounded-md p-2 text-zinc-200 ${
                                                    selectedPenalties.some(
                                                        (p) =>
                                                            p.id === penalty.id
                                                    )
                                                        ? "opacity-50 pointer-events-none"
                                                        : ""
                                                }`}
                                            >
                                                <span>
                                                    {penalty.penalty_name}
                                                </span>
                                            </CommandItem>
                                        ))}
                                </CommandGroup>
                                <CommandSeparator className="border-zinc-700" />
                                <CommandGroup
                                    heading="Taakstraffen"
                                    className="p-2 text-zinc-400"
                                >
                                    {penalties
                                        .filter(
                                            (penalty: any) =>
                                                penalty.penalty_type ===
                                                "taakstraf"
                                        )
                                        .map((penalty: any) => (
                                            <CommandItem
                                                onSelect={() => {
                                                    const selectedPenalty =
                                                        penalties.find(
                                                            (p: any) =>
                                                                p.id ===
                                                                penalty.id
                                                        );
                                                    if (selectedPenalty) {
                                                        setSelectedPenalties(
                                                            (prev) => {
                                                                if (
                                                                    prev.some(
                                                                        (p) =>
                                                                            p.id ===
                                                                            selectedPenalty.id
                                                                    )
                                                                ) {
                                                                    return prev;
                                                                }
                                                                return [
                                                                    ...prev,
                                                                    selectedPenalty,
                                                                ];
                                                            }
                                                        );
                                                    }
                                                }}
                                                value={penalty.id}
                                                key={penalty.id}
                                                className={`cursor-pointer hover:bg-zinc-700 rounded-md p-2 text-zinc-200 ${
                                                    selectedPenalties.some(
                                                        (p) =>
                                                            p.id === penalty.id
                                                    )
                                                        ? "opacity-50 pointer-events-none"
                                                        : ""
                                                }`}
                                            >
                                                <span>
                                                    {penalty.penalty_name}
                                                </span>
                                            </CommandItem>
                                        ))}
                                </CommandGroup>
                                <CommandSeparator className="border-zinc-700" />
                                <CommandGroup
                                    heading="Boetes"
                                    className="p-2 text-zinc-400"
                                >
                                    {penalties
                                        .filter(
                                            (penalty: any) =>
                                                penalty.penalty_type.trim() ===
                                                "boete"
                                        )
                                        .map((penalty: any) => (
                                            <CommandItem
                                                onSelect={() => {
                                                    const selectedPenalty =
                                                        penalties.find(
                                                            (p: any) =>
                                                                p.id ===
                                                                penalty.id
                                                        );
                                                    if (selectedPenalty) {
                                                        setSelectedPenalties(
                                                            (prev) => {
                                                                if (
                                                                    prev.some(
                                                                        (p) =>
                                                                            p.id ===
                                                                            selectedPenalty.id
                                                                    )
                                                                ) {
                                                                    return prev;
                                                                }
                                                                return [
                                                                    ...prev,
                                                                    selectedPenalty,
                                                                ];
                                                            }
                                                        );
                                                    }
                                                }}
                                                value={penalty.id}
                                                key={penalty.id}
                                                className={`cursor-pointer hover:bg-zinc-700 rounded-md p-2 text-zinc-200 ${
                                                    selectedPenalties.some(
                                                        (p) =>
                                                            p.id === penalty.id
                                                    )
                                                        ? "opacity-50 pointer-events-none"
                                                        : ""
                                                }`}
                                            >
                                                <span>
                                                    {penalty.penalty_name}
                                                </span>
                                            </CommandItem>
                                        ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>

                        <div className="space-y-2">
                            {selectedPenalties.map((penalty, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center bg-zinc-800 p-2 rounded-md"
                                >
                                    <span className="text-zinc-300">
                                        {penalty.penalty_name}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:bg-zinc-700"
                                        onClick={() => {
                                            setSelectedPenalties((prev) =>
                                                prev.filter(
                                                    (item) =>
                                                        item.id !== penalty.id
                                                )
                                            );
                                        }}
                                    >
                                        🗑️
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-zinc-300" htmlFor="pvb">
                                PVB
                            </Label>
                            <Textarea
                                placeholder="Voeg een PVB toe..."
                                className="bg-zinc-800 border-zinc-700 focus:border-blue-500 min-h-[100px] text-white"
                                value={pvb}
                                onChange={(e) => setPvb(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2 flex items-center gap-2">
                            <Checkbox
                                className="text-blue-500"
                                id="cuf"
                                checked={handCuff}
                                onChange={() => {
                                    setHandcuff(!handCuff);
                                }}
                            />
                            <Label className="text-zinc-300" htmlFor="cuf">
                                Handboeien gebruikt?
                            </Label>
                        </div>

                        <div className="space-y-2 flex items-center gap-2">
                            <Checkbox
                                className="text-blue-500"
                                id="search"
                                checked={search}
                                onChange={() => {
                                    setSearch(!search);
                                }}
                            />
                            <Label className="text-zinc-300" htmlFor="search">
                                Persoon doorzocht?
                            </Label>
                        </div>

                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => {
                                submit();
                                setVeroordelen(false);
                            }}
                        >
                            Veroordeel persoon
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </MeosLayout>
    );
}

function InfoRow(props: {
    label: string;
    value: string;
    ribba?: boolean;
    identifier?: string;
    licenceType?: string;
}) {
    const { label, value, ribba, identifier, licenceType } = props;
    return (
        <div className="flex justify-between items-center">
            <span className="text-zinc-400">{label}</span>
            <span className="text-zinc-300">{value ?? "Onbekend"}</span>
            {ribba && (
                <Button
                    disabled={value === "Nee"}
                    onClick={() => {
                        console.log(
                            "Ribba nakken van",
                            identifier,
                            licenceType
                        );

                        const response = axios.post(
                            route("api.takeLicence", {
                                identifier: identifier,
                                type: licenceType,
                            })
                        );
                        response
                            .then((res) => {
                                window.location.reload();
                            })
                            .catch((err) => console.error(err));
                    }}
                >
                    {label} afnemen
                </Button>
            )}
        </div>
    );
}
