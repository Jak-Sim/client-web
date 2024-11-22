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
   * @description Fetch messages for a specific chat room.
   *
   * @tags Chat Rooms
   * @name MessageDetail
   * @request GET:/message/{roomId}
   * @response `200` `MessageDetailData` OK
   * @response `500` `void` Internal Server Error
   */
  messageDetail = (roomId: any, params: RequestParams = {}) =>
    this.request<MessageDetailData, void>({
      path: `/message/${roomId}`,
      method: 'GET',
      ...params,
    });
}
