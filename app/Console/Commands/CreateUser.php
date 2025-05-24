<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    protected $signature = 'user:create 
                            {name : De naam van de gebruiker}
                            {email : Het e-mailadres van de gebruiker}
                            {password : Het wachtwoord van de gebruiker}
                            {--discord_id= : Optioneel Discord ID}
                            {--inactive : Maak de gebruiker inactief}';

    protected $description = 'Maak een nieuwe gebruiker aan in de database';

    public function handle()
    {
        $email = $this->argument('email');

        if (User::where('email', $email)->exists()) {
            $this->error("Er bestaat al een gebruiker met het e-mailadres: {$email}");

            return 1;
        }

        $user = User::create([
            'name' => $this->argument('name'),
            'email' => $email,
            'discord_id' => $this->option('discord_id'),
            'password' => Hash::make($this->argument('password')),
            'active' => $this->option('inactive') ? 0 : 1,
        ]);

        $this->info("Gebruiker succesvol aangemaakt met ID: {$user->id}");

        return 0;
    }
}
