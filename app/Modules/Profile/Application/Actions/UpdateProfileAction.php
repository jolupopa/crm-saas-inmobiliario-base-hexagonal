<?php

namespace App\Modules\Profile\Application\Actions;

use App\Modules\Auth\Domain\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UpdateProfileAction
{
    public function execute(User $user, array $data): User
    {
        $validated = Validator::make($data, [
            'name'         => ['required', 'string', 'max:255'],
            'email'        => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'company_name' => ['nullable', 'string', 'max:255'],
        ])->validate();

        $user->update($validated);

        return $user->fresh();
    }
}
