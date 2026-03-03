<?php

namespace App\Modules\Admin\Presentation\Controllers\Users;

use App\Modules\Auth\Domain\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Modules\Admin\Presentation\Resources\UserResource;

class IndexUserController
{
    public function __invoke(Request $request): Response
    {
        $users = User::where('company_id', $request->user()->company_id)
            ->latest()
            ->paginate();

        return Inertia::render('Admin::Users/Index', [
            'users' => UserResource::collection($users)
        ]);
    }
}
