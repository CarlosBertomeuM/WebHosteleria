<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuDiaPlato extends Model
{
    protected $fillable = ['menu_dia_categoria_id', 'nombre', 'orden'];

    // Este plato pertenece a una categoría del menú
    public function categoria()
    {
        return $this->belongsTo(MenuDiaCategoria::class);
    }
}
