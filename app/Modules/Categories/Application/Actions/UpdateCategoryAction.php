<?php

namespace App\Modules\Categories\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Categories\Domain\Models\Category;
use Illuminate\Support\Str;

class UpdateCategoryAction extends BaseAction
{
    public function __construct(
        protected Category $category,
        protected array $data
    ) {}

    public function execute(): Category
    {
        $this->category->update([
            'name' => $this->data['name'],
            'slug' => Str::slug($this->data['name']),
            'type' => $this->data['type'],
        ]);

        return $this->category;
    }
}
