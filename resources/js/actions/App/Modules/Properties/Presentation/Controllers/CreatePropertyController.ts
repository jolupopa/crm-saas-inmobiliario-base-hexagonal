import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
const CreatePropertyController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePropertyController.url(options),
    method: 'get',
})

CreatePropertyController.definition = {
    methods: ["get","head"],
    url: '/propiedades/crear',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
CreatePropertyController.url = (options?: RouteQueryOptions) => {
    return CreatePropertyController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
CreatePropertyController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePropertyController.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
CreatePropertyController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreatePropertyController.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
    const CreatePropertyControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreatePropertyController.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
        CreatePropertyControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePropertyController.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
        CreatePropertyControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePropertyController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreatePropertyController.form = CreatePropertyControllerForm
export default CreatePropertyController