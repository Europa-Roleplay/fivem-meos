import { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import {
    AlertCircle,
    Check,
    FileText,
    Plus,
    Search,
    Trash,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { router } from "@inertiajs/react";
import axios from "axios";

export function ConvictPerson() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
    const [selectedFines, setSelectedFines] = useState<any[]>([]);
    const [selectedPenalties, setSelectedPenalties] = useState<any[]>([]);
    const [summary, setSummary] = useState("");
    const [location, setLocation] = useState("");
    const [reportNumber, setReportNumber] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [pvbText, setPvbText] = useState("");

    const [identitySearch, setIdentitySearch] = useState(false);
    const [safetySearch, setSafetySearch] = useState(false);
    const [useOfForce, setUseOfForce] = useState(false);
    const [confiscation, setConfiscation] = useState("");
    const [useHandcuffs, setUseHandcuffs] = useState(false);
    const [legalAssistance, setLegalAssistance] = useState(false);
    const [findings, setFindings] = useState("");

    const [persons, setPersons] = useState<any[]>([]);

    // Generate a random report number when opening the dialog
    useEffect(() => {
        if (isOpen) {
            const randomNum = Math.floor(Math.random() * 900000) + 100000;
            setReportNumber(`PV-${randomNum}`);
        }
    }, [isOpen]);

    // Reset form when dialog is closed
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setSearchQuery("");
            setSelectedPerson(null);
            setSelectedFines([]);
            setSelectedPenalties([]);
            setSummary("");
            setLocation("");
            setIdentitySearch(false);
            setSafetySearch(false);
            setUseOfForce(false);
            setConfiscation("");
            setUseHandcuffs(false);
            setLegalAssistance(false);
            setFindings("");
        }

        const fetchPersons = async (): Promise<any[]> => {
            try {
                const response = await axios.get("/api/persons");
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error("Failed to fetch persons");
                }
            } catch (error) {
                console.error("Error fetching persons:", error);
                return [];
            }
        };

        (async () => {
            const persons = await fetchPersons();
            if (persons.length > 0) {
                setPersons(persons);
            } else {
                console.error("No persons found");
            }
        })();
    }, [isOpen]);

    // Generate PVB text when all data is available
    useEffect(() => {
        if (
            selectedPerson &&
            (selectedFines.length > 0 || selectedPenalties.length > 0)
        ) {
            const currentDate = new Date().toLocaleDateString("nl-NL");
            const currentTime = new Date().toLocaleTimeString("nl-NL");

            let text = `PROCES VERBAAL VAN BEVINDINGEN\n\n`;
            text += `Rapportnummer: ${reportNumber}\n`;
            text += `Datum: ${currentDate}\n`;
            text += `Tijd: ${currentTime}\n\n`;

            text += `VERDACHTE GEGEVENS\n`;
            text += `Naam: ${selectedPerson.firstname} ${selectedPerson.lastname}\n`;
            text += `Geboortedatum: ${selectedPerson.birthdate}\n\n`;

            text += `LOCATIE\n${location || "[Locatie niet ingevuld]"}\n\n`;

            text += `SAMENVATTING\n${
                summary || "[Samenvatting niet ingevuld]"
            }\n\n`;

            text += `PROCEDURES\n`;
            text += `Identiteitsfouillering: ${
                identitySearch ? "Ja" : "Nee"
            }\n`;
            text += `Veiligheidsfouillering: ${safetySearch ? "Ja" : "Nee"}\n`;
            text += `Gebruik geweld: ${useOfForce ? "Ja" : "Nee"}\n`;
            text += `Inbeslagname: ${confiscation || "Nee"}\n`;
            text += `Gebruik transportboeien: ${useHandcuffs ? "Ja" : "Nee"}\n`;
            text += `Rechtsbijstand: ${legalAssistance ? "Ja" : "Nee"}\n\n`;

            if (findings) {
                text += `BEVINDINGEN\n${findings}\n\n`;
            }

            if (selectedFines.length > 0) {
                text += `BOETES\n`;
                selectedFines.forEach((fine) => {
                    text += `- ${fine.article}: ${
                        fine.description
                    } - €${fine.amount.toFixed(2)}\n`;
                });
                text += `\n`;
            }

            if (selectedPenalties.length > 0) {
                text += `STRAFFEN\n`;
                selectedPenalties.forEach((penalty: any) => {
                    const duration =
                        penalty.type === "celstraf"
                            ? `${penalty.duration} maanden celstraf`
                            : `${penalty.duration} uur taakstraf`;
                    text += `- ${penalty.article}: ${penalty.description} - ${duration}\n`;
                });
                text += `\n`;
            }

            const totalFineAmount = selectedFines.reduce(
                (sum, fine) => sum + fine.amount,
                0
            );
            text += `TOTAAL BOETEBEDRAG: €${totalFineAmount.toFixed(2)}\n\n`;

            text += `Opgemaakt door: [Agent Naam]\n`;
            text += `Handtekening: ________________`;

            setPvbText(text);
        }
    }, [
        selectedPerson,
        selectedFines,
        selectedPenalties,
        summary,
        location,
        reportNumber,
        identitySearch,
        safetySearch,
        useOfForce,
        confiscation,
        useHandcuffs,
        legalAssistance,
        findings,
    ]);

    const handleAddFine = (fine: any) => {
        setSelectedFines([...selectedFines, fine]);
    };

    const handleRemoveFine = (fineId: any) => {
        setSelectedFines(selectedFines.filter((fine) => fine.id !== fineId));
    };

    const handleAddPenalty = (penalty: any) => {
        setSelectedPenalties([...selectedPenalties, penalty]);
    };

    const handleRemovePenalty = (penaltyId: any) => {
        setSelectedPenalties(
            selectedPenalties.filter((penalty) => penalty.id !== penaltyId)
        );
    };

    const handleSelectPerson = (person: any) => {
        setSelectedPerson(person);
        setIsSearchOpen(false);
        setStep(2);
    };

    const handleSubmit = () => {
        // In a real application, you would save the conviction to the database here
        alert("Veroordeling succesvol opgeslagen!");
        setIsOpen(false);
    };

    const handleCopyPVB = () => {
        navigator.clipboard.writeText(pvbText);
        alert("PVB gekopieerd naar klembord!");
    };

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="default"
                            className="gap-2"
                            onClick={() => setIsOpen(true)}
                        >
                            <FileText className="h-4 w-4" />
                            Veroordeel Persoon
                        </Button>
                    </TooltipTrigger>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl text-white">
                    <DialogHeader>
                        <DialogTitle>Persoon Veroordelen</DialogTitle>
                        <DialogDescription>
                            {step === 1 &&
                                "Zoek en selecteer een persoon om te veroordelen."}
                            {step === 2 &&
                                "Selecteer boetes en straffen voor de veroordeling."}
                            {step === 3 &&
                                "Controleer en bevestig de veroordeling."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant={step === 1 ? "default" : "outline"}
                                className={step === 1 ? "bg-blue-500" : ""}
                            >
                                1. Persoon Selecteren
                            </Badge>
                            <Badge
                                variant={step === 2 ? "default" : "outline"}
                                className={step === 2 ? "bg-blue-500" : ""}
                            >
                                2. Straffen Toewijzen
                            </Badge>
                            <Badge
                                variant={step === 3 ? "default" : "outline"}
                                className={step === 3 ? "bg-blue-500" : ""}
                            >
                                3. Bevestigen
                            </Badge>
                        </div>
                        <div>
                            <Badge variant="outline" className="bg-zinc-800">
                                Rapportnummer: {reportNumber}
                            </Badge>
                        </div>
                    </div>

                    {/* Step 1: Select Person */}
                    {step === 1 && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="person-search">
                                    Zoek Persoon
                                </Label>
                                <Popover
                                    open={isSearchOpen}
                                    onOpenChange={setIsSearchOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={isSearchOpen}
                                            className="w-full justify-between bg-zinc-800 border-zinc-700"
                                        >
                                            {selectedPerson
                                                ? `${selectedPerson.firstname} ${selectedPerson.lastname} (${selectedPerson.birthdate})`
                                                : "Zoek op naam of geboortedatum..."}
                                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0 bg-zinc-900 border-zinc-800 text-white">
                                        <Command className="bg-transparent">
                                            <CommandInput
                                                placeholder="Zoek persoon..."
                                                className="h-9 border-b border-zinc-800"
                                                value={searchQuery}
                                                onValueChange={setSearchQuery}
                                            />
                                            <CommandList>
                                                <CommandEmpty>
                                                    Geen personen gevonden.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {persons
                                                        .filter(
                                                            (person: any) =>
                                                                person.firstname
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        searchQuery.toLowerCase()
                                                                    ) ||
                                                                person.lastname
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        searchQuery.toLowerCase()
                                                                    ) ||
                                                                person.birthdate.includes(
                                                                    searchQuery
                                                                )
                                                        )
                                                        .map((person) => (
                                                            <CommandItem
                                                                key={person.id}
                                                                value={`${person.firstname} ${person.lastname}`}
                                                                onSelect={() =>
                                                                    handleSelectPerson(
                                                                        person
                                                                    )
                                                                }
                                                                className="cursor-pointer text-white w-full"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                                                        {person.firstname.charAt(
                                                                            0
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-medium">
                                                                            {
                                                                                person.firstname
                                                                            }{" "}
                                                                            {
                                                                                person.lastname
                                                                            }
                                                                        </div>
                                                                        <div className="text-xs text-zinc-400">
                                                                            Geb:{" "}
                                                                            {
                                                                                person.birthdate
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </CommandItem>
                                                        ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {selectedPerson && (
                                <Card className="bg-zinc-800 border-zinc-700">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 text-xl">
                                                {selectedPerson.firstname.charAt(
                                                    0
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium">
                                                    {selectedPerson.firstname}{" "}
                                                    {selectedPerson.lastname}
                                                </h3>
                                                <p className="text-zinc-400">
                                                    Geboortedatum:{" "}
                                                    {selectedPerson.birthdate}
                                                </p>
                                                <p className="text-zinc-400">
                                                    ID: {selectedPerson.id}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* Step 2: Assign Punishments */}
                    {step === 2 && (
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300">
                                    {selectedPerson.firstname.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-medium">
                                        {selectedPerson.firstname}{" "}
                                        {selectedPerson.lastname}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Geboortedatum:{" "}
                                        {selectedPerson.birthdate}
                                    </p>
                                </div>
                            </div>

                            <Tabs defaultValue="fines" className="w-full">
                                <TabsList className="bg-zinc-800 border-zinc-700 grid grid-cols-2">
                                    <TabsTrigger value="fines">
                                        Boetes
                                    </TabsTrigger>
                                    <TabsTrigger value="penalties">
                                        Straffen
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                    value="fines"
                                    className="space-y-4 mt-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <Label>Selecteer Boete</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Boete Toevoegen
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-96 p-0 bg-zinc-900 border-zinc-800">
                                                <Command className="bg-transparent">
                                                    <CommandInput
                                                        placeholder="Zoek boete..."
                                                        className="h-9 border-b border-zinc-800"
                                                    />
                                                    <CommandList className="max-h-[300px]">
                                                        <CommandEmpty>
                                                            Geen boetes
                                                            gevonden.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {mockFines.map(
                                                                (fine) => (
                                                                    <CommandItem
                                                                        key={
                                                                            fine.id
                                                                        }
                                                                        value={
                                                                            fine.description
                                                                        }
                                                                        onSelect={() =>
                                                                            handleAddFine(
                                                                                fine
                                                                            )
                                                                        }
                                                                        className="cursor-pointer"
                                                                    >
                                                                        <div className="flex flex-col">
                                                                            <div className="font-medium">
                                                                                {
                                                                                    fine.article
                                                                                }

                                                                                :{" "}
                                                                                {
                                                                                    fine.description
                                                                                }
                                                                            </div>
                                                                            <div className="text-xs text-zinc-400">
                                                                                €
                                                                                {fine.amount.toFixed(
                                                                                    2
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {selectedFines.length > 0 ? (
                                        <div className="space-y-2">
                                            {selectedFines.map((fine) => (
                                                <div
                                                    key={fine.id}
                                                    className="flex items-center justify-between p-3 bg-zinc-800 rounded-md"
                                                >
                                                    <div>
                                                        <div className="font-medium">
                                                            {fine.article}:{" "}
                                                            {fine.description}
                                                        </div>
                                                        <div className="text-sm text-zinc-400">
                                                            €
                                                            {fine.amount.toFixed(
                                                                2
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleRemoveFine(
                                                                fine.id
                                                            )
                                                        }
                                                    >
                                                        <Trash className="h-4 w-4 text-red-400" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <div className="flex justify-between p-3 bg-zinc-800 rounded-md font-medium">
                                                <span>Totaal Boetebedrag:</span>
                                                <span>
                                                    €
                                                    {selectedFines
                                                        .reduce(
                                                            (sum, fine) =>
                                                                sum +
                                                                fine.amount,
                                                            0
                                                        )
                                                        .toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-zinc-500">
                                            Geen boetes geselecteerd
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent
                                    value="penalties"
                                    className="space-y-4 mt-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <Label>Selecteer Straf</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Straf Toevoegen
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-96 p-0 bg-zinc-900 border-zinc-800">
                                                <Command className="bg-transparent">
                                                    <CommandInput
                                                        placeholder="Zoek straf..."
                                                        className="h-9 border-b border-zinc-800"
                                                    />
                                                    <CommandList className="max-h-[300px]">
                                                        <CommandEmpty>
                                                            Geen straffen
                                                            gevonden.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {mockPenalties.map(
                                                                (penalty) => (
                                                                    <CommandItem
                                                                        key={
                                                                            penalty.id
                                                                        }
                                                                        value={
                                                                            penalty.description
                                                                        }
                                                                        onSelect={() =>
                                                                            handleAddPenalty(
                                                                                penalty
                                                                            )
                                                                        }
                                                                        className="cursor-pointer"
                                                                    >
                                                                        <div className="flex flex-col">
                                                                            <div className="font-medium">
                                                                                {
                                                                                    penalty.article
                                                                                }

                                                                                :{" "}
                                                                                {
                                                                                    penalty.description
                                                                                }
                                                                            </div>
                                                                            <div className="text-xs text-zinc-400">
                                                                                {penalty.type ===
                                                                                "celstraf"
                                                                                    ? `${penalty.duration} maanden celstraf`
                                                                                    : `${penalty.duration} uur taakstraf`}
                                                                            </div>
                                                                        </div>
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {selectedPenalties.length > 0 ? (
                                        <div className="space-y-2">
                                            {selectedPenalties.map(
                                                (penalty) => (
                                                    <div
                                                        key={penalty.id}
                                                        className="flex items-center justify-between p-3 bg-zinc-800 rounded-md"
                                                    >
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    penalty.article
                                                                }
                                                                :{" "}
                                                                {
                                                                    penalty.description
                                                                }
                                                            </div>
                                                            <div className="text-sm text-zinc-400">
                                                                {penalty.type ===
                                                                "celstraf"
                                                                    ? `${penalty.duration} maanden celstraf`
                                                                    : `${penalty.duration} uur taakstraf`}
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleRemovePenalty(
                                                                    penalty.id
                                                                )
                                                            }
                                                        >
                                                            <Trash className="h-4 w-4 text-red-400" />
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-zinc-500">
                                            Geen straffen geselecteerd
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>

                            <div className="space-y-2 pt-4">
                                <Label htmlFor="location">Locatie</Label>
                                <Input
                                    id="location"
                                    placeholder="Voer de locatie in..."
                                    className="bg-zinc-800 border-zinc-700"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="summary">Samenvatting</Label>
                                <Textarea
                                    id="summary"
                                    placeholder="Voer een korte samenvatting in van het scenario..."
                                    className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4 mt-6 border-t border-zinc-700 pt-4">
                                <h4 className="font-medium">
                                    Aanvullende Informatie
                                </h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="identity-search"
                                                checked={identitySearch}
                                                onChange={(e) =>
                                                    setIdentitySearch(
                                                        (
                                                            e.target as HTMLInputElement
                                                        ).checked
                                                    )
                                                }
                                                className="rounded border-zinc-700 bg-zinc-800"
                                            />
                                            <Label htmlFor="identity-search">
                                                Identiteitsfouillering
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="safety-search"
                                                checked={safetySearch}
                                                onChange={(e) =>
                                                    setSafetySearch(
                                                        (
                                                            e.target as HTMLInputElement
                                                        ).checked
                                                    )
                                                }
                                                className="rounded border-zinc-700 bg-zinc-800"
                                            />
                                            <Label htmlFor="safety-search">
                                                Veiligheidsfouillering
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="use-of-force"
                                                checked={useOfForce}
                                                onChange={(e) =>
                                                    setUseOfForce(
                                                        (
                                                            e.target as HTMLInputElement
                                                        ).checked
                                                    )
                                                }
                                                className="rounded border-zinc-700 bg-zinc-800"
                                            />
                                            <Label htmlFor="use-of-force">
                                                Gebruik geweld
                                            </Label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="use-handcuffs"
                                                checked={useHandcuffs}
                                                onChange={(e) =>
                                                    setUseHandcuffs(
                                                        (
                                                            e.target as HTMLInputElement
                                                        ).checked
                                                    )
                                                }
                                                className="rounded border-zinc-700 bg-zinc-800"
                                            />
                                            <Label htmlFor="use-handcuffs">
                                                Gebruik transportboeien
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="legal-assistance"
                                                checked={legalAssistance}
                                                onChange={(e) =>
                                                    setLegalAssistance(
                                                        (
                                                            e.target as HTMLInputElement
                                                        ).checked
                                                    )
                                                }
                                                className="rounded border-zinc-700 bg-zinc-800"
                                            />
                                            <Label htmlFor="legal-assistance">
                                                Rechtsbijstand
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confiscation">
                                        Inbeslagname
                                    </Label>
                                    <Input
                                        id="confiscation"
                                        placeholder="Bijv. Ja, Ruger SR9 x67 9MM"
                                        className="bg-zinc-800 border-zinc-700"
                                        value={confiscation}
                                        onChange={(e) =>
                                            setConfiscation(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="findings">
                                        Bevindingen
                                    </Label>
                                    <Textarea
                                        id="findings"
                                        placeholder="Voer bevindingen in..."
                                        className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                                        value={findings}
                                        onChange={(e) =>
                                            setFindings(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirm */}
                    {step === 3 && (
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300">
                                    {selectedPerson.firstname.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-medium">
                                        {selectedPerson.firstname}{" "}
                                        {selectedPerson.lastname}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Geboortedatum:{" "}
                                        {selectedPerson.birthdate}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">
                                        Proces Verbaal van Bevindingen
                                    </h4>
                                    <div className="bg-zinc-800 p-4 rounded-md">
                                        <pre className="whitespace-pre-wrap text-sm font-mono">
                                            {pvbText}
                                        </pre>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleCopyPVB}
                                >
                                    Kopieer PVB naar klembord
                                </Button>

                                {selectedFines.length === 0 &&
                                    selectedPenalties.length === 0 && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-red-400" />
                                            <span className="text-sm">
                                                Geen boetes of straffen
                                                geselecteerd.
                                            </span>
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex items-center justify-between">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                onClick={() => setStep(step - 1)}
                            >
                                Vorige
                            </Button>
                        )}
                        <div>
                            {step < 3 ? (
                                <Button
                                    onClick={() => setStep(step + 1)}
                                    disabled={
                                        (step === 1 && !selectedPerson) ||
                                        (step === 2 &&
                                            selectedFines.length === 0 &&
                                            selectedPenalties.length === 0)
                                    }
                                >
                                    Volgende
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={
                                        selectedFines.length === 0 &&
                                        selectedPenalties.length === 0
                                    }
                                >
                                    <Check className="mr-2 h-4 w-4" />
                                    Veroordeling Bevestigen
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

const mockFines = [
    {
        id: "F1001",
        article: "R397",
        description: "Door rood licht rijden",
        amount: 240.0,
        category: "Verkeer",
    },
    {
        id: "F1002",
        article: "R396",
        description:
            "Overschrijding maximumsnelheid binnen bebouwde kom (30 km/u)",
        amount: 180.0,
        category: "Verkeer",
    },
    {
        id: "F1003",
        article: "R626",
        description: "Rijden onder invloed (alcohol)",
        amount: 650.0,
        category: "Verkeer",
    },
    {
        id: "F1004",
        article: "G303",
        description: "Eenvoudige mishandeling",
        amount: 450.0,
        category: "Geweld",
    },
    {
        id: "F1005",
        article: "G304",
        description: "Bedreiging",
        amount: 350.0,
        category: "Geweld",
    },
    {
        id: "F1006",
        article: "O201",
        description: "Openbare dronkenschap",
        amount: 120.0,
        category: "Overig",
    },
    {
        id: "F1007",
        article: "O202",
        description: "Verstoring openbare orde",
        amount: 220.0,
        category: "Overig",
    },
    {
        id: "F1008",
        article: "R398",
        description: "Rijden zonder geldig rijbewijs",
        amount: 380.0,
        category: "Verkeer",
    },
];

const mockPenalties = [
    {
        id: "P1001",
        article: "S201",
        description: "Diefstal met geweld",
        type: "celstraf",
        duration: 24,
    },
    {
        id: "P1002",
        article: "S202",
        description: "Zware mishandeling",
        type: "celstraf",
        duration: 18,
    },
    {
        id: "P1003",
        article: "S203",
        description: "Wapenbezit (vuurwapen)",
        type: "celstraf",
        duration: 12,
    },
    {
        id: "P1004",
        article: "S204",
        description: "Drugshandel (kleine hoeveelheid)",
        type: "celstraf",
        duration: 6,
    },
    {
        id: "P1005",
        article: "S301",
        description: "Vandalisme",
        type: "taakstraf",
        duration: 40,
    },
    {
        id: "P1006",
        article: "S302",
        description: "Winkeldiefstal",
        type: "taakstraf",
        duration: 30,
    },
    {
        id: "P1007",
        article: "S303",
        description: "Verstoring openbare orde",
        type: "taakstraf",
        duration: 20,
    },
    {
        id: "P1008",
        article: "S304",
        description: "Belediging ambtenaar in functie",
        type: "taakstraf",
        duration: 15,
    },
];
