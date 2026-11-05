<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
// Solo devuelve categorías activas con sus platos activos ordenados
    public function index()
    {
        $categorias = Categoria::with(['platos' => function($query) {
            $query->where('activo', 1)->orderBy('orden');
        }])
        ->where('activo', 1)
        ->orderBy('orden')
        ->get();
        
        return response()->json($categorias);
    }

  // Crear una categoría
public function store(Request $request)
{
    $categoria = Categoria::create($request->all());
    return response()->json($categoria, 201);
}

// Ver una categoría
public function show(string $id)
{
    $categoria = Categoria::findOrFail($id);
    return response()->json($categoria);
}

// Editar una categoría
public function update(Request $request, string $id)
{
    $categoria = Categoria::findOrFail($id);
    $categoria->update($request->all());
    return response()->json($categoria);
}

// Borrar una categoría
public function destroy(string $id)
{
    Categoria::findOrFail($id)->delete();
    return response()->json(null, 204);
}
}
