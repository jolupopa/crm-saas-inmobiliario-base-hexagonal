<?php

namespace App\Modules\Properties\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Application\Actions\UpdatePropertyAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdatePropertyController extends Controller
{
    public function __invoke(
        Request $request,
        Property $property,
        UpdatePropertyAction $updateAction
    ) {
        $this->authorize('update', $property);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:house,apartment,commercial,land,office',
            'operation' => 'required|string|in:sale,rent',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'area_total' => 'required|numeric|min:0',
            'area_built' => 'nullable|numeric|min:0',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'parking_spots' => 'nullable|integer|min:0',
            'category_id' => 'nullable|uuid|exists:categories,id',
            'amenities' => 'nullable|array',
            'amenities.*' => 'uuid|exists:amenities,id',
            'address' => 'required|array',
            'address.ubigeo_id' => 'required|string|size:6',
            'address.address' => 'required|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|max:5120',
        ]);

        $images = $request->file('images', []);

        $updateAction->execute($property, $data);

        return redirect()->route('properties.show', $property)->with('success', 'Propiedad actualizada con éxito.');
    }
}
