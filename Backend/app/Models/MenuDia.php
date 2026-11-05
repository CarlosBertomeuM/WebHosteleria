<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuDia extends Model
{
    protected $fillable = ['titulo', 'precio', 'activo'];

    public function categorias()
    {
        return $this->hasMany(MenuDiaCategoria::class);
    }
}