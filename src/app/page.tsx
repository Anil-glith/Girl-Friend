"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Character } from "@/components/character";
import { getAiResponse } from "@/app/actions";
import { Paperclip, SendHorizonal, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem("pastel-pal-chat");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        // Initial message from assistant
        setMessages([
          {
            role: "assistant",
            content: "Hello! How can I help you today? Let's have a wonderful chat!",
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to parse messages from localStorage", error);
      // set default message if parsing fails
      setMessages([
          {
            role: "assistant",
            content: "Hello! How can I help you today? Let's have a wonderful chat!",
          },
        ]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("pastel-pal-chat", JSON.stringify(messages));
    }
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello again! Ready for a fresh start?",
      },
    ]);
    localStorage.removeItem("pastel-pal-chat");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const chatHistory = [...messages, userMessage].map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const result = await getAiResponse({ userInput: input, chatHistory });
    setIsLoading(false);

    if (result.success && result.response) {
      const assistantMessage: Message = {
        role: "assistant",
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      const errorMessage: Message = {
        role: "assistant",
        content: "Oh no, something went wrong. I couldn't get a response. Please try again!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <main className="flex h-screen w-full bg-background overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-primary/10 relative">
        <Character />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 h-screen">
        <div className="flex-1 flex flex-col p-4 md:p-6 bg-background/80 backdrop-blur-sm">
            <Card className="flex flex-col h-full w-full border-0 shadow-none bg-transparent">
              <CardHeader className="flex flex-row items-center justify-between p-2">
                 <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="anime girl" alt="Pastel Pal" />
                      <AvatarFallback>PP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-medium font-headline text-foreground">Pastel Pal</p>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                <Button variant="ghost" size="icon" onClick={handleClearChat} aria-label="Clear chat history">
                    <Trash2 className="h-5 w-5 text-muted-foreground" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 p-2 overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                            "flex items-end gap-2",
                            message.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            {message.role === "assistant" && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="anime girl" alt="Pastel Pal" />
                                <AvatarFallback>PP</AvatarFallback>
                            </Avatar>
                            )}
                            <div
                            className={cn(
                                "max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-md",
                                message.role === "user"
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-card border rounded-bl-none"
                            )}
                            >
                                <p>{message.content}</p>
                            </div>
                        </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="anime girl" alt="Pastel Pal" />
                                    <AvatarFallback>PP</AvatarFallback>
                                </Avatar>
                                <div className="max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-md bg-card border rounded-bl-none">
                                    <div className="flex items-center space-x-1">
                                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-2 pt-4">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <div className="relative flex-1">
                      <Textarea
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                        rows={1}
                        className="pr-12 min-h-[48px] rounded-2xl resize-none"
                        disabled={isLoading}
                      />
                      <Button type="button" size="icon" variant="ghost" className="absolute top-1/2 right-2 -translate-y-1/2">
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>
                    <Button type="submit" size="icon" className="rounded-full w-12 h-12" disabled={isLoading || !input.trim()}>
                        <SendHorizonal className="h-5 w-5" />
                    </Button>
                </form>
              </CardFooter>
            </Card>
        </div>
      </div>
    </main>
  );
}
