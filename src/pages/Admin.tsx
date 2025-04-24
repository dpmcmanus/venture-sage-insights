
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Database, Key, Users, Settings, Link } from "lucide-react";

const Admin = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-vc-blue" />
            <CardTitle>Data Integrations</CardTitle>
          </div>
          <CardDescription>
            Connect to external data sources to enrich your CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="api">
            <TabsList className="mb-4">
              <TabsTrigger value="api">API Keys</TabsTrigger>
              <TabsTrigger value="import">Data Import</TabsTrigger>
              <TabsTrigger value="export">Data Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="api">
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>PitchBook API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" value="••••••••••••••••" readOnly className="flex-1" />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>USPTO Patent API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" value="••••••••••••••••" readOnly className="flex-1" />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>OpenAI API Key</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter OpenAI API Key" className="flex-1" />
                      <Button>Save</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="import">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Google Sheets Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Sales Data Import</h4>
                        <p className="text-sm text-muted-foreground">
                          Import sales data from Google Sheets
                        </p>
                      </div>
                      <Button>Connect</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">CSV Upload</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Bulk Data Import</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload CSV files to import bulk data
                        </p>
                      </div>
                      <Button>Upload</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="export">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="rounded-full bg-vc-gray-light p-2">
                          <Database className="h-5 w-5 text-vc-blue" />
                        </div>
                        <h4 className="font-medium">Portfolio Data</h4>
                        <p className="text-xs text-muted-foreground">
                          Export all portfolio company data
                        </p>
                        <Button className="mt-2" variant="outline" size="sm">
                          Export CSV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="rounded-full bg-vc-gray-light p-2">
                          <Link className="h-5 w-5 text-vc-blue" />
                        </div>
                        <h4 className="font-medium">Deal Pipeline</h4>
                        <p className="text-xs text-muted-foreground">
                          Export all deal pipeline data
                        </p>
                        <Button className="mt-2" variant="outline" size="sm">
                          Export CSV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-vc-blue" />
              <CardTitle>User Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-vc-blue"></div>
                    <div>
                      <h4 className="font-medium">Alex Morgan</h4>
                      <p className="text-xs text-muted-foreground">alex@venturesage.com</p>
                    </div>
                  </div>
                  <div className="text-sm">Admin</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-vc-gray"></div>
                    <div>
                      <h4 className="font-medium">Sarah Lee</h4>
                      <p className="text-xs text-muted-foreground">sarah@venturesage.com</p>
                    </div>
                  </div>
                  <div className="text-sm">Partner</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-vc-gray"></div>
                    <div>
                      <h4 className="font-medium">James Wilson</h4>
                      <p className="text-xs text-muted-foreground">james@venturesage.com</p>
                    </div>
                  </div>
                  <div className="text-sm">Analyst</div>
                </div>
              </div>
              <Button className="w-full">Add New User</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-vc-blue" />
              <CardTitle>Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive email updates on portfolio changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI Insights</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable AI-generated insights and suggestions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Refresh Rate</Label>
                  <p className="text-xs text-muted-foreground">
                    How often to pull data from external sources
                  </p>
                </div>
                <Button variant="outline">Daily</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-vc-blue" />
            <CardTitle>Security Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Additional security for your account
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Timeout</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically log out after period of inactivity
                </p>
              </div>
              <Button variant="outline">30 minutes</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>API Access</Label>
                <p className="text-xs text-muted-foreground">
                  Allow external applications to access data via API
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
