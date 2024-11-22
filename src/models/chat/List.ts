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

import { ChallengeListData, GroupListData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class List<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Fetch the list of group chat rooms.
   *
   * @tags Chat Rooms
   * @name GroupList
   * @request GET:/list/group
   * @response `200` `GroupListData` OK
   * @response `500` `void` Internal Server Error
   */
  groupList = (params: RequestParams = {}) =>
    this.request<GroupListData, void>({
      path: `/list/group`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Fetch the list of challenge chat rooms.
   *
   * @tags Chat Rooms
   * @name ChallengeList
   * @request GET:/list/challenge
   * @response `200` `ChallengeListData` OK
   * @response `500` `void` Internal Server Error
   */
  challengeList = (params: RequestParams = {}) =>
    this.request<ChallengeListData, void>({
      path: `/list/challenge`,
      method: 'GET',
      ...params,
    });
}
