"use client"

import useConversation from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import moment from "moment"
import axios from "axios"
import { pusherClient } from "@/lib/pusherClient"
import { find } from "lodash"


type BodyProps = {
  initialItems: FullMessageType[]
}

const Body = ({ initialItems }: BodyProps) => {

  const [messages, setMessages] = useState<FullMessageType[]>(initialItems)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    const channel = pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      // console.log("new mess", message);

      axios.post(`/api/${conversationId}/seen`)

      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current
        }

        return [...current, message]
      })

      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (message: FullMessageType) => {
      // console.log("update mess", message)
      setMessages(current => current.map(currentMessage => {
        if (currentMessage.id === message.id) {
          return message
        }
        return currentMessage
      }))
    }

    channel.bind('message:new', messageHandler)
    channel.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      channel.unbind('message:new', messageHandler)
      channel.unbind('message:update', updateMessageHandler)
    }


  }, [conversationId])

  return (
    <>
      {messages.length == 0 ? (
        <div className="flex h-[85%] items-center justify-center text-gray-500">
          <span>Start a conversation</span>
        </div>
      ) : (
        <ScrollArea className="h-[85%] px-2 py-3">
          {messages.map((message, index) => {
            return (
              <MessageBox key={index} isLast={index === messages.length - 1} data={message} />
            )
          })}
          <div ref={bottomRef} className="pt-10"></div>
        </ScrollArea>
      )}
    </>
  )
}

export default Body