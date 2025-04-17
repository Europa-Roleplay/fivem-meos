<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'job_grade_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function jobGrade()
    {
        return $this->belongsTo(JobGrade::class);
    }

    /**
     * Bepaalt of de gebruiker admin-rechten heeft.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return true;
        
        // Later kun je dit aanpassen om te controleren op basis van rollen of permissies
        // return $this->hasRole('admin');
        // of
        // return $this->hasPermission('admin.access');
    }
}
