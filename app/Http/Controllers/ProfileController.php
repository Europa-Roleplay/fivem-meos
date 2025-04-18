<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Logboek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;

class ProfileController extends Controller
{
    /**
     * Toon de profielpagina van de gebruiker.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Haal de laatste 5 inlogactiviteiten op
        $recenteActiviteiten = Logboek::where('gebruiker', $user->name)
            ->where('actie_type', 'login')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        return Inertia::render('Profile/Index', [
            'user' => $user,
            'recenteActiviteiten' => $recenteActiviteiten,
            'hasProfilePhoto' => $user->profile_photo_path !== null,
        ]);
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
        
        // Controleer of de e-mail is gewijzigd
        $emailChanged = $user->email !== $validated['email'];
        
        $user->name = $validated['name'];
        
        if ($emailChanged) {
            $user->email = $validated['email'];
        }
        
        $user->save();
        
        // Log de actie
        Logboek::create([
            'gebruiker' => $user->name,
            'actie_type' => 'update',
            'beschrijving' => 'Heeft profielgegevens bijgewerkt',
            'data' => json_encode([
                'name_changed' => $user->name !== $validated['name'],
                'email_changed' => $emailChanged,
            ]),
        ]);
        
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
        
        // Verwijder de oude foto als die bestaat
        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }
        
        // Sla de nieuwe foto op
        $path = $request->file('photo')->store('profile-photos', 'public');
        $user->profile_photo_path = $path;
        $user->save();
        
        // Log de actie
        Logboek::create([
            'gebruiker' => $user->name,
            'actie_type' => 'update',
            'beschrijving' => 'Heeft profielfoto bijgewerkt',
        ]);
        
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
            
            // Log de actie
            Logboek::create([
                'gebruiker' => $user->name,
                'actie_type' => 'delete',
                'beschrijving' => 'Heeft profielfoto verwijderd',
            ]);
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
        
        // Log de actie
        Logboek::create([
            'gebruiker' => $user->name,
            'actie_type' => 'update',
            'beschrijving' => 'Heeft wachtwoord gewijzigd',
        ]);
        
        return redirect()->back()->with('success', 'Wachtwoord bijgewerkt.');
    }

    /**
     * Stuur een wachtwoord reset link naar de gebruiker.
     */
    public function sendPasswordResetLink()
    {
        $user = Auth::user();
        
        // Stuur een wachtwoord reset link
        Password::sendResetLink(['email' => $user->email]);
        
        // Log de actie
        Logboek::create([
            'gebruiker' => $user->name,
            'actie_type' => 'update',
            'beschrijving' => 'Heeft een wachtwoord reset link aangevraagd',
        ]);
        
        return redirect()->back()->with('success', 'Wachtwoord reset link is verzonden naar je e-mail.');
    }

    /**
     * Update de notificatie-instellingen van de gebruiker.
     */
    public function updateNotifications(Request $request)
    {
        $validated = $request->validate([
            'email_notifications' => ['boolean'],
            'browser_notifications' => ['boolean'],
        ]);
        
        $user = Auth::user();
        $user->settings = array_merge($user->settings ?? [], $validated);
        $user->save();
        
        // Log de actie
        Logboek::create([
            'gebruiker' => $user->name,
            'actie_type' => 'update',
            'beschrijving' => 'Heeft notificatie-instellingen bijgewerkt',
        ]);
        
        return redirect()->back()->with('success', 'Notificatie-instellingen bijgewerkt.');
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
