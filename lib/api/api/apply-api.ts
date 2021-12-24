/* tslint:disable */
/* eslint-disable */
/**
 * Test API
 * Test description
 *
 * The version of the OpenAPI document: v1
 * Contact: testing@api.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { ApplyTask } from '../model';
/**
 * ApplyApi - axios parameter creator
 * @export
 */
export const ApplyApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {ApplyTask} data 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        applyCreate: async (data: ApplyTask, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'data' is not null or undefined
            assertParamExists('applyCreate', 'data', data)
            const localVarPath = `/apply`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Basic required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ApplyApi - functional programming interface
 * @export
 */
export const ApplyApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ApplyApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {ApplyTask} data 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async applyCreate(data: ApplyTask, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplyTask>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.applyCreate(data, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ApplyApi - factory interface
 * @export
 */
export const ApplyApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ApplyApiFp(configuration)
    return {
        /**
         * 
         * @param {ApplyTask} data 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        applyCreate(data: ApplyTask, options?: any): AxiosPromise<ApplyTask> {
            return localVarFp.applyCreate(data, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for applyCreate operation in ApplyApi.
 * @export
 * @interface ApplyApiApplyCreateRequest
 */
export interface ApplyApiApplyCreateRequest {
    /**
     * 
     * @type {ApplyTask}
     * @memberof ApplyApiApplyCreate
     */
    readonly data: ApplyTask
}

/**
 * ApplyApi - object-oriented interface
 * @export
 * @class ApplyApi
 * @extends {BaseAPI}
 */
export class ApplyApi extends BaseAPI {
    /**
     * 
     * @param {ApplyApiApplyCreateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplyApi
     */
    public applyCreate(requestParameters: ApplyApiApplyCreateRequest, options?: any) {
        return ApplyApiFp(this.configuration).applyCreate(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
    }
}
