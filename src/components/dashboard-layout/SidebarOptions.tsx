import Link from "next/link";
import { Chip } from "@nextui-org/chip";

interface SidebarOptionsProps {
  options: SidebarOption[];
}

export default function SidebarOptions({ options }: SidebarOptionsProps) {
  return (
    <ul role={`list`} className={`space-y-3`}>
      {options.map((property) => (
        <li
          key={property.id}
          title={property.name}
          className={`bg-hover group overflow-hidden border dark:border-slate-800`}
        >
          <Link
            href={property.href}
            className={`flex items-center justify-between`}
          >
            <div className={`flex items-center gap-x-2`}>
              <property.icon
                className={`size-7 shrink-0 rounded-md p-1 text-indigo-700 group-hover:border-2 group-hover:border-current dark:text-indigo-300`}
              />

              <p className={`truncate`}>{property.name}</p>
            </div>

            <div className={`flex items-center`}>
              {typeof property.badge === `number` && property.badge > 0 && (
                <Chip
                  color={`primary`}
                  variant={`shadow`}
                  size={`sm`}
                  title={`You've ${property.badge} unseen friend requests`}
                >
                  {property.badge}
                </Chip>
              )}

              {typeof property.badge === `string` &&
                property.badge.length > 0 && (
                  <Chip color={`primary`} variant={`shadow`} size={`sm`}>
                    {property.badge}
                  </Chip>
                )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
