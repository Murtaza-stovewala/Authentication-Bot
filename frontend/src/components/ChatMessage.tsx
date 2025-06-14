"use client";

import * as React from 'react';
import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  const [initials, setInitials] = React.useState('');

  React.useEffect(() => {
    if (message.sender === 'user' && message.name) {
      setInitials(message.name.substring(0, 2).toUpperCase());
    }
  }, [message.name, message.sender]);


  return (
    <div className={cn(
      "flex items-end gap-2 max-w-[75%] p-1 message-enter",
      isUser ? "self-end flex-row-reverse" : "self-start"
    )}>
      <Avatar className="h-8 w-8">
        {isUser && message.avatar ? <AvatarImage src={message.avatar} alt={message.name} /> : null}
        <AvatarFallback className={cn(
          "text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {isUser ? initials : <Bot size={18} />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-lg px-4 py-2 shadow-md",
          isUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <p className={cn(
          "text-xs mt-1",
          isUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

// Add this to trigger animation after mount
// This is a bit of a hack for simple CSS transitions on new elements
// In a real app, consider react-transition-group or framer-motion
if (typeof document !== 'undefined') {
  setTimeout(() => {
    const messages = document.querySelectorAll('.message-enter');
    messages.forEach(msg => msg.classList.add('message-enter-active'));
  }, 50);
}
