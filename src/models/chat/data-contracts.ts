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

export interface ChatRoom {
  roomId: string;
  roomName: string;
  roomType: 'group' | 'challenge';
}

export interface CreateChatRoom {
  roomName: string;
  type: 'group' | 'challenge';
  /** 참여자 ID 목록 */
  participants: string[];
}

export interface CreateChallengeRoom {
  roomName: string;
  type: string;
  /** room owner's ID */
  owner: string;
}

type MessageType = 'text' | 'image' | 'submission';

export interface ChatBase {
  messageId: string;
  roomId: string;
  /** message sender ID */
  senderId: string;
  /** @format date-time */
  timestamp: string;
  type: MessageType;
}

export interface ChatMessageProps extends ChatBase {
  type: 'text';
  content: string;
}

export interface ChatImageProps extends ChatBase {
  type: 'image';
  src: string;
}

export interface ChatSubmissionProps extends ChatBase {
  type: 'submission';
  description: string;
  title: string;
  src?: string;
}

export type MessageData = ChatMessageProps | ChatImageProps | ChatSubmissionProps;

export interface DeleteRoomResponse {
  message: string;
}

export interface UploadImageResponse {
  success: boolean;
  imageUrl: string;
  /** optional data */
  data?: Record<string, any>;
}

export interface UpdateImageStatusRequest {
  imageId: string;
  /** 'accepted' or 'rejected' */
  status: 'accepted' | 'rejected';
}

export interface UpdateImageStatusResponse {
  /** success flag */
  success: boolean;
  /** updated data */
  data: Record<string, any>;
}

export type CreateCreateData = ChatRoom;

export interface PostChatPayload {
  /** 추가할 채팅방 ID */
  roomId?: string;
  /** 추가할 사용자 ID 목록 */
  participants?: string[];
}

export interface PostChatData {
  /** @example "Participants added successfully" */
  message?: string;
}

export type PostChatError =
  | {
      /** @example "Invalid request data" */
      message?: string;
    }
  | {
      /** @example "Failed to add participants" */
      message?: string;
    };

export type ChatDeleteData = DeleteRoomResponse;

export type ListGroupListData = ChatRoom[];

export type ListChallengeListData = ChatRoom[];

export type MessageListData = MessageData[];

export type CreateChallengeCreateData = ChatRoom;

export interface UploadCreatePayload {
  image: File;
  roomId: string;
}

export type UploadCreateData = UploadImageResponse;

export interface MissionUploadCreatePayload {
  image: File;
  roomId: string;
}

export type MissionUploadCreateData = UploadImageResponse;

export type MissionConfirmCreateData = UpdateImageStatusResponse;
