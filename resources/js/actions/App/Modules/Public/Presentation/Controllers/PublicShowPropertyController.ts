import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
const PublicShowPropertyController = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PublicShowPropertyController.url(args, options),
    method: 'get',
})

PublicShowPropertyController.definition = {
    methods: ["get","head"],
    url: '/propiedad/{property}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
PublicShowPropertyController.url = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return PublicShowPropertyController.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
PublicShowPropertyController.get = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PublicShowPropertyController.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
PublicShowPropertyController.head = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PublicShowPropertyController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
    const PublicShowPropertyControllerForm = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: PublicShowPropertyController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
        PublicShowPropertyControllerForm.get = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PublicShowPropertyController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::__invoke
 * @see app/Modules/Public/Presentation/Controllers/PublicShowPropertyController.php:13
 * @route '/propiedad/{property}'
 */
        PublicShowPropertyControllerForm.head = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PublicShowPropertyController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    PublicShowPropertyController.form = PublicShowPropertyControllerForm
export default PublicShowPropertyController