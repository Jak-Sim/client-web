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
   * @description Creates a new chat room with the given name, type, and participants.
   *
   * @tags Chat Rooms
   * @name CreateCreate
   * @summary Create a new chat room
   * @request POST:/create
   * @response `201` `CreateCreateData` Room created successfully
   * @response `400` `void` Missing User ID in headers
   * @response `500` `void` Failed to create room
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
   * @description Creates a new chat room associated with a specific challenge.
   *
   * @tags Chat Rooms
   * @name ChallengeCreate
   * @summary Create a new challenge chat room
   * @request POST:/create/challenge/{challengeId}
   * @response `201` `ChallengeCreateData` Challenge room created successfully
   * @response `400` `void` Invalid request data
   * @response `500` `void` Failed to create challenge chat room
   */
  challengeCreate = (challengeId: number, data: ChallengeCreatePayload, params: RequestParams = {}) =>
    this.request<ChallengeCreateData, void>({
      path: `/create/challenge/${challengeId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
