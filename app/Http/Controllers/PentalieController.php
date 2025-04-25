<?php

namespace App\Http\Controllers;

use App\Models\Penaltie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PentalieController extends Controller
{
    public function index()
    {
        $initialPenalties = Penaltie::all();

        return Inertia::render('Admin/Penalties', compact('initialPenalties'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'amount' => 'required',
        ]);

        Penaltie::create([
            'penalty_name' => $validatedData['name'],
            'penalty_type' => $validatedData['type'],
            'amount' => intval($validatedData['amount']),
        ]);

        return redirect()->back()->with('success', 'Staf succesvol aangemaakt.');
    }

    public function update(Request $request)
    {
        dd($request->all());
    }

    public function destroy($id)
    {
        $penalty = Penaltie::find($id);
        $penalty->delete();

        return redirect()->back()->with('success', 'Penaltie succesvol verwijderd.');
    }
}
