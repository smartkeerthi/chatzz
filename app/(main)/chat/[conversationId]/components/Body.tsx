"use client"

import useConversation from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"


type BodyProps = {
  initialItems: FullMessageType[]
}

const Body = ({ initialItems }: BodyProps) => {

  const [messages, setMessages] = useState<FullMessageType[]>(initialItems)
  const bottomRef = useRef<HTMLDivElement>(null)
  const conversationId = useConversation()

  useEffect(() => {
    bottomRef?.current?.scrollIntoView()
    console.log(messages);

  }, [conversationId])

  return (
    <>
      {messages.length == 0 ? (
        <div className="flex h-[85%] items-center justify-center text-gray-500">
          <span>Start a conversation</span>
        </div>
      ) : (
        <ScrollArea className="h-[85%] px-2 py-3">
          {messages.map((message, index) => (
            <MessageBox key={index} isLast={index === messages.length - 1} data={message} />
          ))}
          <div ref={bottomRef} className="pt-4"></div>
        </ScrollArea>
      )}
    </>
  )
}

export default Body