import React, { useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "../../hooks";
import { Select } from "../../components/Select";
import { Sun, Moon, DisplayIcon, ChevronUpDown } from "../../icons";

const ThemeSwitcher = () => {
  const mounted = useMounted();
  const { theme, themes, setTheme, forcedTheme } = useTheme();

  const defaultTheme = "light";

  useEffect(() => {
    if (theme && !themes.includes(theme)) {
      const _theme = theme.replace(/"/g, "");
      themes.includes(_theme) ? setTheme(_theme) : setTheme(defaultTheme);
    }
  }, [theme, themes, setTheme]);

  const changeTheme = useCallback(
    (e: any) => setTheme(e.target.value),
    [setTheme]
  );

  if (!mounted) return null;

  return (
    <Select
      aria-label="Change color theme"
      disabled={!!forcedTheme}
      onChange={changeTheme}
      value={theme || defaultTheme}
      prefix={
        theme === "dark" ? (
          <Moon size={16} />
        ) : theme === "light" ? (
          <Sun size={16} />
        ) : (
          <DisplayIcon size={16} />
        )
      }
      size="small"
      suffix={<ChevronUpDown size={16} />}
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </Select>
  );
};

export default React.memo(ThemeSwitcher);
