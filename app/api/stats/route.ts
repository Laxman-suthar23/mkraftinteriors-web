import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// 👇 Tell Next.js this route is always dynamic
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalProjects,
      totalReviews,
      totalContacts,
      totalTeamMembers,
      recentProjects,
      recentContacts,
      projectsByType,
      contactsByStatus,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.review.count(),
      prisma.contactSubmission.count(),
      prisma.teamMember.count({ where: { active: true } }),
      prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, location: true, type: true, createdAt: true },
      }),
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, projectType: true, status: true, createdAt: true },
      }),
      prisma.project.groupBy({ by: ["type"], _count: { type: true } }),
      prisma.contactSubmission.groupBy({ by: ["status"], _count: { status: true } }),
    ]);

    const stats = {
      overview: { totalProjects, totalReviews, totalContacts, totalTeamMembers },
      recent: { projects: recentProjects, contacts: recentContacts },
      charts: {
        projectsByType: projectsByType.map((item) => ({
          type: item.type,
          count: item._count.type,
        })),
        contactsByStatus: contactsByStatus.map((item) => ({
          status: item.status,
          count: item._count.status,
        })),
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
