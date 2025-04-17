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
        Schema::create('boetes', function (Blueprint $table) {
            $table->id();
            $table->string('artikel_nummer');
            $table->string('titel');
            $table->text('beschrijving')->nullable();
            $table->string('categorie');
            $table->decimal('bedrag', 10, 2);
            $table->string('veroordeling')->default('Eerste Veroordeling');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boetes');
    }
};
