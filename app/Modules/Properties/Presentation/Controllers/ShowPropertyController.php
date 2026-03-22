<?php

namespace App\Modules\Properties\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Presentation\Resources\PropertyResource;
use Inertia\Inertia;
use Inertia\Response;

class ShowPropertyController extends Controller
{
    public function __invoke(Property $property): Response
    {
        abort_if($property->company_id !== auth()->user()->company_id, 403);

        $property->load(['address', 'amenities', 'listings', 'user']);

        return Inertia::render('Modules/Properties/Pages/Show', [
            'property' => new PropertyResource($property),
        ]);
    }
}
