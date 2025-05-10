<?php

use App\Http\Controllers\CitizenController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {
    Route::get('/persons', [CitizenController::class, 'getPersons'])->name('citizens');
    Route::post('/takeLicence/{identifier}/{type}', [CitizenController::class, 'removeLicense'])->name('takeLicence');
});
