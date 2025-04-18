<?php

namespace App\Providers;

use App\Mail\PasswordResetMail;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            $email = $notifiable->getEmailForPasswordReset();

            Mail::to($email)->send(new PasswordResetMail($token, $email));

            return null;
        });
    }
}
