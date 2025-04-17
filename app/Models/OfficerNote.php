<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficerNote extends Model
{
    protected $table = 'officer_notes';

    protected $fillable = [
        'note',
        'officer_id',
        'author_id',
    ];

    public function officer()
    {
        return $this->belongsTo(User::class, 'officer_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
