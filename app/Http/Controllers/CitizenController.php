<?php

namespace App\Http\Controllers;

use App\Models\Citizen;
use App\Models\Conviction;
use App\Models\ConvictionPunishment;
use App\Models\JobGrade;
use App\Models\Penaltie;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $user = Citizen::with(['notes.author', 'convictions.convictionPunishments'])->findOrFail($id);

        $jobs = JobGrade::all();

        $penalties = Penaltie::all();

        $licences = self::getLicense($user->identifier)['licenses'] ?? [];

        return Inertia::render('Meos/Burger/Show', compact('user', 'jobs', 'licences', 'penalties'));
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

    public function updateWantedStatus(Request $request, $identifier)
    {
        $citizen = Citizen::where('identifier', $identifier)->firstOrFail();
        $citizen->update(['wanted' => !$citizen->wanted]);

        return response()->json(['message' => 'Status updated successfully']);
    }

    public function updateWantedReason(Request $request, $identifier)
    {
        $citizen = Citizen::where('identifier', $identifier)->firstOrFail();
        $citizen->update(['wanted_text' => $request->reason]);

        return response()->json(['message' => 'Wanted reason updated successfully']);
    }

    public function punish(Request $request)
    {
        $data = $request->all();

        $conviction = Conviction::create([
            'identifier' => $data['identifier'],
            'handcuff' => $data['handcuff'],
            'pvb' => $data['pvb'],
            'search' => $data['search'],
        ]);

        $totalTaskStraf = 0;
        $totalCelStraf = 0;

        foreach ($data['penalties'] as $penalty) {
            if ($penalty['penalty_type'] === 'taakstraf') {
                $totalTaskStraf += $penalty['amount'];
            } elseif ($penalty['penalty_type'] === 'celstraf') {
                $totalCelStraf += $penalty['amount'];
            }

            ConvictionPunishment::create([
                'conviction_id' => $conviction->id,
                'penalty_id' => $penalty['id'],
                'penalty_name' => $penalty['penalty_name'],
                'penalty_type' => $penalty['penalty_type'],
                'amount' => $penalty['amount'],
            ]);
        }

        // Converteer taakstraf als er ook celstraf is
        if ($totalCelStraf > 0 && $totalTaskStraf > 0) {
            $extraCelStraf = intdiv($totalTaskStraf, 5);
            if ($extraCelStraf > 0) {
                $totalCelStraf += $extraCelStraf;

                ConvictionPunishment::create([
                    'conviction_id' => $conviction->id,
                    'penalty_name' => 'Converted Taskstraffen',
                    'penalty_type' => 'celstraf',
                    'amount' => $extraCelStraf,
                ]);
            }
        }

        if ($totalTaskStraf > 0 && $totalCelStraf === 0) {
            Http::post(env('API_URL') . '/taakstraf', [
                'playeridentifier' => $data['identifier'],
                'useridentifier' => Auth::user()->discord_id,
                'count' => $totalTaskStraf,
                'reason' => 'Straf opgelegd door ' . Auth::user()->name,
            ]);
        } elseif ($totalCelStraf > 0 && $totalTaskStraf === 0) {
            Http::post(env('API_URL') . '/jail', [
                'playeridentifier' => $data['identifier'],
                'count' => $totalCelStraf,
            ]);
        } elseif ($totalCelStraf > 0 && $totalTaskStraf > 0) {
            Http::post(env('API_URL') . '/jail', [
                'playeridentifier' => $data['identifier'],
                'count' => $totalCelStraf,
            ]);
        }

        return redirect()->back()->with('success', 'Straf is succesvol opgelegd.');
    }
}
