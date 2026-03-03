import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
export const update = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
update.url = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
update.put = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/UpdateCategoryController.php:16
 * @route '/api/categories/{category}'
 */
    const updateForm = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
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
        updateForm.put = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
export const destroy = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
destroy.url = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
destroy.delete = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/DeleteCategoryController.php:15
 * @route '/api/categories/{category}'
 */
    const destroyForm = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
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
        destroyForm.delete = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const categories = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default categories