<?php

namespace App\Modules\Profile\Presentation\Controllers;

use App\Modules\Profile\Presentation\Resources\ProfileResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShowProfileController
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('Profile::Profile', [
            'user' => new ProfileResource($request->user()),
        ]);
    }
}
