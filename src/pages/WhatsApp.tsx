import { useState } from 'react'
import { Search, MoreVertical, Paperclip, Send, CheckCheck, Phone, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const contacts = [
  {
    id: 1,
    name: 'Carlos Silva',
    company: 'TechNova',
    lastMsg: 'Podemos fechar negócio amanhã.',
    time: '10:42',
    unread: 2,
    online: true,
    seed: 10,
  },
  {
    id: 2,
    name: 'Ana Paula',
    company: 'Inova Soluções',
    lastMsg: 'Vou analisar a proposta.',
    time: 'Ontem',
    unread: 0,
    online: false,
    seed: 20,
  },
  {
    id: 3,
    name: 'Roberto Dias',
    company: 'Comércio Plus',
    lastMsg: 'Ok, combinado.',
    time: 'Segunda',
    unread: 0,
    online: true,
    seed: 30,
  },
  {
    id: 4,
    name: 'Juliana Costa',
    company: 'Logística SA',
    lastMsg: 'Pode me enviar o PDF novamente?',
    time: '09:15',
    unread: 1,
    online: false,
    seed: 40,
  },
  {
    id: 5,
    name: 'Marcos Paulo',
    company: 'Agro Export',
    lastMsg: 'Obrigado pelo retorno.',
    time: '08:30',
    unread: 0,
    online: false,
    seed: 50,
  },
]

const messages = [
  {
    id: 1,
    text: 'Olá Carlos, tudo bem? Conseguiu analisar nossa proposta?',
    time: '10:30',
    isMe: true,
  },
  { id: 2, text: 'Oi! Tudo ótimo. Sim, dei uma olhada.', time: '10:35', isMe: false },
  {
    id: 3,
    text: 'Achei as condições muito boas. Podemos fechar negócio amanhã.',
    time: '10:42',
    isMe: false,
  },
]

export default function WhatsApp() {
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [msgInput, setMsgInput] = useState('')

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-card border rounded-xl shadow-sm overflow-hidden animate-fade-in">
      {/* Sidebar List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col border-r bg-slate-50/50 hidden md:flex shrink-0">
        <div className="p-4 border-b bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Conversas</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar contatos..." className="pl-9 bg-background" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors',
                  activeContact.id === contact.id
                    ? 'bg-primary/10 hover:bg-primary/15'
                    : 'hover:bg-accent',
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?seed=${contact.seed}`}
                    />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background bg-green-500 rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-medium text-sm truncate">{contact.name}</span>
                    <span className="text-[10px] text-muted-foreground ml-2 shrink-0">
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground truncate">
                      {contact.lastMsg}
                    </span>
                    {contact.unread > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={`https://img.usecurling.com/ppl/thumbnail?seed=${activeContact.seed}`}
              />
              <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium leading-none">{activeContact.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {activeContact.company} •{' '}
                {activeContact.online ? 'Online' : 'Visto por último hoje'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Video className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                Hoje
              </span>
            </div>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex flex-col max-w-[75%] sm:max-w-[60%]',
                  msg.isMe ? 'self-end items-end' : 'self-start items-start',
                )}
              >
                <div
                  className={cn(
                    'px-4 py-2 rounded-2xl shadow-sm text-sm',
                    msg.isMe
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-card border rounded-tl-sm',
                  )}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  {msg.isMe && <CheckCheck className="h-3 w-3 text-blue-500" />}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="p-4 bg-card border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Digite uma mensagem..."
              className="flex-1 bg-muted/50 border-transparent focus-visible:ring-1"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && msgInput) setMsgInput('')
              }}
            />
            <Button
              size="icon"
              className={cn(
                'shrink-0 transition-all',
                msgInput
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted',
              )}
              disabled={!msgInput}
            >
              <Send className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
