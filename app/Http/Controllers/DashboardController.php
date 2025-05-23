<?php

namespace App\Http\Controllers;

use App\Models\Citizen;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $wantedCitizens = Citizen::where('wanted', 1)
            ->with(['convictions.convictionPunishments'])
            ->limit(10)
            ->get();

        return Inertia::render('Meos/Dashboard/Index', compact('wantedCitizens'));
    }
}
