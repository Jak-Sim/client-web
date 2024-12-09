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
  MissionConfirmCreateData,
  MissionUploadCreateData,
  MissionUploadCreatePayload,
  UpdateImageStatusRequest,
  UploadCreateData,
  UploadCreatePayload,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Image<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Image
   * @name UploadCreate
   * @summary 일반 채팅방에 이미지를 업로드합니다.
   * @request POST:/image/upload
   * @response `200` `UploadCreateData` 이미지 업로드 성공
   * @response `400` `void` 필수 필드 누락 또는 파일 업로드 오류
   * @response `500` `void` 서버 오류
   */
  uploadCreate = (data?: UploadCreatePayload, params: RequestParams = {}) =>
    this.request<UploadCreateData, void>({
      path: `/image/upload`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Image
   * @name MissionUploadCreate
   * @summary 챌린지 채팅방에 이미지를 업로드합니다.
   * @request POST:/image/mission/upload
   * @response `200` `MissionUploadCreateData` 챌린지 이미지 업로드 성공
   * @response `400` `void` 필수 필드 누락 또는 파일 업로드 오류
   * @response `500` `void` 서버 오류
   */
  missionUploadCreate = (data?: MissionUploadCreatePayload, params: RequestParams = {}) =>
    this.request<MissionUploadCreateData, void>({
      path: `/image/mission/upload`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Image
   * @name MissionConfirmCreate
   * @summary 챌린지 이미지의 상태를 업데이트합니다.
   * @request POST:/image/mission/confirm
   * @response `200` `MissionConfirmCreateData` 이미지 상태 업데이트 성공
   * @response `400` `void` 잘못된 요청 (필수 필드 누락 또는 유효하지 않은 상태값)
   * @response `500` `void` 서버 오류
   */
  missionConfirmCreate = (data: UpdateImageStatusRequest, params: RequestParams = {}) =>
    this.request<MissionConfirmCreateData, void>({
      path: `/image/mission/confirm`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
