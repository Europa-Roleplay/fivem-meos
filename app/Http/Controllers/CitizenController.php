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
        $players = Http::get(env('API_URL') . '/getplayers')->json();

        foreach ($players as $player) {
            $fixedDate = null;
            if (!empty($player['dateofbirth'])) {
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

    public static function getLicense($identifier)
    {
        $response = Http::post(env('API_URL') . '/getlicense', [
            'identifier' => $identifier,
        ]);

        return $response->json();
    }

    public function index()
    {
        // $this->getCitizens();
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
        $user = Citizen::with(['notes' => function ($query) {
            $query->with('author');
        }])->findOrFail($id);
        $jobs = JobGrade::all();
        $licences = self::getLicense($user->identifier)['licenses'] ?? [];

        return Inertia::render('Meos/Burger/Show', compact('user', 'jobs', 'licences'));
    }

    public static function removeLicense($identifier, $type)
    {
        $response = Http::post(env('API_URL') . '/take-license', [
            'identifier' => $identifier,
            'licenseType' => $type,
        ]);

        return response()->json(
            $response->json(),
            $response->status()
        );
    }

    public function getPersons()
    {
        $citizens = Citizen::all();

        return response()->json($citizens);
    }
}
