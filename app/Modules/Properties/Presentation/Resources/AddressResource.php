<?php

namespace App\Modules\Properties\Presentation\Resources;

use App\Core\BaseResource;
use Illuminate\Http\Request;

class AddressResource extends BaseResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ubigeo_id' => $this->ubigeo_id,
            'address' => $this->address,
            'reference' => $this->reference,
            'latitude' => (float) $this->latitude,
            'longitude' => (float) $this->longitude,
            'ubigeo' => $this->whenLoaded('ubigeo'),
            'created_at' => $this->transformDate($this->created_at),
        ];
    }
}
