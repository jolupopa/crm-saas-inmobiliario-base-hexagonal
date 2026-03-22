<?php

namespace App\Modules\Public\Presentation\Resources;

use App\Core\BaseResource;
use App\Modules\Properties\Presentation\Resources\AddressResource;
use App\Modules\Properties\Presentation\Resources\AmenityResource;
use App\Modules\Properties\Presentation\Resources\ListingResource;
use Illuminate\Http\Request;

class PublicPropertyResource extends BaseResource
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
            'price_formatted' => $this->currency . ' ' . number_format($this->price, 2),
            'currency' => $this->currency,
            'area_total' => (float) $this->area_total,
            'area_built' => (float) $this->area_built,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'parking_spots' => $this->parking_spots,
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'address' => $this->address?->address ?? '', 
            'ubigeo' => $this->address?->ubigeo ? [
                'district' => $this->address->ubigeo->district,
                'province' => $this->address->ubigeo->province,
            ] : null,
            'amenities' => $this->amenities->pluck('name')->toArray(),
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ] : null,
            'agent' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email ?? '',
            ],
            'main_image' => $this->getFirstMediaUrl('images') ?: '/images/placeholder-property.jpg',
            'images' => $this->getMedia('images')->map(fn($media) => [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'thumb' => $media->getUrl('thumb'),
            ]),
            'created_at_human' => $this->created_at?->diffForHumans(),
        ];
    }
}
