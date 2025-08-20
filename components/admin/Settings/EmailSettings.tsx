"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Send } from "lucide-react";

interface EmailSettingsData {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  replyToEmail: string;
  enableNotifications: boolean;
  enableAutoReply: boolean;
  notificationEmail: string;
}

export default function EmailSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<EmailSettingsData>({
    defaultValues: {
      smtpHost: process.env.NEXT_PUBLIC_SMTP_HOST || '',
      smtpPort: 587,
      smtpUsername: process.env.NEXT_PUBLIC_SMTP_USERNAME || '',
      fromEmail: 'info@karniinteriors.com',
      fromName: 'Karni Interiors',
      replyToEmail: 'info@karniinteriors.com',
      enableNotifications: true,
      enableAutoReply: true,
      notificationEmail: 'admin@karniinteriors.com',
    }
  });

  const onSubmit = async (data: EmailSettingsData) => {
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/settings/email', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update email settings');
      }

      setStatus({
        type: 'success',
        message: 'Email settings updated successfully'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to update email settings'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailConnection = async () => {
    setIsTesting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/settings/email/test', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Email test failed');
      }

      setStatus({
        type: 'success',
        message: 'Test email sent successfully'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send test email'
      });
    } finally {
      setIsTesting(false);
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
        {/* SMTP Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>SMTP Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  {...register("smtpHost", { required: "SMTP Host is required" })}
                  placeholder="smtp.gmail.com"
                />
                {errors.smtpHost && (
                  <p className="text-sm text-red-500">{errors.smtpHost.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  type="number"
                  {...register("smtpPort", { 
                    required: "SMTP Port is required",
                    valueAsNumber: true
                  })}
                  placeholder="587"
                />
                {errors.smtpPort && (
                  <p className="text-sm text-red-500">{errors.smtpPort.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input
                  id="smtpUsername"
                  {...register("smtpUsername", { required: "SMTP Username is required" })}
                  placeholder="your-email@gmail.com"
                />
                {errors.smtpUsername && (
                  <p className="text-sm text-red-500">{errors.smtpUsername.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  {...register("smtpPassword", { required: "SMTP Password is required" })}
                  placeholder="••••••••"
                />
                {errors.smtpPassword && (
                  <p className="text-sm text-red-500">{errors.smtpPassword.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={testEmailConnection}
                disabled={isTesting}
                className="flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  {...register("fromEmail", { 
                    required: "From Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="info@karniinteriors.com"
                />
                {errors.fromEmail && (
                  <p className="text-sm text-red-500">{errors.fromEmail.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  {...register("fromName", { required: "From Name is required" })}
                  placeholder="Karni Interiors"
                />
                {errors.fromName && (
                  <p className="text-sm text-red-500">{errors.fromName.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="replyToEmail">Reply-To Email</Label>
                <Input
                  id="replyToEmail"
                  type="email"
                  {...register("replyToEmail", { 
                    required: "Reply-To Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="info@karniinteriors.com"
                />
                {errors.replyToEmail && (
                  <p className="text-sm text-red-500">{errors.replyToEmail.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  {...register("notificationEmail", { 
                    required: "Notification Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="admin@karniinteriors.com"
                />
                {errors.notificationEmail && (
                  <p className="text-sm text-red-500">{errors.notificationEmail.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for new contact submissions
                </p>
              </div>
              <Switch {...register("enableNotifications")} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Reply</Label>
                <p className="text-sm text-muted-foreground">
                  Send automatic confirmation emails to clients
                </p>
              </div>
              <Switch {...register("enableAutoReply")} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Email Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
