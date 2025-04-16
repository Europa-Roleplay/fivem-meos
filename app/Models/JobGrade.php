<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobGrade extends Model
{
    protected $fillable = [
        'name',
        'job',
    ];

    public function employees()
    {
        return $this->hasMany(User::class);
    }
}
