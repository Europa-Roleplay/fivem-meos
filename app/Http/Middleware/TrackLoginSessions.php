<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\LoginSession;
use Symfony\Component\HttpFoundation\Response;

class TrackLoginSessions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (Auth::check()) {
            $user = Auth::user();
            $userAgent = $request->header('User-Agent');
            $ipAdres = $request->ip();
            $sessionId = session()->getId();

            $session = LoginSession::where('user_id', $user->id)
                ->where('session_id', $sessionId)
                ->where('is_actief', true)
                ->first();

            if ($session) {
                $session->update([
                    'laatste_activiteit' => now(),
                    'ip_adres' => $ipAdres,
                ]);
            } else {
                $apparaatType = LoginSession::bepaalApparaatType($userAgent);
                $browser = LoginSession::bepaalBrowser($userAgent);

                $session = LoginSession::create([
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
        }

        return $response;
    }
}
