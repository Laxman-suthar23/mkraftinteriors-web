"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, AlertTriangle, Smartphone } from "lucide-react";

interface SecuritySettingsData {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
  ipWhitelist: string;
  backupCodes: boolean;
}

export default function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [sessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Los Angeles, CA',
      lastActive: '2024-01-15 14:30',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Los Angeles, CA',
      lastActive: '2024-01-14 09:15',
      current: false,
    },
  ]);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SecuritySettingsData>({
    defaultValues: {
      twoFactorEnabled: false,
      loginNotifications: true,
      sessionTimeout: 30,
      ipWhitelist: '',
      backupCodes: false,
    }
  });

  const twoFactorEnabled = watch("twoFactorEnabled");

  const onSubmit = async (data: SecuritySettingsData) => {
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/settings/security', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update security settings');
      }

      setStatus({
        type: 'success',
        message: 'Security settings updated successfully'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to update security settings'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const enableTwoFactor = async () => {
    try {
      const response = await fetch('/api/admin/auth/2fa/setup', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to setup 2FA');
      }

      const data = await response.json();
      // Handle QR code display logic here
      console.log('2FA Setup:', data);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to setup two-factor authentication'
      });
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/admin/auth/sessions/${sessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to revoke session');
      }

      setStatus({
        type: 'success',
        message: 'Session revoked successfully'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to revoke session'
      });
    }
  };

  return (
    <div className="space-y-8">
      {status && (
        <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Two-Factor Authentication</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  {...register("twoFactorEnabled")}
                  onCheckedChange={(checked: any) => {
                    if (checked) {
                      enableTwoFactor();
                    }
                  }}
                />
                {twoFactorEnabled && (
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                )}
              </div>
            </div>

            {twoFactorEnabled && (
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center space-x-2 mb-3">
                  <Key className="h-4 w-4" />
                  <span className="font-medium">Backup Codes</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Store these backup codes in a secure location. Each code can only be used once.
                </p>
                <Button type="button" variant="outline" size="sm">
                  Generate New Backup Codes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone signs into your account
                </p>
              </div>
              <Switch {...register("loginNotifications")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                {...register("sessionTimeout", { 
                  required: "Session timeout is required",
                  min: { value: 5, message: "Minimum 5 minutes" },
                  max: { value: 480, message: "Maximum 8 hours" },
                  valueAsNumber: true
                })}
                placeholder="30"
              />
              {errors.sessionTimeout && (
                <p className="text-sm text-red-500">{errors.sessionTimeout.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Automatically log out after period of inactivity
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ipWhitelist">IP Whitelist (optional)</Label>
              <Input
                id="ipWhitelist"
                {...register("ipWhitelist")}
                placeholder="192.168.1.1, 10.0.0.1"
              />
              <p className="text-sm text-muted-foreground">
                Comma-separated list of IP addresses allowed to access admin panel
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage devices that are currently signed into your account
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && (
                        <Badge variant="outline" className="text-green-600">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.location} • Last active: {session.lastActive}
                    </p>
                  </div>
                  {!session.current && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => revokeSession(session.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-200">
                    Security Tip
                  </p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    If you see any unfamiliar activity, revoke those sessions and change your password immediately.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Security Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
