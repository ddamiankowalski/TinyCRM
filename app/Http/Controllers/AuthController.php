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
            'password' => Hash::make($request->input('password'))
        ]);

        if(!$user) {
            throw new RegisterException();
        }
        else {
            $this->sendRegisterMail($request->input('email'), $user->id);
        }

        return $user;
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response([
                'message' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        } else {
            /** @var \App\Models\MyUserModel $user **/
            $user = Auth::user();

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

    public function sendRegisterMail($mail, $id)
    {
        $details = [
            'account_mail' => $mail,
            'account_id' => $id
        ];

        Mail::to($mail)->send(new Register($details));
    }
}
