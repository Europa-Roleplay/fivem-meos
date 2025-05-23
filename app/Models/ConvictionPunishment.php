<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConvictionPunishment extends Model
{
    protected $fillable = [
        'conviction_id',
        'penalty_name',
        'penalty_type',
        'amount',
    ];

    public function conviction()
    {
        return $this->belongsTo(Conviction::class);
    }
}
