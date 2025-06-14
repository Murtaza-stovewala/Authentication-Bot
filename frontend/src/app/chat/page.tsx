
"use client";

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from '@/components/ChatMessage';
import { getUser, UserProfile, clearUser } from '@/lib/auth';
import type { Message } from '@/types/chat';
import { SendHorizonal, LogOut } from 'lucide-react';
import { useInactivityTimeout } from '@/hooks/useInactivityTimeout';
import { useToast } from '@/hooks/use-toast';

const CHAT_INACTIVITY_MESSAGE_TIMEOUT_MS = 1 * 60 * 1000; // 1 minute

export default function ChatPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [awaitingMobileNumber, setAwaitingMobileNumber] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const chatInactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useInactivityTimeout(); 

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.replace('/register');
    } else {
      setCurrentUser(user);
      setMessages([
        { 
          id: crypto.randomUUID(), 
          text: `Hello ${user.name}! How can I help you today?`, 
          sender: 'bot', 
          timestamp: Date.now() 
        }
      ]);
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     setTimeout(() => {
      const messageElements = document.querySelectorAll('.message-enter:not(.message-enter-active)');
      messageElements.forEach(msg => msg.classList.add('message-enter-active'));
    }, 50);
  }, [messages]);

  // Effect for 1-minute chat inactivity message
  useEffect(() => {
    if (chatInactivityTimerRef.current) {
      clearTimeout(chatInactivityTimerRef.current);
      chatInactivityTimerRef.current = null;
    }

    if (messages.length > 0 && currentUser) {
      const lastMessage = messages[messages.length - 1];
      // Don't restart timer if the last message was already the inactivity warning
      if (lastMessage.sender === 'bot' && lastMessage.text === "👉 Closing chat due to inactivity") {
        return;
      }

      chatInactivityTimerRef.current = setTimeout(() => {
        if (currentUser) { // Ensure user is still logged in
          const inactivityBotMessage: Message = {
            id: crypto.randomUUID(),
            text: '👉 Closing chat due to inactivity',
            sender: 'bot',
            timestamp: Date.now(),
          };
          setMessages(prevMessages => {
            const latestMsg = prevMessages[prevMessages.length - 1];
            // Prevent adding duplicate inactivity messages
            if (latestMsg && latestMsg.sender === 'bot' && latestMsg.text === inactivityBotMessage.text) {
              return prevMessages;
            }
            return [...prevMessages, inactivityBotMessage];
          });
        }
      }, CHAT_INACTIVITY_MESSAGE_TIMEOUT_MS);
    }

    return () => {
      if (chatInactivityTimerRef.current) {
        clearTimeout(chatInactivityTimerRef.current);
        chatInactivityTimerRef.current = null;
      }
    };
  }, [messages, currentUser, setMessages]);


  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: 'user',
      timestamp: Date.now(),
      name: currentUser.name,
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    const currentInputText = newMessage.trim();
    const currentInputLower = currentInputText.toLowerCase();
    setNewMessage('');

    let botResponseText = '';

    if (awaitingMobileNumber) {
      if (currentInputText === currentUser.mobileNumber) {
        botResponseText = "Thanks";
      } else {
        botResponseText = "Number not match";
      }
      setAwaitingMobileNumber(false); 
    } else if (currentInputLower === 'hi' || currentInputLower === 'hii' || currentInputLower === 'hello' || currentInputLower === 'hey') {
      botResponseText = "👉 Welcome to Demo test server, Please enter your Number for Authentication";
      setAwaitingMobileNumber(true); 
    } else {
      botResponseText = `Thanks for your message, ${currentUser.name}! I'm processing: "${userMessage.text.substring(0,20)}..."`;
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        text: botResponseText,
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500); 
  };

  const handleLogout = () => {
    clearUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.replace('/register');
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-foreground">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] w-full max-w-2xl">
      <Card className="flex flex-col flex-grow shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-headline text-primary">Chat with Bot</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut size={18} className="mr-2" /> Logout
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
              aria-label="Chat message input"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
