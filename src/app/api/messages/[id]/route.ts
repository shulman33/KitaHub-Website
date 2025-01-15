import { NextRequest } from "next/server";

/**
 * @route GET /api/messages/[id]
 * @description Retrieves the message with the given ID
 *
 * @note Only a user that is enrolled in the class can view the message
 * @note should also return the tags associated with the message
 *
 *
 * @throws {401} - If user is not authenticated
 * @throws {500} - If there's a server error during message creation
 *
 * @requires {Authentication} - Requires valid Auth0 session
 */
export async function GET(request: NextRequest){
    
}

export async function PATCH(request: NextRequest) {}

export async function DELETE(request: NextRequest) {}
