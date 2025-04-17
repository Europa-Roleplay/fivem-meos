<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'note' => 'required|string|max:255',
            'citizen_id' => 'required|exists:citizens,id',
        ]);

        Note::create([
            'note' => $request->note,
            'user_id' => Auth::user()->id,
            'citizen_id' => $request->citizen_id,
        ]);

        return redirect()->back()->with('success', 'Note added successfully.');
    }
}
