import { Bell, Shield, User, Smartphone, Link as LinkIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie suas preferências de conta e sistema.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-transparent p-0 border-b rounded-none h-auto">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 pt-2 px-4 shadow-none"
          >
            <User className="h-4 w-4 mr-2" /> Perfil
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 pt-2 px-4 shadow-none"
          >
            <Bell className="h-4 w-4 mr-2" /> Notificações
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 pt-2 px-4 shadow-none"
          >
            <LinkIcon className="h-4 w-4 mr-2" /> Integrações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 animate-fade-in">
          <Card className="border-muted shadow-sm">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados de contato e perfil.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input id="firstName" defaultValue="João" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input id="lastName" defaultValue="Dias" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="joao.dias@empresa.com" />
              </div>
              <Button>Salvar alterações</Button>
            </CardContent>
          </Card>

          <Card className="border-muted shadow-sm">
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie sua senha e autenticação.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Autenticação em Duas Etapas (2FA)</p>
                    <p className="text-xs text-muted-foreground">
                      Adiciona uma camada extra de segurança à sua conta.
                    </p>
                  </div>
                </div>
                <Button variant="outline">Ativar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 animate-fade-in">
          <Card className="border-muted shadow-sm">
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Escolha como deseja ser alertado.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Alertas do Sistema</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novos Leads</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba um alerta quando um novo lead for atribuído a você.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mensagens do WhatsApp</Label>
                    <p className="text-xs text-muted-foreground">
                      Notificações para novas mensagens não lidas.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 animate-fade-in">
          <Card className="border-muted shadow-sm">
            <CardHeader>
              <CardTitle>Aplicativos Conectados</CardTitle>
              <CardDescription>Gerencie as integrações com serviços externos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-green-100 rounded flex items-center justify-center text-green-600">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">WhatsApp Business API</p>
                    <p className="text-xs text-muted-foreground">
                      Conectado como +55 11 99999-9999
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Desconectar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
