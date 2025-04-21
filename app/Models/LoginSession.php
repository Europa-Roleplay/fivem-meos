<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
        'ip_adres',
        'user_agent',
        'apparaat_type',
        'browser',
        'locatie',
        'laatste_activiteit',
        'is_actief',
    ];

    protected $casts = [
        'laatste_activiteit' => 'datetime',
        'is_actief' => 'boolean',
    ];

    /**
     * De gebruiker die bij deze sessie hoort.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Bepaal het apparaattype op basis van de user agent.
     */
    public static function bepaalApparaatType($userAgent)
    {
        if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i', $userAgent)) {
            return 'Mobiel';
        } elseif (preg_match('/android|ipad|playbook|silk/i', $userAgent)) {
            return 'Tablet';
        }

        return 'Desktop';
    }

    /**
     * Bepaal de browser op basis van de user agent.
     */
    public static function bepaalBrowser($userAgent)
    {
        if (strpos($userAgent, 'Firefox') !== false) {
            return 'Firefox';
        } elseif (strpos($userAgent, 'Chrome') !== false) {
            return 'Chrome';
        } elseif (strpos($userAgent, 'Safari') !== false) {
            return 'Safari';
        } elseif (strpos($userAgent, 'Edge') !== false) {
            return 'Edge';
        } elseif (strpos($userAgent, 'MSIE') !== false || strpos($userAgent, 'Trident/') !== false) {
            return 'Internet Explorer';
        }

        return 'Onbekend';
    }
}
