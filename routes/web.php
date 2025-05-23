<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\CitizenController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\OfficerNotesController;
use App\Http\Controllers\PentalieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrainingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Wachtwoord reset routes
Route::get('/wachtwoord-vergeten', function () {
    return Inertia::render('Auth/ForgotPassword');
})->middleware('guest')->name('password.request');

Route::post('/wachtwoord-vergeten', [PasswordResetController::class, 'sendResetLinkEmail'])
    ->middleware('guest')
    ->name('password.email');

Route::get('/wachtwoord-resetten/{token}', function (string $token) {
    return Inertia::render('Auth/ResetPassword', [
        'token' => $token,
        'email' => request('email'),
    ]);
})->middleware('guest')->name('password.reset');

Route::match(['post', 'put'], '/wachtwoord-resetten', [PasswordResetController::class, 'reset'])
    ->middleware('guest')
    ->name('password.update');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::controller(AdminController::class)->name('admin')->prefix('admin')->group(function () {
        Route::get('/', 'index')->name('.index');
        Route::prefix('gebruikers')->name('.users')->group(function () {
            Route::get('/', 'users');
            Route::post('/', 'store')->name('.store');
            Route::post('/{user}', 'update')->name('.update');
            Route::delete('/{user}', 'destroy')->name('.destroy');
            Route::post('/status/{user}', 'status')->name('.status');
            Route::get('/dossier/{user}', 'dossier')->name('.dossier');
        });

        Route::controller(TrainingController::class)->name('.trainingen')->prefix('specialisaties')->group(function () {
            Route::get(null, 'index');
            Route::post(null, 'store')->name('.store');
            Route::post('/{training}', 'update')->name('.update');
            Route::delete('/{training}', 'destroy')->name('.destroy');
        });

        Route::controller(OfficerNotesController::class)->name('.officernotes')->prefix('officernotes')->group(function () {
            Route::post(null, 'store')->name('.store');
            Route::delete('/{officerNote}', 'destroy')->name('.destroy');
        });

        Route::controller(PentalieController::class)->name('.penalties')->prefix('straffen')->group(function () {
            Route::get(null, 'index');
            Route::post(null, 'store')->name('.store');
            Route::post('/{pentalie}', 'update')->name('.update');
            Route::delete('/{pentalie}', 'destroy')->name('.destroy');
        });
    });

    Route::controller(OfficerNotesController::class)->name('.officernotes')->prefix('officernotes')->group(function () {
        Route::post(null, 'store')->name('.store');
        Route::delete('/{officerNote}', 'destroy')->name('.destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::controller(ProfileController::class)->prefix('profiel')->name('profile.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::put('/update', 'updateProfile')->name('update');
        Route::post('/photo', 'updateProfilePhoto')->name('photo.update');
        Route::delete('/photo', 'deleteProfilePhoto')->name('photo.delete');
        Route::put('/password', 'updatePassword')->name('password.update');
        Route::post('/password-reset', 'sendPasswordResetLink')->name('password.email');
        Route::put('/notifications', 'updateNotifications')->name('notifications.update');
        Route::delete('/account', 'destroy')->name('destroy');
        Route::delete('/sessies/{id}', [ProfileController::class, 'beeindigSessie'])->name('profile.session.destroy');
        Route::delete('/sessies', [ProfileController::class, 'beeindigAlleSessies'])->name('profile.sessions.destroy');
    });

    Route::controller(NoteController::class)->name('note')->prefix('notities')->group(function () {
        Route::post(null, 'store')->name('.store');
        Route::post('/{note}', 'update')->name('.update');
        Route::delete('/{note}', 'destroy')->name('.destroy');
    });

    Route::prefix('dashboard')->name('dashboard')->group(function () {
        Route::controller(DashboardController::class)->group(function () {
            Route::get('/', 'index')->name('.index');
        });
        Route::controller(CitizenController::class)->name('.citizen')->prefix('burgers')->group(function () {
            Route::get(null, 'index');
            Route::post('/', 'search')->name('.search');
            Route::get('/{id}', 'show')->name('.show');
            Route::post('/punish/{id}', 'punish')->name('.punish');
        });
    });
});

require __DIR__ . '/auth.php';
