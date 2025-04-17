<?php

use App\Http\Controllers\Admin\LogboekController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CitizenController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NoteController;
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
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

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
            // Route::get('/{citizen}', 'show')->name('.show');
            // Route::post('/{citizen}', 'update')->name('.update');
            // Route::delete('/{citizen}', 'destroy')->name('.destroy');
        });
    });
});

require __DIR__.'/auth.php';
