<!DOCTYPE html>
<html>
<head>
    <title>TinyCRM - Rejstracja</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700" rel="stylesheet" type="text/css">
    <style>
        body {
            font-family: 'Open Sans';
            background-color: #edf1f7;
            min-height: fit-content;
            margin: 0;
            height: 100vh;
        }
        #main-mail-message {
            background-color: #fff;
            padding: 60px;
            max-width: 450px;
        }
        #wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        #button {
            padding: 15px 20px;
            color: white;
            background-color: #36f;
            max-width: fit-content;
            border-radius: 5px;
            margin-top: 30px;
            margin-bottom: 35px;
            font-size: 12px;
            cursor: pointer;
        }
        a {
            all: unset;
        }

        @media only screen and (max-width: 600px) {
            #main-mail-message {
                padding: 0 30px;
                height: 100%;
            }
        }
    </style>
</head>
<body>
    <div id="wrapper">
        <div id="main-mail-message">
            <h1>Witamy na pokladzie TinyCRM!</h1>
            <p>Otrzymalismy powiadomienie, ze uzytkownik skrzynki pocztowej, na ktorej przyszedl ten mail probowal zarejestrowac konto w naszym serwisie.</p>
            <p>Aby potwierdzic swoje konto, nacisnij w ponizszy przycisk:</p>
            <a href={{ "http://localhost:4200/confirm/" . $details['register_uuid'] }}>
                <div id="button" onClick="">
                    <b>AKTYWUJ KONTO</b>
                </div>
            </a>
            <p><b>Uwaga! </b> Jezeli to nie ty zalozyles u nas konto, jak najszybciej skontaktuj sie z nami pod adresem support@tinycrm.pl</p>
            <p>Dziekujemy za wspieranie naszego systemu. Milego HR'owania!</p>
        </div>
    </div>
</body>
</html>
