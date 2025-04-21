<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\PasswordResetMail;
use App\Models\Logboek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    /**
     * Stuur een wachtwoord reset link naar de gebruiker.
     */
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        try {
            $user = \App\Models\User::where('email', $request->email)->first();

            if (!$user) {
                return back()->withErrors(['email' => 'We kunnen geen gebruiker vinden met dat e-mailadres.']);
            }

            $token = Str::random(60);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $request->email],
                [
                    'email' => $request->email,
                    'token' => Hash::make($token),
                    'created_at' => now(),
                ]
            );

            Mail::to($request->email)->send(new PasswordResetMail($token, $request->email));

            Logboek::create([
                'gebruiker' => $request->email,
                'actie_type' => 'update',
                'beschrijving' => 'Heeft een wachtwoord reset link aangevraagd',
            ]);

            return back()->with('status', 'We hebben je een e-mail gestuurd met een link om je wachtwoord te resetten!');
        } catch (\Exception $e) {
            Log::error('Wachtwoord reset fout: ' . $e->getMessage());

            return back()->withErrors(['email' => 'Er is een fout opgetreden bij het verzenden van de reset link.']);
        }
    }

    /**
     * Reset het wachtwoord van de gebruiker.
     */
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $tokenData = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$tokenData || !Hash::check($request->token, $tokenData->token)) {
            return back()->withErrors(['email' => 'Ongeldige token.']);
        }

        // Controleer of het token niet verlopen is (60 minuten)
        if ($tokenData->created_at && now()->diffInMinutes(\Carbon\Carbon::parse($tokenData->created_at)) > 60) {
            return back()->withErrors(['email' => 'Token is verlopen. Vraag een nieuwe reset link aan.']);
        }

        $user = \App\Models\User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'We kunnen geen gebruiker vinden met dat e-mailadres.']);
        }

        $user->password = Hash::make($request->password);
        $user->setRememberToken(Str::random(60));
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        Logboek::create([
            'gebruiker' => $user->name,
            'actie_type' => 'update',
            'beschrijving' => 'Heeft wachtwoord gereset',
        ]);

        return redirect('/login')->with('status', 'Je wachtwoord is succesvol gereset!');
    }
}
