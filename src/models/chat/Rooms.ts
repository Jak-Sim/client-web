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
import { RoomsDeleteData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Rooms<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Deletes a chat room with the specified room ID.
   *
   * @tags Chat Rooms
   * @name RoomsDelete
   * @summary Delete a chat room
   * @request DELETE:/rooms/{roomId}
   * @response `200` `RoomsDeleteData` Room deleted successfully
   * @response `500` `void` Failed to delete room
   */
  roomsDelete = (roomId: number, params: RequestParams = {}) =>
    this.request<RoomsDeleteData, void>({
      path: `/rooms/${roomId}`,
      method: 'DELETE',
      ...params,
    });
}
