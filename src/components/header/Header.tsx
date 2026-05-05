import AddNewCell from "./AddNewCell";
import HeaderRight from "./Right";
import SaveButton from "./SaveButton";
import CreatePDF from "./Exports/PDF";
import FontSetting from "../Fonts/FontSetting";
import ThemeBtn from "./ThemeBtn";
import AISettingsBtn from "./AISettingsBtn";

export default function Header() {
  return (
    <div className="header flex-between fixed w-full h-9 px-2.5 shadow-sm z-20 bg-sidebar-light dark:bg-sidebar-dark backdrop-blur-md text-gray-800">
      <HeaderRight />

      <div className="flex items-center gap-x-1">
        <ThemeBtn />
        <FontSetting />
        <AISettingsBtn />
        <CreatePDF />
        <SaveButton />
        <AddNewCell />
      </div>
    </div>
  );
}
