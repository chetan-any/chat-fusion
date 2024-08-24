import { auth } from "@lib/auth";
import Image from "next/image";
import App_Logo from "public/App_Logo.png";
import LogOutButton from "@components/dashboard-layout/LogOutButton";
import SidebarOptions from "@components/dashboard-layout/SidebarOptions";
import Link from "next/link";
import sidebarOptionsData from "@utils/dashboard-layout/sidebarOptionsData";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  const sidebarOptions = await sidebarOptionsData();

  return (
    <div className={`flex gap-x-4`}>
      <aside
        className={`sticky left-0 top-0 flex h-screen w-80 shrink-0 flex-col justify-between border-r py-4 pr-2 dark:border-slate-400`}
      >
        <section className={`space-y-8`}>
          {/* App Logo */}
          <Link href={`/dashboard`}>
            <Image
              src={App_Logo}
              alt={`Chat Fusion App Logo`}
              className={`size-10 rounded-md`}
            />
          </Link>

          <ul role={`list`} className={`space-y-4 *:text-sm`}>
            <li>
              <p>Your chats</p>
              <div className={`ml-3`}>
                <p>Some UI elements</p>
              </div>
            </li>

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
              src={(session?.user?.image as string) || ``}
              referrerPolicy={`no-referrer`}
              alt={`User Profile Picture`}
              width={45}
              height={45}
              quality={90}
              loading={`lazy`}
              className={`size-11 shrink-0 rounded-full`}
            />

            <span className="sr-only">Your Profile</span>
            <div className={`-space-y-0`} aria-hidden>
              <h1 className={`font-semibold`}>{session?.user?.name}</h1>
              <h2 className={`text-xs text-slate-500 dark:text-slate-300`}>
                {session?.user?.email}
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
