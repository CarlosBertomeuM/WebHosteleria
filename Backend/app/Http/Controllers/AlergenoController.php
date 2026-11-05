<?php

namespace App\Http\Controllers;

use App\Models\Alergeno;
use Illuminate\Http\Request;

class AlergenoController extends Controller
{
    //Listar alergenos
    public function index()
    {
        $alergenos = Alergeno::all();
        return response()->json($alergenos);
    }
}

