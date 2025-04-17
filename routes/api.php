<?php

use App\Http\Controllers\CitizenController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {
    Route::post('/takeLicence/{identifier}/{type}', [CitizenController::class, 'removeLicense'])->name('takeLicence');
});
