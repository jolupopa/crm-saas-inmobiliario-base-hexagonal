<?php

namespace App\Domains\Shared\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

abstract class BaseResource extends JsonResource
{
    // Helper común para formatear fechas con Carbon para el frontend
    protected function formatDate($date)
    {
        return $date ? $date->diffForHumans() : null;
    }
}