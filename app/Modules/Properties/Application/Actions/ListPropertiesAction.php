<?php

namespace App\Modules\Properties\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Properties\Domain\Models\Property;
use Illuminate\Pagination\LengthAwarePaginator;

class ListPropertiesAction extends BaseAction
{
    public function __construct(
        protected array $filters = [],
        protected int $perPage = 12
    ) {}

    public function execute(): LengthAwarePaginator
    {
        $query = Property::query()
            ->with(['category', 'amenities', 'user'])
            ->withExists('media')
            ->search($this->filters['search'] ?? null)
            ->filter($this->filters)
            ->withAmenities($this->filters['amenities'] ?? [])
            ->where('company_id', $this->filters['company_id'])
            ->latest();

        if (!empty($this->filters['include_trashed'])) {
            $query->withTrashed();
        }

        return $query->paginate($this->perPage)
            ->withQueryString();
    }
}
