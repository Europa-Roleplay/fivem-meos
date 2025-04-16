<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CitizenController;
use App\Http\Controllers\Controller;
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

Route::controller(AdminController::class)->name('admin')->prefix('admin')->group(function () {
    Route::get(null, 'index')->name('.index');
    Route::prefix('gebruikers')->name('.users')->group(function () {
        Route::get(null, 'users');
        Route::post(null, 'store')->name('.store');
        Route::post('/{user}', 'update')->name('.update');
        Route::delete('/{user}', 'destroy')->name('.destroy');
        Route::post('/status/{user}', 'status')->name('.status');
        Route::get('/dossier/{user}', 'dossier')->name('.dossier');
    });

    Route::controller(TrainingController::class)->name('.trainingen')->prefix('trainingen')->group(function () {
        Route::get(null, 'index');
        Route::post(null, 'store')->name('.store');
        Route::post('/{training}', 'update')->name('.update');
        Route::delete('/{training}', 'destroy')->name('.destroy');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::controller(CitizenController::class)->name('citizen')->prefix('burgers')->group(function () {
        Route::get(null, 'index');
        Route::get('/{citizen}', 'show')->name('.show');
        Route::post('/{citizen}', 'update')->name('.update');
        Route::delete('/{citizen}', 'destroy')->name('.destroy');
    });
});

require __DIR__ . '/auth.php';
