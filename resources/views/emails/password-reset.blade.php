<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wachtwoord Reset</title>
    <style>
        /* Reset styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #f1f1f1;
            background-color: #121212;
        }
        * {
            box-sizing: border-box;
        }
        /* Main container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #1e1e1e;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }
        /* Header */
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        .logo {
            margin-bottom: 15px;
        }
        /* Content */
        .content {
            padding: 30px 25px;
            background-color: #1e1e1e;
        }
        .content p {
            margin: 0 0 20px;
            color: #e0e0e0;
            font-size: 16px;
        }
        .content strong {
            color: #ffffff;
        }
        /* Button */
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            text-decoration: none;
            padding: 14px 30px;
            border-radius: 5px;
            font-weight: 600;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        .button:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
        }
        /* Info box */
        .info-box {
            background-color: rgba(59, 130, 246, 0.1);
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 25px 0;
            border-radius: 0 5px 5px 0;
        }
        .info-box p {
            margin: 0;
            color: #e0e0e0;
            font-size: 14px;
        }
        /* Footer */
        .footer {
            background-color: #171717;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #333;
        }
        .footer p {
            margin: 0;
            color: #888;
            font-size: 13px;
        }
        .footer a {
            color: #3b82f6;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        /* URL display */
        .url-display {
            margin-top: 25px;
            padding: 15px;
            background-color: #252525;
            border-radius: 5px;
            word-break: break-all;
            font-family: monospace;
            font-size: 12px;
            color: #aaa;
        }
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                border-radius: 0;
            }
            .header {
                padding: 20px 15px;
            }
            .content {
                padding: 25px 15px;
            }
            .button {
                padding: 12px 25px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <div style="background-color: #3b82f6; color: white; font-weight: bold; padding: 8px; border-radius: 4px; display: inline-block; margin: 0 auto;">
                    <span style="font-size: 24px;">M</span>
                </div>
            </div>
            <h1>Wachtwoord Reset</h1>
        </div>
        
        <div class="content">
            <p>Beste <strong>{{ $user->name ?? 'Gebruiker' }}</strong>,</p>
            
            <p>We hebben een verzoek ontvangen om je wachtwoord te resetten. Klik op de onderstaande knop om een nieuw wachtwoord in te stellen:</p>
            
            <div class="button-container">
                <a href="{{ $resetUrl }}" class="button">Wachtwoord Resetten</a>
            </div>
            
            <div class="info-box">
                <p><strong>Let op:</strong> Deze link is slechts 60 minuten geldig en kan maar één keer worden gebruikt.</p>
            </div>
            
            <p>Als je geen wachtwoord reset hebt aangevraagd, kun je deze e-mail veilig negeren. Je account blijft beveiligd.</p>
            
            <p>Als je problemen ondervindt met de knop hierboven, kopieer dan de onderstaande URL en plak deze in je webbrowser:</p>
            
            <div class="url-display">
                {{ $resetUrl }}
            </div>
        </div>
        
        <div class="footer">
            <p>© {{ date('Y') }} MEOS. Alle rechten voorbehouden.</p>
            <p>Deze e-mail is verzonden naar {{ $email }} in verband met je account bij MEOS.</p>
        </div>
    </div>
</body>
</html>
