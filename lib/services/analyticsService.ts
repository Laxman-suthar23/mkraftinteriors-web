class AnalyticsService {
  private baseUrl = "/api/analytics";

  async trackPageView(page: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/page-view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }

  async trackEvent(event: string, data?: Record<string, any>): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          event, 
          data, 
          timestamp: new Date().toISOString() 
        }),
      });
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  }

  async trackProjectView(projectId: string): Promise<void> {
    await this.trackEvent("project_view", { projectId });
  }

  async trackContactSubmission(formData: any): Promise<void> {
    await this.trackEvent("contact_submission", {
      projectType: formData.projectType,
      hasPhone: !!formData.phone,
    });
  }

  async getStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`);
      if (!response.ok) {
        throw new Error("Failed to fetch analytics stats");
      }
      return response.json();
    } catch (error) {
      console.error("Failed to get analytics stats:", error);
      return null;
    }
  }
}

export const analyticsService = new AnalyticsService();
