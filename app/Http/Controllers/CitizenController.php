<?php

namespace App\Http\Controllers;

use App\Models\Citizen;
use App\Models\JobGrade;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CitizenController extends Controller
{
    public function getCitizens()
    {
        $players = Http::get('http://178.208.177.135:30120/eu-meos/getplayers')->json();

        foreach ($players as $player) {
            $fixedDate = null;
            if (! empty($player['dateofbirth'])) {
                try {
                    $fixedDate = Carbon::createFromFormat('d/m/Y', $player['dateofbirth'])->format('Y-m-d');
                } catch (\Exception $e) {
                    $fixedDate = null;
                }
            }

            Citizen::updateOrCreate(
                ['identifier' => $player['identifier']],
                [
                    'identifier' => $player['identifier'] ?? 'Onbekend',
                    'firstname' => $player['firstname'] ?? 'Onbekend',
                    'lastname' => $player['lastname'] ?? 'Onbekend',
                    'dateofbirth' => $fixedDate,
                    'height' => $player['height'] ?? 0,
                    'sex' => $player['sex'] ?? 'Onbekend',
                    'job' => $player['job'],
                    'job_grade' => $player['job_grade'],
                    'phone_number' => $player['phone_number'] ?? null,
                    'iban' => $player['iban'] ?? null,
                    'jailTime' => $player['jailTime'],
                    'communityService' => $player['communityService'],
                    'secondjob' => $player['secondjob'],
                    'secondjob_grade' => $player['secondjob_grade'],
                ]
            );
        }
    }

    public function index()
    {
        $users = Citizen::paginate(25);

        return Inertia::render('Meos/Burger/Index', compact('users'));
    }

    public function search(Request $request)
    {
        $search = $request->input('zoeken');
        $users = Citizen::where('firstname', 'like', "%{$search}%")
            ->orWhere('lastname', 'like', "%{$search}%")
            ->paginate(25);

        return Inertia::render('Meos/Burger/Index', compact('users'));
    }

    public function show($id)
    {
        // Retrieve the citizen record by ID or fail if not found
        $user = Citizen::with(['notes' => function ($query) {
            $query->with('author');
        }])->findOrFail($id);
        $jobs = JobGrade::all();

        return Inertia::render('Meos/Burger/Show', compact('user', 'jobs'));
    }
}
