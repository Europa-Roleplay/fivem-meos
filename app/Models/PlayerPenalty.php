<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayerPenalty extends Model
{
    protected $table = 'player_penalties';

    protected $fillable = [
        'citizen_id',
        'penaltie_id',
        'officier_id',
    ];
}
