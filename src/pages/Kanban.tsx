import { useState } from 'react'
import { MoreHorizontal, Plus, Clock, AlertCircle, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'

function LogOutButton() {
  const { logout } = useAuth()
  return (
    <Button variant="ghost" size="icon" onClick={logout} title="Sair do sistema" className="ml-2">
      <LogOut className="h-4 w-4 text-muted-foreground" />
    </Button>
  )
}

type Lead = {
  id: string
  name: string
  company: string
  value: string
  priority: 'Baixa' | 'Média' | 'Alta'
  lastContact: string
  avatarSeed: number
}

type Column = {
  id: string
  title: string
  color: string
  leads: Lead[]
}

const initialData: Column[] = [
  {
    id: 'c1',
    title: 'Prospecção',
    color: 'bg-slate-200 text-slate-700',
    leads: [
      {
        id: 'l1',
        name: 'Carlos Santos',
        company: 'TechNova',
        value: 'R$ 5k',
        priority: 'Média',
        lastContact: 'Há 2h',
        avatarSeed: 10,
      },
      {
        id: 'l2',
        name: 'Marina Lima',
        company: 'Estúdio Criativo',
        value: 'R$ 2k',
        priority: 'Baixa',
        lastContact: 'Há 1d',
        avatarSeed: 11,
      },
    ],
  },
  {
    id: 'c2',
    title: 'Qualificação',
    color: 'bg-blue-100 text-blue-700',
    leads: [
      {
        id: 'l3',
        name: 'Roberto Dias',
        company: 'Indústria BR',
        value: 'R$ 15k',
        priority: 'Alta',
        lastContact: 'Há 5h',
        avatarSeed: 12,
      },
    ],
  },
  {
    id: 'c3',
    title: 'Proposta',
    color: 'bg-amber-100 text-amber-700',
    leads: [
      {
        id: 'l4',
        name: 'Juliana Costa',
        company: 'Logística SA',
        value: 'R$ 8k',
        priority: 'Média',
        lastContact: 'Ontem',
        avatarSeed: 13,
      },
      {
        id: 'l5',
        name: 'Fernando Silva',
        company: 'Agro Export',
        value: 'R$ 22k',
        priority: 'Alta',
        lastContact: 'Hoje 09:00',
        avatarSeed: 14,
      },
    ],
  },
  {
    id: 'c4',
    title: 'Fechamento',
    color: 'bg-emerald-100 text-emerald-700',
    leads: [
      {
        id: 'l6',
        name: 'Patrícia Rocha',
        company: 'Varejo Bom',
        value: 'R$ 12k',
        priority: 'Média',
        lastContact: 'Hoje 11:30',
        avatarSeed: 15,
      },
    ],
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Alta':
      return 'bg-red-100 text-red-700 border-red-200'
    case 'Média':
      return 'bg-amber-100 text-amber-700 border-amber-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

export default function Kanban() {
  const [columns, setColumns] = useState(initialData)
  const { toast } = useToast()

  const handleDragStart = (e: React.DragEvent, leadId: string, sourceColId: string) => {
    e.dataTransfer.setData('leadId', leadId)
    e.dataTransfer.setData('sourceColId', sourceColId)
  }

  const handleDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault()
    const leadId = e.dataTransfer.getData('leadId')
    const sourceColId = e.dataTransfer.getData('sourceColId')

    if (sourceColId === targetColId) return

    setColumns((prevCols) => {
      const newCols = [...prevCols]
      const sourceColIndex = newCols.findIndex((c) => c.id === sourceColId)
      const targetColIndex = newCols.findIndex((c) => c.id === targetColId)

      const leadIndex = newCols[sourceColIndex].leads.findIndex((l) => l.id === leadId)
      const [movedLead] = newCols[sourceColIndex].leads.splice(leadIndex, 1)
      newCols[targetColIndex].leads.push(movedLead)

      return newCols
    })

    toast({
      title: 'Lead movido',
      description: 'O lead foi atualizado com sucesso.',
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kanban</h1>
          <p className="text-sm text-muted-foreground">Gerencie o pipeline de vendas.</p>
        </div>
        <div className="flex items-center">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Lead
          </Button>
          <LogOutButton />
        </div>
      </div>

      <ScrollArea className="flex-1 w-full rounded-md">
        <div className="flex gap-4 h-full pb-4 min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex flex-col w-[320px] bg-slate-50/50 rounded-lg border border-slate-200/60 p-3"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${column.color}`}>
                    {column.title}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {column.leads.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden p-1">
                {column.leads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id, column.id)}
                    className="bg-card p-3 rounded-md border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors animate-fade-in group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://img.usecurling.com/ppl/thumbnail?seed=${lead.avatarSeed}`}
                          />
                          <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{lead.company}</p>
                          <p className="text-xs text-muted-foreground mt-1">{lead.name}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${getPriorityColor(lead.priority)}`}
                      >
                        {lead.priority}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                      <span className="font-medium text-slate-700">{lead.value}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{lead.lastContact}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground border border-dashed border-transparent hover:border-border mt-1"
                >
                  <Plus className="h-4 w-4 mr-2" /> Adicionar
                </Button>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
