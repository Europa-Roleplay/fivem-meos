<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainingController extends Controller
{
    public function index()
    {
        $trainingen = Training::all();

        return Inertia::render('Admin/Trainingen', compact('trainingen'));
    }

    public function store(Request $request)
    {
        Training::create($request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'job' => 'required|string|max:255',
        ]));

        return redirect()->back()->with('success', 'Training succesvol aangemaakt!');
    }

    public function update(Training $training, Request $request)
    {
        $training->name = $request->name;
        $training->description = $request->description;
        $training->job = $request->job;
        $training->save();

        return redirect()->back()->with('success', 'Training succesvol geupdate!');
    }

    public function destroy(Training $training)
    {
        $training->delete();

        return redirect()->back()->with('success', 'Training succesvol verwijderd!');
    }
}
