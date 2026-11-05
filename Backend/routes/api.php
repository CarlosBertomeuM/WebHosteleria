<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PlatoController;
use App\Http\Controllers\AlergenoController;
use App\Http\Controllers\MenuDiaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Rutas especiales de la carta
Route::apiResource('categorias', CategoriaController::class);
Route::apiResource('platos', PlatoController::class);
Route::get('alergenos', [AlergenoController::class, 'index']);

// Rutas especiales del menú
Route::get('menu-dia/activo', [MenuDiaController::class, 'activo']);
Route::delete('menu-dia/delete-all', [MenuDiaController::class, 'destroyAll']);
Route::apiResource('menu-dia', MenuDiaController::class);