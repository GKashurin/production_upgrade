import {DropdownDirection} from "../../../types/ui";
import cls from "./Popup.module.scss";

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
};