<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    protected $fillable = [
        'categoria_id',
        'nombre',
        'descripcion',
        'precio',
        'imagen',
        'disponible',
        'activo',
        'orden'
    ];

    public function alergenos()
    {
        return $this->belongsToMany(Alergeno::class, 'alergeno_plato');
    }
}