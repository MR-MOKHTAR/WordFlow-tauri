import { Editor, useEditorState } from "@tiptap/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../Utils/numberUtils";

function WordCount({ editor }: { editor: Editor }) {
  const { t } = useTranslation();
  const state = useEditorState({
    editor,
    selector: (context) => {
      if (
        context.editor &&
        !context.editor.isDestroyed &&
        context.editor.storage.characterCount
      ) {
        return {
          charactersCount: context.editor.storage.characterCount.characters(),
          wordsCount: context.editor.storage.characterCount.words(),
        };
      }
      return { charactersCount: 0, wordsCount: 0 };
    },
  });

  const totalCharacters = state?.charactersCount ?? 0;
  const totalWords = state?.wordsCount ?? 0;

  return (
    <div
      className={`absolute font-Amiri bottom-0 end-3 flex items-center gap-x-1 text-xs
        text-neutral-600 dark:text-neutral-300
        transition-opacity ${editor?.isFocused ? "opacity-95" : "opacity-40"}`}
    >
      <span>
        {t("cell.words")}: {formatNumber(totalWords)}
      </span>
      <span className="mx-1">|</span>
      <span>
        {t("cell.characters")}: {formatNumber(totalCharacters)}
      </span>
    </div>
  );
}

export default memo(WordCount);
