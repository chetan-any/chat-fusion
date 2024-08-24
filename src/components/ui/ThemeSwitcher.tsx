"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import ThemeButton from "@components/ThemeButton";
import { Spinner } from "@nextui-org/spinner";

const iconSize = 18;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(!isClient);
  }, []);

  if (isClient) {
    return (
      <>
        {theme === `dark` && (
          <ThemeButton onPress={() => setTheme(`light`)}>
            <IoMdMoon size={iconSize} />
          </ThemeButton>
        )}

        {theme === `light` && (
          <ThemeButton onPress={() => setTheme(`dark`)}>
            <MdSunny size={iconSize} />
          </ThemeButton>
        )}
      </>
    );
  }

  return (
    <ThemeButton>
      <Spinner color={`danger`} size={`sm`} />
    </ThemeButton>
  );
}
