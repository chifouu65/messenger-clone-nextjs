import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    console.log('currentUser', currentUser);
    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    } else if (!existingConversation.users.find(user => user.id === currentUser.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    } else if (existingConversation.users.length > 2) {
      return new NextResponse('Cannot delete group conversations', { status: 400 });
    } else if (existingConversation.users.length === 1) {
      return new NextResponse('Cannot delete conversations with only one user', { status: 400 });
    } else {
      console.log('existingConversation', existingConversation);
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        },
      },
    });

    console.log('deletedConversation', deletedConversation);
    return NextResponse.json(deletedConversation);
  } catch (error) {
    return NextResponse.json(null);
  }
}