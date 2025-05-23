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
        'discord_id',
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
            'settings' => 'array',
        ];
    }

    public function jobGrade()
    {
        return $this->belongsTo(JobGrade::class);
    }

    public function officerNotes()
    {
        return $this->hasMany(OfficerNote::class, 'officer_id');
    }

    /**
     * De login sessies van deze gebruiker.
     */
    public function loginSessions()
    {
        return $this->hasMany(LoginSession::class);
    }

    /**
     * Bepaalt of de gebruiker admin-rechten heeft.
     */
    public function isAdmin(): bool
    {
        if (($this->jobGrade->job === 'politie' && $this->jobGrade->name === 'Eerst Hoofd Commissaris') ||
            ($this->jobGrade->job === 'kmar' && $this->jobGrade->name === 'Luitenant Kolonel')
        ) {
            return true;
        }

        return false;
    }
}
