<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boete extends Model
{
    use HasFactory;

    protected $fillable = [
        'artikel_nummer',
        'titel',
        'beschrijving',
        'categorie',
        'bedrag',
        'veroordeling'
    ];
}
