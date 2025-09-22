import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";
import Editor from "./components/cells/Editor";
import { useEffect } from "react";
import useFileName from "./components/contexts/fileName/useFileName";
import WelcomeScreen from "./components/welcome/WelcomeScreen";
import ShowModals from "./components/ui/ShowModals";
import MyToast from "./components/ui/MyToast";

function App() {
  const { fileName } = useFileName();

  // useEffect(() => {
  //   (async function setupShortcuts() {
  //     await register("CommandOrControl+N", () =>
  //       emit("shortcut", { action: "newCell" as const })
  //     );
  //   })();
  // }, []);

  useEffect(() => {
    console.log("App.tsx");
  });

  return (
    <div className={`relative h-screen flex flex-col font-Shabnam`}>
      <Header />
      <div className="h-9" />
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
