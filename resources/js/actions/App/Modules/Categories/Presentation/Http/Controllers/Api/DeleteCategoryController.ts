import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../../../wayfinder'
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
const DeleteCategoryController = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: DeleteCategoryController.url(args, options),
    method: 'delete',
})

DeleteCategoryController.definition = {
    methods: ["delete"],
    url: '/api/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
DeleteCategoryController.url = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return DeleteCategoryController.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
DeleteCategoryController.delete = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: DeleteCategoryController.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
    const DeleteCategoryControllerForm = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: DeleteCategoryController.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
        DeleteCategoryControllerForm.delete = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: DeleteCategoryController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    DeleteCategoryController.form = DeleteCategoryControllerForm
export default DeleteCategoryController