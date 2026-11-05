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
        Schema::create('alergeno_plato', function (Blueprint $table) {
            $table->foreignId('plato_id')->constrained('platos')->onDelete('cascade');
            $table->foreignId('alergeno_id')->constrained('alergenos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('create_alergeno_plato_tables');
    }
};
