<?php

namespace App\Http\Controllers;

use App\Models\LoginSession;
use App\Models\User;
use App\Models\Logboek;
use App\Mail\PasswordResetMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    /**
     * Toon de profielpagina van de gebruiker.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $huidigeSessionId = session()->getId();

        $recenteActiviteiten = LoginSession::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($sessie) {
                return [
                    'id' => $sessie->id,
                    'gebruiker' => $sessie->user->name ?? 'Onbekend',
                    'actie_type' => $sessie->is_actief ? 'login' : 'logout',
                    'beschrijving' => $sessie->is_actief 
                        ? "Ingelogd vanaf {$sessie->apparaat_type} met {$sessie->browser}" 
                        : "Uitgelogd vanaf {$sessie->apparaat_type} met {$sessie->browser}",
                    'data' => json_encode([
                        'ip_adres' => $sessie->ip_adres,
                        'apparaat_type' => $sessie->apparaat_type,
                        'browser' => $sessie->browser,
                        'laatste_activiteit' => $sessie->laatste_activiteit,
                    ]),
                    'created_at' => $sessie->created_at,
                    'updated_at' => $sessie->updated_at,
                ];
            });

        $actieveSessies = LoginSession::where('user_id', $user->id)
            ->where('is_actief', true)
            ->orderBy('laatste_activiteit', 'desc')
            ->get();

        foreach ($actieveSessies as $sessie) {
            $sessie->is_huidige_sessie = ($sessie->session_id === $huidigeSessionId);
        }
        
        return Inertia::render('Profile/Index', [
            'user' => $user,
            'recenteActiviteiten' => $recenteActiviteiten,
            'actieveSessies' => $actieveSessies,
            'hasProfilePhoto' => $user->profile_photo_path !== null,
        ]);
    }

    /**
     * Beëindig een specifieke sessie.
     */
    public function beeindigSessie(Request $request, $id)
    {
        $user = Auth::user();
        $huidigeSessionId = session()->getId();
        
        $sessie = LoginSession::where('id', $id)
            ->where('user_id', $user->id)
            ->first();
            
        if (!$sessie) {
            return redirect()->back()->with('error', 'Sessie niet gevonden.');
        }
        
        // Controleer of dit de huidige sessie is
        if ($sessie->session_id === $huidigeSessionId) {
            // Log de gebruiker uit
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            return redirect('/login')->with('success', 'Je bent uitgelogd.');
        }

        if ($sessie->session_id) {
            DB::table('sessions')->where('id', $sessie->session_id)->delete();
        }

        $sessie->update([
            'is_actief' => false
        ]);
        
        return redirect()->back()->with('success', 'Sessie succesvol beëindigd.');
    }

    /**
     * Beëindig alle andere sessies.
     */
    public function beeindigAlleSessies(Request $request)
    {
        $user = Auth::user();
        $huidigeSessionId = session()->getId();

        $andereSessies = LoginSession::where('user_id', $user->id)
            ->where('is_actief', true)
            ->where('session_id', '!=', $huidigeSessionId)
            ->get();

        foreach ($andereSessies as $sessie) {
            if ($sessie->session_id) {
                DB::table('sessions')->where('id', $sessie->session_id)->delete();
            }
        }

        LoginSession::where('user_id', $user->id)
            ->where('is_actief', true)
            ->where('session_id', '!=', $huidigeSessionId)
            ->update(['is_actief' => false]);
        
        return redirect()->back()->with('success', 'Alle andere sessies zijn beëindigd.');
    }

    /**
     * Update de profielinformatie van de gebruiker.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);

        $emailChanged = $user->email !== $validated['email'];
        
        $user->name = $validated['name'];
        
        if ($emailChanged) {
            $user->email = $validated['email'];
            // Hier zou je een e-mailverificatie kunnen sturen als dat nodig is
        }
        
        $user->save();
        
        return redirect()->back()->with('success', 'Profielgegevens bijgewerkt.');
    }

    /**
     * Update de profielfoto van de gebruiker.
     */
    public function updateProfilePhoto(Request $request)
    {
        $request->validate([
            'photo' => ['required', 'image', 'max:2048'], // Max 2MB
        ]);

        $user = Auth::user();

        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        $path = $request->file('photo')->store('profile-photos', 'public');
        $user->profile_photo_path = $path;
        $user->save();

        return redirect()->back()->with('success', 'Profielfoto bijgewerkt.');
    }

    /**
     * Verwijder de profielfoto van de gebruiker.
     */
    public function deleteProfilePhoto()
    {
        $user = Auth::user();

        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
            $user->profile_photo_path = null;
            $user->save();
        }

        return redirect()->back()->with('success', 'Profielfoto verwijderd.');
    }

    /**
     * Update het wachtwoord van de gebruiker.
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = Auth::user();
        $user->password = Hash::make($validated['password']);
        $user->save();

        return redirect()->back()->with('success', 'Wachtwoord bijgewerkt.');
    }

    /**
     * Stuur een wachtwoord reset link naar de gebruiker.
     */
    public function sendPasswordResetLink(Request $request)
    {
        $user = Auth::user();

        try {

            $token = Str::random(60);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $user->email],
                [
                    'email' => $user->email,
                    'token' => Hash::make($token),
                    'created_at' => now()
                ]
            );

            Mail::to($user->email)->send(new PasswordResetMail($token, $user->email));

            Logboek::create([
                'gebruiker' => $user->name,
                'actie_type' => 'update',
                'beschrijving' => 'Heeft een wachtwoord reset link aangevraagd',
            ]);

            return redirect()->back()->with('success', 'Wachtwoord reset link is verzonden naar je e-mail.');
        } catch (\Exception $e) {
            Log::error('Wachtwoord reset fout: ' . $e->getMessage());

            return redirect()->back()->with('error', 'Er is een fout opgetreden bij het verzenden van de reset link: ' . $e->getMessage());
        }
    }

    /**
     * Verwijder het account van de gebruiker.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
            'confirm_deletion' => ['required', 'in:DELETE'],
        ]);

        $user = Auth::user();

        Logboek::create([
            'gebruiker' => $user->name,
            'actie_type' => 'delete',
            'beschrijving' => 'Heeft account verwijderd',
            'data' => json_encode([
                'user_id' => $user->id,
                'email' => $user->email,
            ]),
        ]);

        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Je account is succesvol verwijderd.');
    }
}
