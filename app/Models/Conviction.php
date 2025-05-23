<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conviction extends Model
{
    protected $fillable = [
        'identifier',
        'handcuff',
        'search',
        'pvb',
    ];

    public function citizen()
    {
        return $this->belongsTo(Citizen::class, 'identifier', 'identifier');
    }

    public function convictionPunishments()
    {
        return $this->hasMany(ConvictionPunishment::class);
    }
}
