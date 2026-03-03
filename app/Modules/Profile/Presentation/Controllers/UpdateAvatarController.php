<?php

namespace App\Modules\Profile\Presentation\Controllers;

use App\Modules\Profile\Application\Actions\UpdateAvatarAction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UpdateAvatarController
{
    public function __invoke(Request $request, UpdateAvatarAction $action): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $action->execute($request->user(), $request->file('avatar'));

        return redirect()->route('profile.show')
            ->with('success', 'Avatar actualizado correctamente.');
    }
}
