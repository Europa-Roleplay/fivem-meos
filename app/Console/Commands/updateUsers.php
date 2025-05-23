<?php

namespace App\Console\Commands;

use App\Http\Controllers\CitizenController;
use Illuminate\Console\Command;

class updateUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updateUsers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $controller = new CitizenController();
        $controller->getCitizens();
        $this->info('Users updated successfully.');
    }
}
