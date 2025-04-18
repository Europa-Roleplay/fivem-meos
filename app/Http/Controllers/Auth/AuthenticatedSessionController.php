<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\LoginSession;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();
        $userAgent = $request->header('User-Agent');
        $ipAdres = $request->ip();
        $sessionId = session()->getId();
        $apparaatType = LoginSession::bepaalApparaatType($userAgent);
        $browser = LoginSession::bepaalBrowser($userAgent);

        $existingSession = LoginSession::where('user_id', $user->id)
            ->where('session_id', $sessionId)
            ->where('is_actief', true)
            ->first();

        if (!$existingSession) {
            LoginSession::create([
                'user_id' => $user->id,
                'session_id' => $sessionId,
                'ip_adres' => $ipAdres,
                'user_agent' => $userAgent,
                'apparaat_type' => $apparaatType,
                'browser' => $browser,
                'laatste_activiteit' => now(),
                'is_actief' => true,
            ]);
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        if (Auth::check()) {
            $user = Auth::user();
            $sessionId = session()->getId();

            LoginSession::where('user_id', $user->id)
                ->where('session_id', $sessionId)
                ->update(['is_actief' => false]);
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
