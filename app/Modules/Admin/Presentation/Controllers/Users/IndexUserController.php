<?php

namespace App\Modules\Admin\Presentation\Controllers\Users;

use App\Modules\Auth\Domain\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Modules\Admin\Presentation\Resources\UserResource;
use App\Modules\Admin\Presentation\Resources\RoleResource;

class IndexUserController
{
    public function __invoke(Request $request): Response
    {
        $query = User::where('company_id', $request->user()->company_id)
            ->with('roles')
            ->latest();

        // Búsqueda
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'ILIKE', "%{$search}%")
                  ->orWhere('email', 'ILIKE', "%{$search}%");
            });
        }

        // Filtro por Rol
        if ($request->filled('role')) {
            $query->whereHas('roles', function($q) use ($request) {
                $q->where('slug', $request->input('role'));
            });
        }

        return Inertia::render('Admin::Users/Index', [
            'users' => UserResource::collection($query->paginate()->withQueryString()),
            'filters' => $request->only(['search', 'role']),
            'availableRoles' => RoleResource::collection(\App\Modules\ACL\Domain\Models\Role::all(['id', 'name', 'slug']))
        ]);
    }
}
