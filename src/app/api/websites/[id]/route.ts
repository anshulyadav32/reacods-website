import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const website = await prisma.website.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!website) {
      return NextResponse.json(
        { error: "Website not found" },
        { status: 404 }
      )
    }

    // Check if user owns the website
    if (website.user.email !== session.user.email) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    await prisma.website.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Website deleted successfully" })
  } catch (error) {
    console.error("Error deleting website:", error)
    return NextResponse.json(
      { error: "Failed to delete website" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { domain, name, description, url, status } = body

    const website = await prisma.website.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!website) {
      return NextResponse.json(
        { error: "Website not found" },
        { status: 404 }
      )
    }

    // Check if user owns the website
    if (website.user.email !== session.user.email) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    const updatedWebsite = await prisma.website.update({
      where: { id: params.id },
      data: {
        domain,
        name,
        description,
        url,
        status,
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

    return NextResponse.json(updatedWebsite)
  } catch (error) {
    console.error("Error updating website:", error)
    return NextResponse.json(
      { error: "Failed to update website" },
      { status: 500 }
    )
  }
}
