import Image from "next/image";
import App_Logo from "public/App_Logo.png";
import LogOutButton from "@components/dashboard-layout/LogOutButton";
import SidebarOptions from "@components/dashboard-layout/SidebarOptions";
import Link from "next/link";
import sidebarOptionsData from "@utils/dashboard-layout/sidebarOptionsData";
import SidebarChatList from "@ui/SidebarChatList";
import getFriendsAndCurrentUser from "@utils/getFriendsAndCurrentUser";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const sidebarOptions = await sidebarOptionsData();

  const { currentUser, friends } = await getFriendsAndCurrentUser();

  return (
    <div className={`flex pl-2`}>
      <aside
        className={`sticky left-0 top-0 flex h-screen w-[330px] shrink-0 flex-col justify-between border-r py-4 pr-2 dark:border-slate-400`}
      >
        <section className={`space-y-8`}>
          {/* App Logo */}
          <Link href={`/dashboard`}>
            <Image
              src={App_Logo}
              alt={`Chat Fusion App Logo`}
              className={`size-10 select-none rounded-md`}
            />
          </Link>

          <ul role={`list`} className={`space-y-6 *:text-sm`}>
            {friends.length > 0 && (
              <li className={`space-y-3`}>
                <p>Your chats</p>

                <SidebarChatList
                  currentUserID={currentUser?.id as string}
                  friends={friends}
                />
              </li>
            )}

            <li className={`space-y-4`}>
              <p>Overview</p>
              <SidebarOptions options={sidebarOptions} />
            </li>
          </ul>
        </section>

        {/* User Profile Section */}
        <section className={`bottom-0 flex items-center justify-between`}>
          <div className={`flex gap-x-2`}>
            <Image
              src={(currentUser?.image as string) || ``}
              referrerPolicy={`no-referrer`}
              alt={`User Profile Picture`}
              width={45}
              height={45}
              quality={90}
              loading={`lazy`}
              className={`size-11 shrink-0 select-none rounded-full`}
            />

            <span className="sr-only">Your Profile</span>
            <div className={`-space-y-0`} aria-hidden>
              <h1 className={`font-semibold`}>{currentUser?.name}</h1>
              <h2 className={`text-xs text-slate-500 dark:text-slate-300`}>
                {currentUser?.email}
              </h2>
            </div>
          </div>

          <LogOutButton />
        </section>
      </aside>

      {children}
    </div>
  );
}
