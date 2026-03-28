<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// ── Redirection racine vers le BAC SPA ──
Route::get('/', function () {
    return redirect('/bac');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// ── BAC Sénégal IA — SPA React autonome ──
// Toutes les routes /bac/* sont gérées par react-router-dom côté client
Route::get('/bac/{path?}', function () {
    return view('bac');
})->where('path', '.*')->name('bac');

require __DIR__.'/settings.php';
