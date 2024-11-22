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

import { DeleteRoomIdData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class RoomId<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete a chat room.
   *
   * @tags Chat Rooms
   * @name DeleteRoomId
   * @request DELETE:/{roomId}
   * @response `200` `DeleteRoomIdData` OK
   * @response `500` `void` Internal Server Error
   */
  deleteRoomId = (roomId: string, params: RequestParams = {}) =>
    this.request<DeleteRoomIdData, void>({
      path: `/${roomId}`,
      method: 'DELETE',
      ...params,
    });
}
