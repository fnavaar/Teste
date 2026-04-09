import { Users, MessageCircle, DollarSign, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const kpis = [
  { title: 'Novos Leads', value: '24', change: '+12%', icon: Users, trend: 'up' },
  { title: 'Conversas Ativas', value: '143', change: '+5%', icon: MessageCircle, trend: 'up' },
  { title: 'Vendas do Mês', value: 'R$ 45.231', change: '+18%', icon: DollarSign, trend: 'up' },
  { title: 'Taxa de Conversão', value: '8.4%', change: '-2%', icon: TrendingUp, trend: 'down' },
]

const activities = [
  {
    id: 1,
    user: 'Ana Silva',
    action: 'moveu',
    target: 'Tech Solutions',
    to: 'Proposta',
    time: 'Há 10 min',
  },
  {
    id: 2,
    user: 'Você',
    action: 'enviou mensagem para',
    target: 'Carlos Mendes',
    to: '',
    time: 'Há 45 min',
  },
  {
    id: 3,
    user: 'Sistema',
    action: 'criou novo lead',
    target: 'Marketing Digital Ltda',
    to: '',
    time: 'Há 2 horas',
  },
  {
    id: 4,
    user: 'Pedro Costa',
    action: 'fechou venda com',
    target: 'Supermercado Central',
    to: '',
    time: 'Há 3 horas',
  },
]

export default function Index() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Olá, João! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Aqui está o resumo do seu dia. Você tem 5 tarefas pendentes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            Relatórios
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Lead
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="shadow-sm border-muted">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p
                className={`text-xs mt-1 ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}
              >
                {kpi.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 shadow-sm border-muted">
          <CardHeader>
            <CardTitle className="text-lg">Próximos Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 5}`}
                      />
                      <AvatarFallback>LD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Empresa Exemplo {i}</p>
                      <p className="text-xs text-muted-foreground">Reunião de alinhamento</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      Hoje 14:00
                    </Badge>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 shadow-sm border-muted">
          <CardHeader>
            <CardTitle className="text-lg">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {activity.id !== activities.length && (
                      <div className="absolute top-3 left-[3px] h-full w-[2px] bg-border" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium text-foreground">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium text-foreground">{activity.target}</span>
                      {activity.to && (
                        <span className="text-muted-foreground">
                          {' '}
                          para <span className="font-medium text-foreground">{activity.to}</span>
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
