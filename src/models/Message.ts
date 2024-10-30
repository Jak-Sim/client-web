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

import { MessageDetailData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Message<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Returns chat messages for the specified room.
   *
   * @tags Chat Messages
   * @name MessageDetail
   * @summary Get chat messages for a specific room
   * @request GET:/message/{roomId}
   * @response `200` `MessageDetailData` Messages in the specified room
   * @response `500` `void` Failed to fetch chat messages
   */
  messageDetail = (roomId: number, params: RequestParams = {}) =>
    this.request<MessageDetailData, void>({
      path: `/message/${roomId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
