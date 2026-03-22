import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ShowPropertyController.php:13
 * @route '/propiedades/{property}'
 */
const ShowPropertyController = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ShowPropertyController.url(args, options),
    method: 'get',
})

ShowPropertyController.definition = {
    methods: ["get","head"],
    url: '/propiedades/{property}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ShowPropertyController.php:13
 * @route '/propiedades/{property}'
 */
ShowPropertyController.url = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return ShowPropertyController.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ShowPropertyController.php:13
 * @route '/propiedades/{property}'
 */
ShowPropertyController.get = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ShowPropertyController.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ShowPropertyController.php:13
 * @route '/propiedades/{property}'
 */
ShowPropertyController.head = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ShowPropertyController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ShowPropertyController.php:13
 * @route '/propiedades/{property}'
 */
    const ShowPropertyControllerForm = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ShowPropertyController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ShowPropertyController.php:13
 * @route '/propiedades/{property}'
 */
        ShowPropertyControllerForm.get = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ShowPropertyController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ShowPropertyController.php:13
 * @route '/propiedades/{property}'
 */
        ShowPropertyControllerForm.head = (args: { property: string | { id: string } } | [property: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ShowPropertyController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ShowPropertyController.form = ShowPropertyControllerForm
export default ShowPropertyController