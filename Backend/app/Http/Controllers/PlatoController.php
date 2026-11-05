<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plato;

class PlatoController extends Controller
{
    // Listar todos los platos con sus alérgenos
    public function index()
    {
        $platos = Plato::with('alergenos')->get();
        return response()->json($platos);
    }

    // Ver un plato con sus alérgenos
    public function show(string $id)
    {
        $plato = Plato::with('alergenos')->findOrFail($id);
        return response()->json($plato);
    }

    // Crear un plato
    public function store(Request $request)
    {
        $plato = Plato::create($request->all());
        return response()->json($plato, 201);
    }

    // Editar un plato
    public function update(Request $request, string $id)
    {
        $plato = Plato::findOrFail($id);
        $plato->update($request->except('alergenos'));
        
        if ($request->has('alergenos')) {
            $plato->alergenos()->sync($request->alergenos);
        }
        
        return response()->json(Plato::with('alergenos')->find($id));
    }

    // Borrar un plato
    public function destroy(string $id)
    {
        Plato::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}