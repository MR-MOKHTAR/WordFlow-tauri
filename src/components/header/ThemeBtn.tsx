import { IoMoonOutline, IoSunnySharp } from "react-icons/io5";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";
import useThemeMode from "../Hooks/useThemeMode";

export default function ThemeBtn() {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <ButtonWithIcon
      onClick={toggleTheme}
      btnSize="md"
      shape="md"
      icon={isDark ? <IoMoonOutline size={18} /> : <IoSunnySharp size={18} />}
    />
  );
}
