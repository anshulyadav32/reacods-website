import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const websites = await prisma.website.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(websites)
  } catch (error) {
    console.error("Error fetching websites:", error)
    return NextResponse.json(
      { error: "Failed to fetch websites" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { domain, name, description, url } = body

    // Check if domain already exists
    const existingWebsite = await prisma.website.findUnique({
      where: { domain },
    })

    if (existingWebsite) {
      return NextResponse.json(
        { error: "Domain already exists" },
        { status: 400 }
      )
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      })
    }

    const website = await prisma.website.create({
      data: {
        domain,
        name,
        description,
        url,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(website, { status: 201 })
  } catch (error) {
    console.error("Error creating website:", error)
    return NextResponse.json(
      { error: "Failed to create website" },
      { status: 500 }
    )
  }
}
