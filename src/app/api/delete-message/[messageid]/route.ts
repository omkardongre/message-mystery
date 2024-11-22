import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/options";

// type RouteParams {
//   params: {
//     messageid: string;
//   };
// }

type Params = Promise<{ messageid: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  await dbConnect();

  const { messageid } = await params;

  const messageId = messageid;
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;
  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Message not found or already deleted", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Error deleting message", success: false },
      { status: 500 }
    );
  }
}
