import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
export const pipeline = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pipeline.url(options),
    method: 'get',
})

pipeline.definition = {
    methods: ["get","head"],
    url: '/crm/pipeline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
pipeline.url = (options?: RouteQueryOptions) => {
    return pipeline.definition.url + queryParams(options)
}

/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
pipeline.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pipeline.url(options),
    method: 'get',
})
/**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
pipeline.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pipeline.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
    const pipelineForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pipeline.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
        pipelineForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pipeline.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\CRM\Presentation\Controllers\PipelineController::__invoke
 * @see app/Modules/CRM/Presentation/Controllers/PipelineController.php:15
 * @route '/crm/pipeline'
 */
        pipelineForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pipeline.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pipeline.form = pipelineForm
const crm = {
    pipeline: Object.assign(pipeline, pipeline),
}

export default crm