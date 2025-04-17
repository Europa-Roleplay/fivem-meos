<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::check() || ! Auth::user()->isAdmin()) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Geen toegang tot deze pagina.'], 403);
            }

            return redirect('/')->with('error', 'Je hebt geen toegang tot het admin gedeelte.');
        }

        return $next($request);
    }
}
