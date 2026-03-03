<?php

namespace App\Modules\Categories\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Categories\Domain\Models\Category;
use Illuminate\Support\Str;

class StoreCategoryAction extends BaseAction
{
    public function __construct(
        protected array $data
    ) {}

    public function execute(): Category
    {
        return Category::create([
            'company_id' => $this->data['company_id'],
            'name' => $this->data['name'],
            'slug' => Str::slug($this->data['name']),
            'type' => $this->data['type'],
        ]);
    }
}
