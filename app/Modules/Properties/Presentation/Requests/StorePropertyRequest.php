<?php

namespace App\Modules\Properties\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Controlado por Policy en el Controller
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:house,apartment,commercial,land,office',
            'operation' => 'required|in:sale,rent',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'area_total' => 'required|numeric|min:0',
            'area_built' => 'nullable|numeric|min:0',
            'bedrooms' => 'integer|min:0',
            'bathrooms' => 'integer|min:0',
            'parking_spots' => 'integer|min:0',
            'status' => 'required|in:draft,published,archived,sold,rented',
            'is_featured' => 'boolean',
            'amenities' => 'array',
            'amenities.*' => 'exists:amenities,id',
            'address' => 'required|array',
            'address.ubigeo_id' => 'required|string|size:6',
            'address.address' => 'required|string|max:255',
            'address.reference' => 'nullable|string|max:255',
            'address.latitude' => 'nullable|numeric',
            'address.longitude' => 'nullable|numeric',
        ];
    }
}
