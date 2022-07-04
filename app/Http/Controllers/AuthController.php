<?php

namespace App\Http\Controllers;

use App\Exceptions\RegisterException;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Symfony\Component\HttpFoundation\Response;
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

        try {
            return User::create([
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
            ]);
        } catch (Throwable $e) {
            throw new RegisterException($e);
        }
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
            $cookie = cookie('jwt', $token, 15);

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
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);
    }
}
