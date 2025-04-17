<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logboek extends Model
{
    use HasFactory;

    protected $table = 'logboek';

    protected $fillable = [
        'gebruiker',
        'actie_type',
        'beschrijving',
        'data',
    ];
}
