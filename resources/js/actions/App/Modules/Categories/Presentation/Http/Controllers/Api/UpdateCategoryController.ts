import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../../../wayfinder'
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
const UpdateCategoryController = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: UpdateCategoryController.url(args, options),
    method: 'put',
})

UpdateCategoryController.definition = {
    methods: ["put"],
    url: '/api/categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
UpdateCategoryController.url = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return UpdateCategoryController.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
UpdateCategoryController.put = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: UpdateCategoryController.url(args, options),
    method: 'put',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
    const UpdateCategoryControllerForm = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: UpdateCategoryController.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
        UpdateCategoryControllerForm.put = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: UpdateCategoryController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    UpdateCategoryController.form = UpdateCategoryControllerForm
export default UpdateCategoryController