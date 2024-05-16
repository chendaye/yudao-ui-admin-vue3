import request from '@/config/axios'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { getAccessToken } from '@/utils/auth'
import { config } from '@/config/axios/config'

// 聊天VO
export interface ChatMessageVO {
  id: number // 编号
  conversationId: number // 会话编号
  type: string // 消息类型
  userId: string // 用户编号
  roleId: string // 角色编号
  model: number // 模型标志
  modelId: number // 模型编号
  content: string // 聊天内容
  tokens: number // 消耗 Token 数量
  createTime: Date // 创建时间
}

export interface ChatMessageSendVO {
  conversationId: string // 会话编号
  content: number // 聊天内容
}

// AI chat 聊天
export const ChatMessageApi = {
  // 消息列表
  messageList: async (conversationId: string | null) => {
    return await request.get({
      url: `/ai/chat/message/list-by-conversation-id?conversationId=${conversationId}`
    })
  },

  // 发送 send stream 消息
  // TODO axios 可以么？ https://apifox.com/apiskills/how-to-create-axios-stream/
  sendStream: async (
    conversationId: number,
    content: string,
    ctrl,
    onMessage,
    onError,
    onClose
  ) => {
    const token = getAccessToken()
    return fetchEventSource(`${config.base_url}/ai/chat/message/send-stream`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      openWhenHidden: true,
      body: JSON.stringify({
        conversationId,
        content
      }),
      onmessage: onMessage,
      onerror: onError,
      onclose: onClose,
      signal: ctrl.signal
    })
  },

  // 发送 send 消息
  delete: async (id: string) => {
    return await request.delete({ url: `/ai/chat/message/delete?id=${id}` })
  }
}
