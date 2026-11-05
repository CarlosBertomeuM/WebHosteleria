<?php

namespace App\Http\Controllers;

use App\Models\MenuDia;
use Illuminate\Http\Request;

class MenuDiaController extends Controller
{
    // Devuelve todos los menús con sus categorías y los platos de cada categoría
    public function index()
    {
        $menus = MenuDia::with('categorias.platos')->get();
        return response()->json($menus);
    }

    // Devuelve un menú específico con sus categorías y platos
    public function show(string $id)
    {
        $menu = MenuDia::with('categorias.platos')->findOrFail($id);
        return response()->json($menu);
    }

    // Crea el menú completo — primero el menú, luego las categorías, luego los platos
    public function store(Request $request)
    {
        $menu = MenuDia::create($request->except('categorias'));

        if ($request->has('categorias')) {
            foreach ($request->categorias as $categoriaData) {
                $categoria = $menu->categorias()->create([
                    'nombre' => $categoriaData['nombre'],
                    'orden'  => $categoriaData['orden'] ?? 0
                ]);

                if (!empty($categoriaData['platos'])) {
                    foreach ($categoriaData['platos'] as $platoData) {
                        $categoria->platos()->create([
                            'nombre' => $platoData['nombre'],
                            'orden'  => $platoData['orden'] ?? 0
                        ]);
                    }
                }
            }
        }

        return response()->json(MenuDia::with('categorias.platos')->find($menu->id), 201);
    }

    // Edita el menú — borra las categorías y platos anteriores y los recrea
    public function update(Request $request, string $id)
    {
        $menu = MenuDia::findOrFail($id);
        $menu->update($request->except('categorias'));

        if ($request->has('categorias')) {
            $menu->categorias()->delete();

            foreach ($request->categorias as $categoriaData) {
                $categoria = $menu->categorias()->create([
                    'nombre' => $categoriaData['nombre'],
                    'orden'  => $categoriaData['orden'] ?? 0
                ]);

                if (!empty($categoriaData['platos'])) {
                    foreach ($categoriaData['platos'] as $platoData) {
                        $categoria->platos()->create([
                            'nombre' => $platoData['nombre'],
                            'orden'  => $platoData['orden'] ?? 0
                        ]);
                    }
                }
            }
        }

        return response()->json(MenuDia::with('categorias.platos')->find($id));
    }

    // Borra un menú — gracias al cascade también borra sus categorías y platos
    public function destroy(string $id)
    {
        MenuDia::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    // Borra todos los menús
    public function destroyAll()
    {
        MenuDia::query()->delete();
        return response()->json(null, 204);
    }

    // Devuelve solo el menú activo con sus categorías y platos
    public function activo()
    {
        $menu = MenuDia::with('categorias.platos')
            ->where('activo', 1)
            ->first();
        
        return response()->json($menu);
    }
}