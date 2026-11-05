<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuDiaCategoria extends Model
{
    protected $fillable = ['menu_dia_id', 'nombre', 'orden'];

    // Relación hacia arriba — esta categoría pertenece a un menú
    public function menuDia()
    {
        return $this->belongsTo(MenuDia::class);
    }

    // Relación hacia abajo — esta categoría tiene muchos platos
    public function platos()
    {
        return $this->hasMany(MenuDiaPlato::class);
    }
}