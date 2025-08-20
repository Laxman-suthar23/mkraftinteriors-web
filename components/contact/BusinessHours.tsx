"use client";

import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FadeIn from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/config/site";

export default function BusinessHours() {
  // Get the full weekday name in lowercase, e.g. "monday"
  const getCurrentDay = () => {
    return new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
  };

  const currentDay = getCurrentDay();

  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Business Hours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(siteConfig.businessHours).map(([day, hours]) => {
              const isToday = day.toLowerCase() === currentDay;
              const isClosed = hours === "Closed";

              return (
                <div
                  key={day}
                  className={`flex justify-between items-center py-2 px-3 rounded-lg transition-colors ${
                    isToday ? "bg-primary/10 border border-primary/20" : ""
                  }`}
                >
                  <span
                    className={`capitalize font-medium ${
                      isToday ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {day}
                    {isToday && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        Today
                      </span>
                    )}
                  </span>
                  <span
                    className={`${
                      isClosed
                        ? "text-red-500"
                        : isToday
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {hours}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              For urgent inquiries outside business hours, please send us an email{" "}
              and we'll get back to you as soon as possible.
            </p>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
