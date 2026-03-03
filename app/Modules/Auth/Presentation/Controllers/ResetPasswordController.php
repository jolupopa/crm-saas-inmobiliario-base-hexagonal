<?php

namespace App\Modules\Auth\Presentation\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResetPasswordController
{
    public function __invoke(Request $request, string $token): Response
    {
        return Inertia::render('Auth::ResetPassword', [
            'token' => $token,
            'email' => $request->query('email', ''),
        ]);
    }
}
