<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Boete;
use App\Models\Logboek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BoeteController extends Controller
{
    /**
     * Toon een lijst van alle boetes.
     */
    public function index(Request $request)
    {
        $query = Boete::query();

        // Filters toepassen
        if ($request->has('categorie') && $request->categorie !== '' && $request->categorie !== 'alle') {
            $query->where('categorie', $request->categorie);
        }

        if ($request->has('artikel') && $request->artikel !== '' && $request->artikel !== 'alle') {
            $query->where('artikel_nummer', $request->artikel);
        }

        if ($request->has('zoekterm') && $request->zoekterm !== '') {
            $zoekterm = $request->zoekterm;
            $query->where(function ($q) use ($zoekterm) {
                $q->where('titel', 'like', '%' . $zoekterm . '%')
                  ->orWhere('beschrijving', 'like', '%' . $zoekterm . '%')
                  ->orWhere('artikel_nummer', 'like', '%' . $zoekterm . '%');
            });
        }

        // Sorteren
        $sortField = $request->input('sort_field', 'artikel_nummer');
        $sortDirection = $request->input('sort_direction', 'asc');
        
        // Valideer de sorteervelden om SQL injectie te voorkomen
        $allowedSortFields = ['artikel_nummer', 'titel', 'categorie', 'bedrag', 'veroordeling'];
        $sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'artikel_nummer';
        $sortDirection = in_array($sortDirection, ['asc', 'desc']) ? $sortDirection : 'asc';
        
        $query->orderBy($sortField, $sortDirection);

        // Pagineren
        $boetes = $query->paginate(15)->withQueryString();

        // Haal alle unieke categorieën op uit de database
        $categorieën = Boete::select('categorie')
            ->distinct()
            ->orderBy('categorie')
            ->pluck('categorie')
            ->toArray();

        // Haal alle unieke artikelnummers op
        $artikelen = Boete::select('artikel_nummer')
            ->distinct()
            ->orderBy('artikel_nummer')
            ->pluck('artikel_nummer')
            ->toArray();

        return Inertia::render('Admin/Boetes/Index', [
            'boetes' => $boetes,
            'filters' => $request->only(['categorie', 'artikel', 'zoekterm']),
            'categorieën' => $categorieën,
            'artikelen' => $artikelen,
        ]);
    }

    /**
     * Toon het formulier voor het maken van een nieuwe boete.
     */
    public function create()
    {
        $categorieën = Boete::select('categorie')
            ->distinct()
            ->orderBy('categorie')
            ->pluck('categorie')
            ->toArray();

        return Inertia::render('Admin/Boetes/Create', [
            'categorieën' => $categorieën,
        ]);
    }

    /**
     * Sla een nieuwe boete op.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'artikel_nummer' => 'required|string|max:255',
            'titel' => 'required|string|max:255',
            'beschrijving' => 'nullable|string',
            'categorie' => 'required|string|max:255',
            'bedrag' => 'required|numeric|min:0',
            'veroordeling' => 'required|string|max:255',
        ]);

        $boete = Boete::create($validated);

        // Log de actie
        if (Auth::check()) {
            Logboek::create([
                'gebruiker' => Auth::user()->name,
                'actie_type' => 'create',
                'beschrijving' => 'Heeft een nieuwe boete aangemaakt: ' . $boete->titel,
                'data' => json_encode($boete),
            ]);
        }

        return redirect()->route('admin.boetes')->with('success', 'Boete succesvol aangemaakt.');
    }

    /**
     * Toon het formulier voor het bewerken van een boete.
     */
    public function edit(Boete $boete)
    {
        $categorieën = Boete::select('categorie')
            ->distinct()
            ->orderBy('categorie')
            ->pluck('categorie')
            ->toArray();

        return Inertia::render('Admin/Boetes/Edit', [
            'boete' => $boete,
            'categorieën' => $categorieën,
        ]);
    }

    /**
     * Update de opgegeven boete.
     */
    public function update(Request $request, Boete $boete)
    {
        $validated = $request->validate([
            'artikel_nummer' => 'required|string|max:255',
            'titel' => 'required|string|max:255',
            'beschrijving' => 'nullable|string',
            'categorie' => 'required|string|max:255',
            'bedrag' => 'required|numeric|min:0',
            'veroordeling' => 'required|string|max:255',
        ]);

        $oudeBedrag = $boete->bedrag;
        $boete->update($validated);

        // Log de actie
        if (Auth::check()) {
            Logboek::create([
                'gebruiker' => Auth::user()->name,
                'actie_type' => 'update',
                'beschrijving' => 'Heeft een boete bijgewerkt: ' . $boete->titel,
                'data' => json_encode([
                    'oud_bedrag' => $oudeBedrag,
                    'nieuw_bedrag' => $boete->bedrag,
                    'boete' => $boete
                ]),
            ]);
        }

        return redirect()->route('admin.boetes')->with('success', 'Boete succesvol bijgewerkt.');
    }

    /**
     * Verwijder de opgegeven boete.
     */
    public function destroy(Boete $boete)
    {
        $boeteInfo = $boete->toArray();
        $boete->delete();

        // Log de actie
        if (Auth::check()) {
            Logboek::create([
                'gebruiker' => Auth::user()->name,
                'actie_type' => 'delete',
                'beschrijving' => 'Heeft een boete verwijderd: ' . $boeteInfo['titel'],
                'data' => json_encode($boeteInfo),
            ]);
        }

        return redirect()->route('admin.boetes')->with('success', 'Boete succesvol verwijderd.');
    }

    /**
     * Exporteer boetes naar CSV.
     */
    public function export(Request $request)
    {
        try {
            $query = Boete::query();

            // Dezelfde filters toepassen als bij index
            if ($request->has('categorie') && $request->categorie !== '' && $request->categorie !== 'alle') {
                $query->where('categorie', $request->categorie);
            }

            if ($request->has('artikel') && $request->artikel !== '' && $request->artikel !== 'alle') {
                $query->where('artikel_nummer', $request->artikel);
            }

            if ($request->has('zoekterm') && $request->zoekterm !== '') {
                $zoekterm = $request->zoekterm;
                $query->where(function ($q) use ($zoekterm) {
                    $q->where('titel', 'like', '%' . $zoekterm . '%')
                      ->orWhere('beschrijving', 'like', '%' . $zoekterm . '%')
                      ->orWhere('artikel_nummer', 'like', '%' . $zoekterm . '%');
                });
            }

            // Sorteren
            $sortField = $request->input('sort_field', 'artikel_nummer');
            $sortDirection = $request->input('sort_direction', 'asc');
            
            // Valideer de sorteervelden om SQL injectie te voorkomen
            $allowedSortFields = ['artikel_nummer', 'titel', 'categorie', 'bedrag', 'veroordeling'];
            $sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'artikel_nummer';
            $sortDirection = in_array($sortDirection, ['asc', 'desc']) ? $sortDirection : 'asc';
            
            $query->orderBy($sortField, $sortDirection);

            // Alle resultaten ophalen voor export
            $boetes = $query->get();

            // Log de export actie
            if (Auth::check()) {
                Logboek::create([
                    'gebruiker' => Auth::user()->name,
                    'actie_type' => 'export',
                    'beschrijving' => 'Heeft de boetes geëxporteerd',
                    'data' => json_encode([
                        'filters' => $request->all(),
                        'aantal_records' => $boetes->count(),
                    ]),
                ]);
            }

            // CSV export
            $filename = 'boetes_export_' . date('Y-m-d_His') . '.csv';
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                'Pragma' => 'no-cache',
                'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                'Expires' => '0',
            ];

            $callback = function () use ($boetes) {
                $file = fopen('php://output', 'w');
                
                // CSV header
                fputcsv($file, ['ID', 'Artikel', 'Titel', 'Beschrijving', 'Categorie', 'Bedrag', 'Veroordeling']);
                
                // CSV data
                foreach ($boetes as $boete) {
                    fputcsv($file, [
                        $boete->id,
                        $boete->artikel_nummer,
                        $boete->titel,
                        $boete->beschrijving,
                        $boete->categorie,
                        $boete->bedrag,
                        $boete->veroordeling,
                    ]);
                }
                
                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        } catch (\Exception $e) {
            
            // Redirect terug met een foutmelding
            return redirect()->back()->with('error', 'Er is een fout opgetreden bij het exporteren: ' . $e->getMessage());
        }
    }
}
