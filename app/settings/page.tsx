import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Lock, User, Palette, BellRing, Mail, Shield, LogOut } from "lucide-react"

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
        icon={<Lock className="h-5 w-5" />}
      />

      <ContentGrid>
        <MainContent fullWidth>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden md:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden md:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden md:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="account" className="space-y-6">
                <SectionContainer>
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account information and profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="johndoe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-0 flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </SectionContainer>

                <SectionContainer>
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="px-0">
                    <Button>Update Password</Button>
                  </CardFooter>
                </SectionContainer>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <SectionContainer>
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Customize the appearance of the application</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Color Theme</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dense-mode">Dense Mode</Label>
                        <p className="text-sm text-muted-foreground">Compact the user interface to show more content</p>
                      </div>
                      <Switch id="dense-mode" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Animations</Label>
                        <p className="text-sm text-muted-foreground">Enable animations and transitions</p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter className="px-0">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </SectionContainer>

                <SectionContainer>
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Dashboard Layout</CardTitle>
                    <CardDescription>Customize your dashboard layout and widgets</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Recent Matches</Label>
                        <p className="text-sm text-muted-foreground">Display recent matches on your dashboard</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Team Insights</Label>
                        <p className="text-sm text-muted-foreground">Display team insights on your dashboard</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Performance Chart</Label>
                        <p className="text-sm text-muted-foreground">Display performance chart on your dashboard</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter className="px-0">
                    <Button>Save Layout</Button>
                  </CardFooter>
                </SectionContainer>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <SectionContainer>
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose what notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellRing className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                          <Label>Match Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about upcoming and completed matches
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email updates about your account and predictions
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Notification Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="px-0">
                    <Button>Save Notification Settings</Button>
                  </CardFooter>
                </SectionContainer>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <SectionContainer>
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Manage your privacy and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Control who can see your profile and predictions
                        </p>
                      </div>
                      <Select defaultValue="friends">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Usage</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to use your data to improve our services
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter className="px-0 flex justify-between">
                    <Button variant="destructive">Delete Account</Button>
                    <Button>Save Privacy Settings</Button>
                  </CardFooter>
                </SectionContainer>

                <SectionContainer>
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>Manage your active sessions and devices</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-sm text-muted-foreground">Active now • New York, USA</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Sign Out
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Safari on iPhone</p>
                          <p className="text-sm text-muted-foreground">Last active 2 hours ago • Boston, USA</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Sign Out
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Firefox on MacBook</p>
                          <p className="text-sm text-muted-foreground">Last active 5 days ago • San Francisco, USA</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-0">
                    <Button variant="outline" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out From All Devices
                    </Button>
                  </CardFooter>
                </SectionContainer>
              </TabsContent>
            </div>
          </Tabs>
        </MainContent>
      </ContentGrid>
    </PageContainer>
  )
}
