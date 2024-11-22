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

import { ChallengeCreateData, ChallengeCreatePayload, CreateCreateData, CreateCreatePayload } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Create<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Create a new chat room.
   *
   * @tags Chat Rooms
   * @name CreateCreate
   * @request POST:/create
   * @response `201` `CreateCreateData` Created
   * @response `400` `void` Bad Request
   * @response `500` `void` Internal Server Error
   */
  createCreate = (data: CreateCreatePayload, params: RequestParams = {}) =>
    this.request<CreateCreateData, void>({
      path: `/create`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Create a new challenge chat room.
   *
   * @tags Chat Rooms
   * @name ChallengeCreate
   * @request POST:/create/challenge/{challengeId}
   * @response `201` `ChallengeCreateData` Created
   * @response `400` `void` Bad Request
   * @response `500` `void` Internal Server Error
   */
  challengeCreate = (challengeId: any, data: ChallengeCreatePayload, params: RequestParams = {}) =>
    this.request<ChallengeCreateData, void>({
      path: `/create/challenge/${challengeId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
