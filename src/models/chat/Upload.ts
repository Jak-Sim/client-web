/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { UploadCreateData, UploadCreatePayload } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Upload<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Upload a normal image.
   *
   * @tags Image
   * @name UploadCreate
   * @request POST:/upload
   * @response `200` `UploadCreateData` OK
   * @response `400` `void` Bad Request
   * @response `500` `void` Internal Server Error
   */
  uploadCreate = (data: UploadCreatePayload, params: RequestParams = {}) =>
    this.request<UploadCreateData, void>({
      path: `/upload`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
