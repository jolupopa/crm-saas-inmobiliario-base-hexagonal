<?php

namespace App\Modules\Properties\Presentation\Resources;

use App\Core\BaseResource;
use Illuminate\Http\Request;

class PropertyResource extends BaseResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'type' => $this->type,
            'operation' => $this->operation,
            'price' => (float) $this->price,
            'currency' => $this->currency,
            'area_total' => (float) $this->area_total,
            'area_built' => (float) $this->area_built,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'parking_spots' => $this->parking_spots,
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'address' => new AddressResource($this->whenLoaded('address')),
            'listings' => ListingResource::collection($this->whenLoaded('listings')),
            'active_listing' => new ListingResource($this->activeListing()),
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'main_image' => $this->getFirstMediaUrl('images') ?: '/images/placeholder-property.jpg',
            'created_at' => $this->transformDate($this->created_at),
        ];
    }
}
