<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CitizenController extends Controller
{
    public function getCitizens()
    {
        $players = Http::get("http://178.208.177.135:30120/eu-meos/getplayers")->json();
        dd($players);
    }
}
