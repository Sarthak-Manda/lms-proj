import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
    try {
        const userId = req.auth().userId        // ← add ()

        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== 'educator') {
            return res.json({ success: false, message: 'Unauthorized Access' })  // ← fixed resizeBy → res, and moved on same line
        }

        next()

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}