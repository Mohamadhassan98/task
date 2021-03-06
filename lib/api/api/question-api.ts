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
import { Question } from '../model';
/**
 * QuestionApi - axios parameter creator
 * @export
 */
export const QuestionApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        questionRead: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/question`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Basic required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id A unique integer value identifying this question.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        questionRead_1: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('questionRead_1', 'id', id)
            const localVarPath = `/question/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Basic required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * QuestionApi - functional programming interface
 * @export
 */
export const QuestionApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = QuestionApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async questionRead(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Question>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.questionRead(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id A unique integer value identifying this question.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async questionRead_1(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Question>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.questionRead_1(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * QuestionApi - factory interface
 * @export
 */
export const QuestionApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = QuestionApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        questionRead(options?: any): AxiosPromise<Question> {
            return localVarFp.questionRead(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id A unique integer value identifying this question.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        questionRead_1(id: number, options?: any): AxiosPromise<Question> {
            return localVarFp.questionRead_1(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for questionRead_1 operation in QuestionApi.
 * @export
 * @interface QuestionApiQuestionRead0Request
 */
export interface QuestionApiQuestionRead0Request {
    /**
     * A unique integer value identifying this question.
     * @type {number}
     * @memberof QuestionApiQuestionRead0
     */
    readonly id: number
}

/**
 * QuestionApi - object-oriented interface
 * @export
 * @class QuestionApi
 * @extends {BaseAPI}
 */
export class QuestionApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QuestionApi
     */
    public questionRead(options?: any) {
        return QuestionApiFp(this.configuration).questionRead(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {QuestionApiQuestionRead0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QuestionApi
     */
    public questionRead_1(requestParameters: QuestionApiQuestionRead0Request, options?: any) {
        return QuestionApiFp(this.configuration).questionRead_1(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }
}
