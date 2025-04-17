<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\JobGrade;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $activePolice = User::where('active', 1)
            ->with('jobGrade')
            ->whereHas('jobGrade', function ($query) {
                $query->where('job', 'politie');
            })
            ->count();

        $activeKMAR = User::where('active', 1)
            ->with('jobGrade')
            ->whereHas('jobGrade', function ($query) {
                $query->where('job', 'kmar');
            })
            ->count();

        return Inertia::render('Admin/Dashboard', compact('activePolice', 'activeKMAR'));
    }

    public function users()
    {
        $userData = User::with('jobGrade')->get();
        $jobGrades = JobGrade::all();

        return Inertia::render('Admin/Users', compact('userData', 'jobGrades'));
    }

    public function store(StoreUserRequest $request)
    {
        User::create($request->validated());

        return redirect()->back()->with('success', 'Gebruiker succesvol aan het aangemaakt!');
    }
    public function update(User $user, Request $request)
    {
        $user->name = $request->name;
        $user->email = $request->email;
        $user->job_grade_id = $request->job_grade_id;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return redirect()->back()->with('success', 'Gebruiker succesvol geupdate!');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'Gebruiker succesvol verwijderd!');
    }

    public function status(User $user, Request $request)
    {
        $user->active = $request->status;
        $user->save();

        return redirect()->back()->with('success', 'Status succesvol aangepast!');
    }

    public function dossier()
    {
        $user = User::with(['jobGrade', 'OfficerNotes.author'])->findOrFail(request()->route('user'));

        return Inertia::render('Admin/Dossier', compact('user'));
    }
}
