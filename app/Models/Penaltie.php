<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penaltie extends Model
{
    protected $table = 'penalties';

    protected $fillable = [
        'penalty_name',
        'penalty_type',
        'amount',
    ];
}
