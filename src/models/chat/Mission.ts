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

import { ConfirmCreateData, ConfirmCreatePayload, UploadCreateBody, UploadCreateResult } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Mission<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Upload a challenge image.
   *
   * @tags Image
   * @name UploadCreate
   * @request POST:/mission/upload
   * @response `200` `UploadCreateResult` Challenge image uploaded successfully.
   * @response `400` `void` Bad Request - File upload error.
   * @response `500` `void` Internal Server Error
   */
  uploadCreate = (data: UploadCreateBody, params: RequestParams = {}) =>
    this.request<UploadCreateResult, void>({
      path: `/mission/upload`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update the status of a challenge image.
   *
   * @tags Image
   * @name ConfirmCreate
   * @request POST:/mission/confirm
   * @response `200` `ConfirmCreateData` Status updated successfully.
   * @response `400` `void` Bad Request - Invalid data provided.
   * @response `500` `void` Internal Server Error
   */
  confirmCreate = (data: ConfirmCreatePayload, params: RequestParams = {}) =>
    this.request<ConfirmCreateData, void>({
      path: `/mission/confirm`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
