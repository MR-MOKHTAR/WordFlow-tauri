import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";
import Editor from "./components/cells/Editor";
import { useEffect } from "react";
import useFileName from "./components/contexts/fileName/useFileName";
import WelcomeScreen from "./components/welcome/WelcomeScreen";
import ShowModals from "./components/ui/ShowModals";
import MyToast from "./components/ui/MyToast";
import useSaveFile from "./components/SaveFile/useSaveFile";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useTranslation } from "react-i18next";
import useSyncHtmlDir from "./components/Hooks/useSyncHtmlDir";

function App() {
  const { fileName } = useFileName();
  const saveFile = useSaveFile({ mode: "instant" });
  const { i18n } = useTranslation();
  useSyncHtmlDir();

  const isLatin = (i18n.language || "fa").split("-")[0] === "en";

  useEffect(() => {
    let isClosing = false;
    const appWindow = getCurrentWindow();
    const unlisten = appWindow.onCloseRequested(async (event) => {
      if (isClosing) return; // Allow close to proceed

      if (fileName) {
        event.preventDefault(); // Pause closing to save
        isClosing = true;
        await saveFile(fileName);
        await appWindow.close(); // Re-trigger close
      }
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, [fileName, saveFile]);

  // useEffect(() => {
  //   (async function setupShortcuts() {
  //     await register("CommandOrControl+N", () =>
  //       emit("shortcut", { action: "newCell" as const })
  //     );
  //   })();
  // }, []);

  return (
    <div
      className={`relative h-screen flex flex-col ${
        isLatin ? "font-latin" : "font-Shabnam"
      }`}
    >
      <Header />
      <div className="h-10" />
      <div className="flex flex-1 min-h-0 ">
        <SideBar />
        {fileName ? <Editor /> : <WelcomeScreen />}
      </div>
      <ShowModals />
      <MyToast />
    </div>
  );
}

export default App;
