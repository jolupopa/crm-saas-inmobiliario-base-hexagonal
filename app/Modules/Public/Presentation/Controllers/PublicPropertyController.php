<?php

namespace App\Modules\Public\Presentation\Controllers;

use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Public\Presentation\Resources\PublicPropertyResource;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Properties\Domain\Models\Amenity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicPropertyController
{
    public function __invoke(Request $request): Response
    {
        $filters = $request->only(['search', 'type', 'operation', 'min_price', 'max_price', 'bedrooms', 'bathrooms', 'category_id', 'amenities']);
        
        $properties = Property::query()
            ->where('status', 'published')
            ->search($request->search)
            ->filter($filters)
            ->withAmenities($request->amenities ?? [])
            ->with(['category', 'media'])
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public::PropertySearch', [
            'properties' => PublicPropertyResource::collection($properties),
            'filters' => $filters,
            'categories' => Category::all(['id', 'name']),
            'amenities' => Amenity::all(['id', 'name']),
        ]);
    }
}
