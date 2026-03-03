<?php

namespace App\Modules\Profile\Presentation\Controllers;

use App\Modules\Profile\Application\Actions\UpdateProfileAction;
use App\Modules\Profile\Presentation\Resources\ProfileResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UpdateProfileController
{
    public function __invoke(Request $request, UpdateProfileAction $action): RedirectResponse
    {
        $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $action->execute($request->user(), $request->only('name', 'email', 'company_name'));

        return redirect()->route('profile.show')
            ->with('success', 'Perfil actualizado correctamente.');
    }
}
