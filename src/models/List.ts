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
   * @description Returns a list of all group chat rooms.
   *
   * @tags Chat Rooms
   * @name GroupList
   * @summary Get a list of group chat rooms
   * @request GET:/list/group
   * @response `200` `GroupListData` A list of group chat rooms
   * @response `500` `void` Failed to get chat list
   */
  groupList = (params: RequestParams = {}) =>
    this.request<GroupListData, void>({
      path: `/list/group`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Returns a list of all challenge chat rooms.
   *
   * @tags Chat Rooms
   * @name ChallengeList
   * @summary Get a list of challenge chat rooms
   * @request GET:/list/challenge
   * @response `200` `ChallengeListData` A list of challenge chat rooms
   * @response `500` `void` Failed to get chat list
   */
  challengeList = (params: RequestParams = {}) =>
    this.request<ChallengeListData, void>({
      path: `/list/challenge`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
