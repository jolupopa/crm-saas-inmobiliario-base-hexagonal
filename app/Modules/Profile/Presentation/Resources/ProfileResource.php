<?php

namespace App\Modules\Profile\Presentation\Resources;

use App\Core\BaseResource;
use Illuminate\Support\Facades\Storage;

class ProfileResource extends BaseResource
{
    public function toArray($request): array
    {
        return [
            'id'                  => $this->id,
            'name'                => $this->name,
            'email'               => $this->email,
            'company_name'        => $this->company_name,
            'avatar_url'          => $this->avatar_url
                ? '/storage/' . $this->avatar_url
                : null,
            'initials'            => $this->getInitials(),
            'two_factor_enabled'  => ! is_null($this->two_factor_secret),
        ];
    }
}
