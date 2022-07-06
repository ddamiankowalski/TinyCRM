<?php

namespace App\Http\Controllers;

use App\Exceptions\RegisterException;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\Register;
use Illuminate\Support\Str;
use Throwable;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validation = FacadesValidator::make($request->json()->all(), [
            'password' => 'required'
        ]);


        if($validation->fails()){
            return response([
                'message' => 'Password is empty',
                Response::HTTP_NOT_ACCEPTABLE
            ]);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'register_uuid' => Str::uuid()
        ]);

        if(!$user) {
            throw new RegisterException();
        }
        else {
            $this->sendRegisterMail($request->input('email'), $user->register_uuid);
        }

        return $user;
    }

    public function resendemail(Request $request)
    {
        $user = User::where('email', '=', $request->input('email'))->firstOrFail();
        $this->sendRegisterMail($request->input('email'), $user->register_uuid);
    }

    public function activate(Request $request)
    {
        $user = User::where('register_uuid', '=', $request->input('uuid'))->firstOrFail();

        $user->register_uuid = null;
        $user->save();

        return response([
            'message' => 'Konto zostalo poprawnie zaktywowane',
        ], Response::HTTP_ACCEPTED);
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response([
                'message' => 'Nieprawidlowy adres email lub haslo'
            ], Response::HTTP_UNAUTHORIZED);
        } else {
            /** @var \App\Models\MyUserModel $user **/
            $user = Auth::user();
            if($user->register_uuid != null) {
                return response([
                    'message' => 'Sprawdz skrzynke pocztowa aby aktywowac konto'
                ], Response::HTTP_UNAUTHORIZED);
            }

            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('tinycrm_token', $token, 15);

            return response([
                'message' => $token
            ])->withCookie($cookie);
        }
    }

    public function user()
    {
        return Auth::user();
    }

    public function logout()
    {
        $cookie = Cookie::forget('tinycrm_token');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);
    }

    public function sendRegisterMail($mail, $register_uuid)
    {
        $details = [
            'account_mail' => $mail,
            'register_uuid' => $register_uuid
        ];

        Mail::to($mail)->send(new Register($details));
    }
}
