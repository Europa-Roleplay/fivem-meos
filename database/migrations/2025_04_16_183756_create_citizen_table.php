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
        Schema::create('citizens', function (Blueprint $table) {
            $table->id();
            $table->string('identifier')->unique();
            $table->string('firstname');
            $table->string('lastname');
            $table->date('dateofbirth')->nullable();
            $table->integer('height')->nullable();
            $table->string('sex')->nullable();
            $table->string('job')->nullable();
            $table->integer('job_grade')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('iban')->nullable();
            $table->integer('jailTime')->default(0);
            $table->integer('communityService')->default(0);
            $table->string('secondjob')->nullable();
            $table->integer('secondjob_grade')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citizen');
    }
};
