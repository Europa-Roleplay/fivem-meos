<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Citizen extends Model
{
    protected $fillable = [
        'identifier',
        'firstname',
        'lastname',
        'dateofbirth',
        'height',
        'sex',
        'job',
        'job_grade',
        'phone_number',
        'iban',
        'jailTime',
        'communityService',
        'secondjob',
        'secondjob_grade',
        'wanted',
        'wanted_text',
    ];

    public function notes()
    {
        return $this->hasMany(Note::class, 'citizen_id');
    }

    public function convictions()
    {
        return $this->hasMany(Conviction::class, 'identifier', 'identifier');
    }
}
