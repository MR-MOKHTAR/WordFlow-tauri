import { useCallback } from "react";
import useFont from "../contexts/FontModal/useFont";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

/*
  { label: "Traditional Arabic", value: "TraditionalArabic" },
  { label: "Tahoma Arabic", value: "TahomaArabic" },
  { label: "Dubai", value: "Dubai" },
  { label: "Cairo", value: "Cairo" },

  // هنری
  { label: "Diwani", value: "Diwani" },
  { label: "Thuluth", value: "Thuluth" },
  { label: "Kufi", value: "Kufi" },
  { label: "Noto Nastaliq Urdu", value: "NotoNastaliqUrdu" },


*/
const fonts = [
  // فارسی
  { label: "وزیر", value: "Vazir" },
  { label: "شبنم", value: "Shabnam" },
  { label: "صمیم", value: "Samim FD" },
  { label: "ایران‌سنس", value: "IRANSans" },
  { label: "امیری (فارسی)", value: "Amiri fa" },
  { label: "القلم قرآن", value: "Al Qalam" },
  { label: "نستعلیق", value: "IranNastaliq" },

  // Arabic
  { label: "Amiri (عربی)", value: "Amiri" },
  { label: "Scheherazade", value: "Scheherazade New" },
  { label: "Noto Naskh Arabic", value: "Noto Naskh Arabic" },
  { label: "Noto Kufi Arabic", value: "Noto Kufi Arabic" },
];

function SelectField() {
  const { fontFamily, setFontFamily } = useFont();

  const handleChange = useCallback(
    (e: SelectChangeEvent<string>) => setFontFamily(e.target.value),
    [setFontFamily]
  );
  return (
    <Select
      value={fontFamily}
      onChange={handleChange}
      dir="ltr"
      defaultValue={fontFamily}
      size="small"
      sx={{ width: "100%" }}
      className="font-family
      dark:text-gray-200! 
      [&_.MuiOutlinedInput-notchedOutline]:border-cyan-600!
      hover:[&_.MuiOutlinedInput-notchedOutline]:border-cyan-400!
      focus:[&_.MuiOutlinedInput-notchedOutline]:border-cyan-400!
    "
    >
      {fonts.map((font) => (
        <MenuItem value={font.value}>{font.label}</MenuItem>
      ))}
    </Select>
  );
}

export default SelectField;

/*
import { memo } from "react";
import useFont from "../contexts/FontModal/useFont";

type SelectFieldType = {
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

function SelectField({ id, value, onChange, options }: SelectFieldType) {
  const { fontFamily } = useFont();
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="fs-field font-family"
      dir="ltr"
      defaultValue={fontFamily}
    >
      {options.map((opt, i) => (
        <option
          key={i}
          value={opt.value}
          className="p-2 bg-[#1E1F29] text-slate-200 text-sm hover:bg-[#7c3aed]"
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default memo(SelectField);
*/
