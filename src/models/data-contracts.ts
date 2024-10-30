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

export type GroupListData = {
  roomId?: number;
  name?: string;
}[];

export type ChallengeListData = {
  roomId?: number;
  name?: string;
}[];

export type MessageDetailData = {
  messageId?: number;
  userId?: string;
  message?: string;
  /** @format date-time */
  timestamp?: string;
}[];

export interface CreateCreatePayload {
  roomName?: string;
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

export type RoomsDeleteData = any;
