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

export type GroupListData = any;

export type ChallengeListData = any;

export type MessageDetailData = any;

export interface CreateCreatePayload {
  roomName: string;
  type?: string;
  participants?: string[];
}

export type CreateCreateData = any;

export interface ChallengeCreatePayload {
  roomName?: string;
  type?: string;
  owner?: string;
}

export type ChallengeCreateData = any;

export interface UploadCreatePayload {
  roomId?: string;
}

export type UploadCreateData = any;

export interface UploadCreateBody {
  roomId?: string;
  userId?: string;
}

export type UploadCreateResult = any;

export interface ConfirmCreatePayload {
  imageId?: string;
  status?: string;
}

export type ConfirmCreateData = any;
