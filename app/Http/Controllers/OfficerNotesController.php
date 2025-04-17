<?php

namespace App\Http\Controllers;

use App\Models\OfficerNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfficerNotesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'note' => 'required|string|max:255',
            'officer_id' => 'required|exists:users,id',
        ]);

        OfficerNote::create([
            'note' => $request->note,
            'officer_id' => $request->officer_id,
            'author_id' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'Notitie succesvol uitgeschreven.');
    }

    public function destroy(OfficerNote $officerNote)
    {
        $officerNote->delete();

        return back()->with('success', 'Notitie verwijderd!');
    }
}
