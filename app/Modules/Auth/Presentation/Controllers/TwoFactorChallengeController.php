<?php

namespace App\Modules\Auth\Presentation\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class TwoFactorChallengeController
{
    public function __invoke(): Response
    {
        return Inertia::render('Auth::TwoFactorChallenge');
    }
}
