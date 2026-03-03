<?php

// Validamos que no se queden funciones de debug en el código
arch('globals')
    ->expect(['dd', 'dump', 'ray'])
    ->not->toBeUsed();

// Los modelos deben extender de App\Core\BaseModel
arch('models')
    ->expect('App\Modules\*\Domain\Models')
    ->toExtend('App\Core\BaseModel')
    ->ignoring('App\Modules\Auth\Domain\Models\User'); // User extiende de Authenticatable pero usa HasUuids


// Los controladores deben ser invokables y delgados
arch('controllers')
    ->expect('App\Modules\*\Presentation\Controllers')
    ->toBeInvokable();

// Prohibir IDs incrementales, usar UUIDs
arch('uuids')
    ->expect('App\Modules\*\Domain\Models')
    ->not->toUse('Illuminate\Database\Eloquent\Model::$incrementing')
    ->ignoring('App\Modules\Auth\Domain\Models\User');