<?php

namespace App\Core;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class BaseResource extends JsonResource
{
    protected function transformDate($date): ?string
    {
        return $date instanceof Carbon ? $date->toISOString() : $date;
    }
}
