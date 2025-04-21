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
        Schema::create('login_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('session_id')->nullable();
            $table->string('ip_adres');
            $table->string('user_agent')->nullable();
            $table->string('apparaat_type')->nullable();
            $table->string('browser')->nullable();
            $table->string('locatie')->nullable();
            $table->timestamp('laatste_activiteit')->nullable();
            $table->boolean('is_actief')->default(true);
            $table->timestamps();
            $table->index('session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('login_sessions');
    }
};
