<?php

use App\Http\Controllers\Admin\BoeteController;
use App\Http\Controllers\Admin\LogboekController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\CitizenController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\OfficerNotesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrainingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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

        Route::controller(TrainingController::class)->name('.trainingen')->prefix('trainingen')->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store')->name('.store');
            Route::post('/{training}', 'update')->name('.update');
            Route::delete('/{training}', 'destroy')->name('.destroy');
        });

        Route::controller(LogboekController::class)->name('.logboek')->prefix('logboek')->group(function () {
            Route::get('/', 'index');
            Route::get('/export', 'export')->name('.export');
        });

        Route::controller(BoeteController::class)->name('.boetes')->prefix('boetes')->group(function () {
            Route::get('/', 'index');
            Route::get('/create', 'create')->name('.create');
            Route::post('/', 'store')->name('.store');
            Route::get('/{boete}/edit', 'edit')->name('.edit');
            Route::put('/{boete}', 'update')->name('.update');
            Route::delete('/{boete}', 'destroy')->name('.destroy');
            Route::get('/export', 'export')->name('.export');
        });

        Route::controller(TrainingController::class)->name('.trainingen')->prefix('trainingen')->group(function () {
            Route::get(null, 'index');
            Route::post(null, 'store')->name('.store');
            Route::post('/{training}', 'update')->name('.update');
            Route::delete('/{training}', 'destroy')->name('.destroy');
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
        });
    });
});

Route::get('/log-out', function () {
    if (Auth::check()) {
        Auth::logout();
    }
    return redirect('/login')->with('status', 'Je bent succesvol uitgelogd.');
})->name('logout');

require __DIR__.'/auth.php';
