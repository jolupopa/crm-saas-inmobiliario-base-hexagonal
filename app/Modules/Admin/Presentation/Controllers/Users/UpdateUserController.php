<?php

namespace App\Modules\Admin\Presentation\Controllers\Users;

use App\Modules\Auth\Domain\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UpdateUserController
{
    public function __invoke(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'email'        => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'company_name' => ['nullable', 'string', 'max:255'],
            'avatar'       => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->avatar_url) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($user->avatar_url);
            }
            $validated['avatar_url'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->update([
            'name'         => $validated['name'],
            'email'        => $validated['email'],
            'company_name' => $validated['company_name'] ?? $user->company_name,
            'avatar_url'   => $validated['avatar_url'] ?? $user->avatar_url,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario actualizado correctamente');
    }
}
