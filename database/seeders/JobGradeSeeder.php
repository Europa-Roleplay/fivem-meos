<?php

namespace Database\Seeders;

use App\Models\JobGrade;
use Illuminate\Database\Seeder;

class JobGradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobGrades = [
            // politie rangen
            ['name' => 'Eerst Hoofd Commissaris', 'job' => 'politie'],
            ['name' => 'Hoofd Commissaris', 'job' => 'politie'],
            ['name' => 'Hoofd-Inspecteur', 'job' => 'politie'],
            ['name' => 'Inspecteur', 'job' => 'politie'],
            ['name' => 'Brigadier', 'job' => 'politie'],
            ['name' => 'Hoofd-Agent', 'job' => 'politie'],
            ['name' => 'Agent', 'job' => 'politie'],
            ['name' => 'Surveillant', 'job' => 'politie'],
            ['name' => 'Aspirant', 'job' => 'politie'],

            // kmar rangen
            ['name' => 'Luitenant Kolonel', 'job' => 'kmar'],
            ['name' => 'Majoor', 'job' => 'kmar'],
            ['name' => 'Kapitein', 'job' => 'kmar'],
            ['name' => 'Eerst Luitenant', 'job' => 'kmar'],
            ['name' => 'Tweede Luitenant', 'job' => 'kmar'],
            ['name' => 'Kornet', 'job' => 'kmar'],
            ['name' => 'Adjudant Onderofficier', 'job' => 'kmar'],
            ['name' => 'Opperwachtmeester', 'job' => 'kmar'],
            ['name' => 'Wachtmeester der 1e klasse', 'job' => 'kmar'],
            ['name' => 'Wachtmeester', 'job' => 'kmar'],
            ['name' => 'Marechaussee der 1e klasse', 'job' => 'kmar'],
            ['name' => 'Marechaussee der 2e klasse', 'job' => 'kmar'],
            ['name' => 'Marechaussee der 3e klasse', 'job' => 'kmar'],
            ['name' => 'Marechaussee der 4e klasse', 'job' => 'kmar'],
        ];

        foreach ($jobGrades as $grade) {
            JobGrade::create($grade);
        }
    }
}
