import db from "@lib/db";
import { auth } from "@lib/auth";
import { FaUser, FaUserPlus } from "react-icons/fa";


/** @return `sidebarOptions` array of type `SidebarOptions[]` */
const sidebarOptionsData = async (): Promise<SidebarOption[]> => {
    const session = await auth();

    // Getting total incoming friend requests for the current user
    const totalIncomingRequests = (
        await db.smembers(`user:${session?.user?.id}:incoming_friend_requests`)
    ).length;

    const sidebarOptions: SidebarOption[] = [
        {
            id: 1,
            name: `Add Friend`,
            href: `/dashboard/add-friend`,
            icon: FaUserPlus,
            // badge: `Gojo`
        },

        {
            id: 2,
            name: `Friend Requests`,
            href: `/dashboard/requests`,
            icon: FaUser,
            badge: totalIncomingRequests,
        },
    ];

    return sidebarOptions;
};

export default sidebarOptionsData;