<?php

namespace App\Modules\Properties\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\Properties\Presentation\Resources\UbigeoResource;
use App\Modules\Properties\Presentation\Resources\AmenityResource;
use Inertia\Inertia;

class CreatePropertyController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Properties::Create', [
            'ubigeos' => UbigeoResource::collection(Ubigeo::select('id', 'district', 'province', 'department')->get()),
            'amenities' => AmenityResource::collection(Amenity::all()),
        ]);
    }
}
