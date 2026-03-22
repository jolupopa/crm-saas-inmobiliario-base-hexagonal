import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Public\Presentation\Controllers\PublicPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicPropertyController.php:15
 * @route '/propiedades-publico'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/propiedades-publico',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Public\Presentation\Controllers\PublicPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicPropertyController.php:15
 * @route '/propiedades-publico'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Public\Presentation\Controllers\PublicPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicPropertyController.php:15
 * @route '/propiedades-publico'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Public\Presentation\Controllers\PublicPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicPropertyController.php:15
 * @route '/propiedades-publico'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Public\Presentation\Controllers\PublicPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicPropertyController.php:15
 * @route '/propiedades-publico'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Public\Presentation\Controllers\PublicPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicPropertyController.php:15
 * @route '/propiedades-publico'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Public\Presentation\Controllers\PublicPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicPropertyController.php:15
 * @route '/propiedades-publico'
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
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
export const show = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/propiedad/{property}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
show.url = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { property: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: typeof args.property === 'object'
                ? args.property.id
                : args.property,
                }

    return show.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
show.get = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
show.head = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
    const showForm = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
        showForm.get = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
        showForm.head = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const properties = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default properties