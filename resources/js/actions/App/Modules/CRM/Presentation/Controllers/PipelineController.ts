import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
const PipelineController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PipelineController.url(options),
    method: 'get',
})

PipelineController.definition = {
    methods: ["get","head"],
    url: '/crm/pipeline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
PipelineController.url = (options?: RouteQueryOptions) => {
    return PipelineController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
PipelineController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PipelineController.url(options),
    method: 'get',
})
/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
PipelineController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PipelineController.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
    const PipelineControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: PipelineController.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
        PipelineControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PipelineController.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
        PipelineControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PipelineController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    PipelineController.form = PipelineControllerForm
export default PipelineController