<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $table = 'citizen_notes';

    protected $fillable = [
        'note',
        'user_id',
        'citizen_id',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
