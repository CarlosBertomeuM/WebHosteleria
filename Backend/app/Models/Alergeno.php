<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alergeno extends Model
{
    protected $table = 'alergenos';
    protected $fillable = ['nombre', 'icono'];

    public function platos()
    {
        return $this->belongsToMany(Plato::class, 'alergeno_plato');
    }
}