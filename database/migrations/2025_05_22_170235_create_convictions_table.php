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
        Schema::create('convictions', function (Blueprint $table) {
            $table->id();
            $table->string('identifier')->nullable();
            $table->boolean('handcuff')->default(false);
            $table->boolean('search')->default(false);
            $table->longText('pvb')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convictions');
    }
};
