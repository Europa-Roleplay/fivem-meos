<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $table = 'trainingen';
    protected $fillable = [
        'name',
        'description',
        'job',
    ];
}
