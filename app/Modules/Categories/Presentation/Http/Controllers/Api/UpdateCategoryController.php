<?php

namespace App\Modules\Categories\Presentation\Http\Controllers\Api;

use App\Modules\Categories\Application\Actions\UpdateCategoryAction;
use App\Modules\Categories\Domain\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UpdateCategoryController
{
    /**
     * @see routes/web.php
     * @route '/api/categories/{category}'
     */
    public function __invoke(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:property,project',
        ]);

        $action = new UpdateCategoryAction($category, $validated);
        $action->execute();

        return redirect()->back()->with('success', 'Categoría actualizada correctamente');
    }
}
