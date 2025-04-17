<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Logboek;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogboekController extends Controller
{
    public function index(Request $request)
    {
        $query = Logboek::query();

        if ($request->has('gebruiker') && $request->gebruiker !== '') {
            $query->where('gebruiker', $request->gebruiker);
        }

        if ($request->has('actieType') && $request->actieType !== '' && $request->actieType !== 'alle') {
            $query->where('actie_type', $request->actieType);
        }

        if ($request->has('zoekterm') && $request->zoekterm !== '') {
            $zoekterm = $request->zoekterm;
            $query->where(function ($q) use ($zoekterm) {
                $q->where('beschrijving', 'like', '%'.$zoekterm.'%')
                    ->orWhere('gebruiker', 'like', '%'.$zoekterm.'%');
            });
        }

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        $allowedSortFields = ['created_at', 'gebruiker', 'actie_type', 'beschrijving'];
        $sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'created_at';
        $sortDirection = in_array($sortDirection, ['asc', 'desc']) ? $sortDirection : 'desc';

        $query->orderBy($sortField, $sortDirection);

        $logboek = $query->paginate(10)->withQueryString();

        $actieTypes = Logboek::select('actie_type')
            ->distinct()
            ->orderBy('actie_type')
            ->pluck('actie_type')
            ->toArray();

        $gebruikers = Logboek::select('gebruiker')
            ->distinct()
            ->orderBy('gebruiker')
            ->pluck('gebruiker')
            ->toArray();

        return Inertia::render('Admin/Logboek/Index', [
            'logboek' => $logboek,
            'filters' => $request->only(['gebruiker', 'actieType', 'zoekterm']),
            'actieTypes' => $actieTypes,
            'gebruikers' => $gebruikers,
        ]);
    }

    public function export(Request $request)
    {
        $query = Logboek::query();

        if ($request->has('gebruiker') && $request->gebruiker !== '') {
            $query->where('gebruiker', $request->gebruiker);
        }

        if ($request->has('actieType') && $request->actieType !== '' && $request->actieType !== 'alle') {
            $query->where('actie_type', $request->actieType);
        }

        if ($request->has('zoekterm') && $request->zoekterm !== '') {
            $zoekterm = $request->zoekterm;
            $query->where(function ($q) use ($zoekterm) {
                $q->where('beschrijving', 'like', '%'.$zoekterm.'%')
                    ->orWhere('gebruiker', 'like', '%'.$zoekterm.'%');
            });
        }

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        $allowedSortFields = ['created_at', 'gebruiker', 'actie_type', 'beschrijving'];
        $sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'created_at';
        $sortDirection = in_array($sortDirection, ['asc', 'desc']) ? $sortDirection : 'desc';

        $query->orderBy($sortField, $sortDirection);

        $logboek = $query->get();

        $filename = 'logboek_export_'.date('Y-m-d_His').'.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ];

        $callback = function () use ($logboek) {
            $file = fopen('php://output', 'w');

            // CSV header
            fputcsv($file, ['ID', 'Tijdstip', 'Gebruiker', 'Actie Type', 'Beschrijving']);

            // CSV data
            foreach ($logboek as $item) {
                fputcsv($file, [
                    $item->id,
                    $item->created_at,
                    $item->gebruiker,
                    $item->actie_type,
                    $item->beschrijving,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
