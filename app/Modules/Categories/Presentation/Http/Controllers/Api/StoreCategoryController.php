<?php

namespace App\Modules\Categories\Presentation\Http\Controllers\Api;

use App\Modules\Categories\Application\Actions\StoreCategoryAction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class StoreCategoryController
{
    /**
     * @see routes/web.php
     * @route '/api/categories'
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:property,project',
        ]);

        $action = new StoreCategoryAction(array_merge($validated, [
            'company_id' => $request->user()->company_id,
        ]));
        
        $action->execute();

        return redirect()->back()->with('success', 'Categoría creada correctamente');
    }
}
