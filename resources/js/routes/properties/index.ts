import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ListPropertiesController.php:13
 * @route '/propiedades'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/propiedades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ListPropertiesController.php:13
 * @route '/propiedades'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ListPropertiesController.php:13
 * @route '/propiedades'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ListPropertiesController.php:13
 * @route '/propiedades'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ListPropertiesController.php:13
 * @route '/propiedades'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ListPropertiesController.php:13
 * @route '/propiedades'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/ListPropertiesController.php:13
 * @route '/propiedades'
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
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/propiedades/crear',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::__invoke
 * @see app/Modules/Properties/Presentation/Controllers/CreatePropertyController.php:14
 * @route '/propiedades/crear'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
const properties = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
}

export default properties