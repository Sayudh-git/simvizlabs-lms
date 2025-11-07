import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SidebarLeft } from "@/components/sidebar-left"

export default function SettingsPage() {
  return (
    <SidebarProvider>
    <SidebarLeft />
    <SidebarInset className="py-4">

    <div className="top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
    <h1 className="text-3xl font-bold">User Settings</h1>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Profile Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Pranjal Katiyar" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Learning Preferences</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable dark mode</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Auto-play next module</Label>
            <Switch defaultChecked />
          </div>
          <Button className="mt-4">Update Preferences</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Notifications</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Email updates</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Course reminders</Label>
            <Switch />
          </div>
          <Button className="mt-4">Save Notification Settings</Button>
        </CardContent>
      </Card>

      {/* Password Reset */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Change Password</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <Button className="mt-4">Update Password</Button>
        </CardContent>
      </Card>
    </div>
    </SidebarInset>
    </SidebarProvider>

  )
}