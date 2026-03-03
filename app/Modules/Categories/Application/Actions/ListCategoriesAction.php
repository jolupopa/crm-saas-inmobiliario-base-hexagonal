<?php

namespace App\Modules\Categories\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Categories\Domain\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class ListCategoriesAction extends BaseAction
{
    public function __construct(
        protected string $companyId,
        protected string $type
    ) {}

    public function execute(): Collection
    {
        return Category::where('company_id', $this->companyId)
            ->where('type', $this->type)
            ->orderBy('name')
            ->get();
    }
}
