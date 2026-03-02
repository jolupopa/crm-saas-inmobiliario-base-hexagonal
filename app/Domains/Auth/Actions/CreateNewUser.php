<?php

namespace App\Domains\Auth\Actions;

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * Single-Tenant: el campo company_name se guarda como dato de perfil del usuario.
     * El usuario se asigna a la Company existente del sistema (la única).
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name'         => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'email'        => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password'     => $this->passwordRules(),
        ])->validate();

        // ── Single-Tenant: obtener la única Company del sistema ──────────────
        // Si no existe ninguna aún, la creamos con el nombre que ingresó el usuario
        // (o un valor por defecto). En multi-tenant esto se reemplazaría por elegir/crear tenant.
        $company = Company::first() ?? Company::create([
            'name' => $input['company_name'] ?? config('app.name', 'My Agency'),
        ]);

        return User::create([
            'company_id'   => $company->id,
            'name'         => $input['name'],
            'company_name' => $input['company_name'] ?? null,  // Perfil del usuario
            'email'        => $input['email'],
            'password'     => Hash::make($input['password']),
        ]);
    }
}
