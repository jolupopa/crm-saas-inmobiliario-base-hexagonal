<?php

namespace App\Modules\Categories\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Categories\Domain\Models\Category;

class DeleteCategoryAction extends BaseAction
{
    public function __construct(
        protected Category $category
    ) {}

    public function execute(): bool
    {
        return $this->category->delete();
    }
}
