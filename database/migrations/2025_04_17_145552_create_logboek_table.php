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
        Schema::create('logboek', function (Blueprint $table) {
            $table->id();
            $table->string('gebruiker');
            $table->string('actie_type');
            $table->text('beschrijving');
            $table->json('data')->nullable();
            $table->timestamps();

            $table->index('created_at');
            $table->index('gebruiker');
            $table->index('actie_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logboek');
    }
};
