import { IoMoonOutline, IoSunnySharp } from "react-icons/io5";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";
import useThemeMode from "../Hooks/useThemeMode";

export default function ThemeBtn() {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <ButtonWithIcon
      onClick={toggleTheme}
      btnSize="sm"
      shape="md"
      icon={isDark ? <IoMoonOutline size={16} /> : <IoSunnySharp size={16} />}
    />
  );
}
