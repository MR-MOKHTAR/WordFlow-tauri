import { Slider } from "@mui/material";
import { useCallback } from "react";
import useFont from "../contexts/FontModal/useFont";
import { toEnglishDigits } from "../../Utils/numberUtils";

function valuetext(value: number) {
  return `${value}`;
}

function FontSizeSlider() {
  const { fontSize, setFontSize } = useFont();
  const handleSliderChange = useCallback(
    (_event: Event, value: number | number[]) => {
      if (typeof value === "number") {
        setFontSize(toEnglishDigits(String(value)));
      }
    },
    [setFontSize]
  );

  return (
    <Slider
      aria-label="Small steps"
      value={+fontSize}
      getAriaValueText={valuetext}
      step={2}
      marks
      min={14}
      max={48}
      valueLabelDisplay="auto"
      onChange={handleSliderChange}
    />
  );
}

export default FontSizeSlider;

/*
function InputField({ id, placeholder, value, onChange }: PropsType) {
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      className="dark:**:text-gray-200! [&_.MuiOutlinedInput-notchedOutline]:border-cyan-600!
      hover:[&_.MuiOutlinedInput-notchedOutline]:border-cyan-400!
    focus:[&_.MuiOutlinedInput-notchedOutline]:border-cyan-400!"
      sx={{ width: "100%" }}
    />
  );
}

export default memo(InputField);
*/
