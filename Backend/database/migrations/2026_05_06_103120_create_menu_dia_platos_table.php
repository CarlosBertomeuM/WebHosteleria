<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_dia_platos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_dia_categoria_id')->constrained('menu_dia_categorias')->onDelete('cascade');
            $table->string('nombre', 100);
            $table->integer('orden')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_dia_platos');
    }
};
