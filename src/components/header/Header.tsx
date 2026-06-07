import AddNewCell from "./AddNewCell";
import HeaderRight from "./Right";
import SaveButton from "./SaveButton";
import CreatePDF from "./Exports/PDF";
import FontSetting from "../Fonts/FontSetting";
import ThemeBtn from "./ThemeBtn";
import AISettingsBtn from "./AISettingsBtn";
import LanguageBtn from "./LanguageBtn";

export default function Header() {
  return (
    <div className="header flex-between fixed w-full h-10 px-3 shadow-sm border-b border-border-light dark:border-border-dark z-20 bg-sidebar-light dark:bg-sidebar-dark text-gray-800 dark:text-gray-200 transition-all">
      <HeaderRight />

      <div className="flex items-center gap-x-1">
        <ThemeBtn />
        <LanguageBtn />
        <FontSetting />
        <AISettingsBtn />
        <CreatePDF />
        <SaveButton />
        <AddNewCell />
      </div>
    </div>
  );
}
