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
        Schema::create('conviction_punishments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conviction_id')->constrained()->onDelete('cascade');
            $table->string('penalty_name');
            $table->string('penalty_type');
            $table->integer('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conviction_punishments');
    }
};
