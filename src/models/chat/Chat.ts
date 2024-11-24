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

import {
  ChatDeleteData,
  CreateChallengeCreateData,
  CreateChallengeRoom,
  CreateChatRoom,
  CreateCreateData,
  ListChallengeListData,
  ListGroupListData,
  MessageDetailData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Chat<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Chat
   * @name CreateCreate
   * @summary 채팅방을 생성합니다.
   * @request POST:/chat/create
   * @response `201` `CreateCreateData` 생성된 채팅방 정보
   * @response `400` `void` 잘못된 요청 (헤더에 사용자 ID가 없거나 요청 본문이 유효하지 않을 경우)
   * @response `500` `void` 서버 오류 (채팅방 생성 실패 시)
   */
  createCreate = (data: CreateChatRoom, params: RequestParams = {}) =>
    this.request<CreateCreateData, void>({
      path: `/chat/create`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chat
   * @name ChatDelete
   * @summary 채팅방을 삭제합니다.
   * @request DELETE:/chat/{roomId}
   * @response `200` `ChatDeleteData` 삭제 성공 메시지
   * @response `500` `void` 서버 오류 (채팅방 삭제 실패 시)
   */
  chatDelete = (roomId: string, params: RequestParams = {}) =>
    this.request<ChatDeleteData, void>({
      path: `/chat/${roomId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chat
   * @name ListGroupList
   * @summary 그룹 채팅방 목록을 가져옵니다.
   * @request GET:/chat/list/group
   * @response `200` `ListGroupListData` 채팅방 목록 조회 성공
   * @response `400` `void` 잘못된 요청 (헤더에 사용자 ID가 없을 경우)
   * @response `500` `void` 서버 오류 (채팅방 목록 조회 실패 시)
   */
  listGroupList = (params: RequestParams = {}) =>
    this.request<ListGroupListData, void>({
      path: `/chat/list/group`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chat
   * @name ListChallengeList
   * @summary 챌린지 채팅방 목록을 가져옵니다.
   * @request GET:/chat/list/challenge
   * @response `200` `ListChallengeListData` 채팅방 목록 조회 성공
   * @response `400` `void` 잘못된 요청 (헤더에 사용자 ID가 없을 경우)
   * @response `500` `void` 서버 오류 (채팅방 목록 조회 실패 시)
   */
  listChallengeList = (params: RequestParams = {}) =>
    this.request<ListChallengeListData, void>({
      path: `/chat/list/challenge`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chat
   * @name MessageDetail
   * @summary 채팅방의 메시지를 가져옵니다.
   * @request GET:/chat/message/{roomId}
   * @response `200` `MessageDetailData` 채팅 메시지 목록 조회 성공
   * @response `500` `void` 서버 오류 (메시지 조회 실패 시)
   */
  messageDetail = (roomId: string, params: RequestParams = {}) =>
    this.request<MessageDetailData, void>({
      path: `/chat/message/${roomId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chat
   * @name CreateChallengeCreate
   * @summary 챌린지 채팅방을 생성합니다.
   * @request POST:/chat/create/challenge/{challengeId}
   * @response `201` `CreateChallengeCreateData` 생성된 챌린지 채팅방 정보
   * @response `400` `void` 잘못된 요청 (필수 필드 누락 시)
   * @response `500` `void` 서버 오류 (챌린지 채팅방 생성 실패 시)
   */
  createChallengeCreate = (challengeId: string, data: CreateChallengeRoom, params: RequestParams = {}) =>
    this.request<CreateChallengeCreateData, void>({
      path: `/chat/create/challenge/${challengeId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
