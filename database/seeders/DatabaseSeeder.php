<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            JobGradeSeeder::class,
            BoeteSeeder::class,
        ]);
        User::create([
            'name' => 'Milan Nuis',
            'email' => 'milannuis@gmail.com',
            'password' => Hash::make('Admin123!'),
            'job_grade_id' => 1,
        ]);
    }
}
