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
        Schema::table('citizens', function (Blueprint $table) {
            $table->boolean('wanted')->default(false)->after('sex');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('citizens', function (Blueprint $table) {
            $table->dropColumn('wanted');
        });
    }
};
