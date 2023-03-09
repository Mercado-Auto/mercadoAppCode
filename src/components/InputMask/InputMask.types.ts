import type { InputProps } from "@ui-kitten/components";
import { Mask } from "react-native-mask-input";

export interface InputMaskProps extends Omit<InputProps, "onChangeText"> {
  /**
   * Mask
   */
  mask?: Mask;

  /**
   * Callback that is called when the text input's text changes.
   * @param masked Masked text
   * @param unmasked Unmasked text
   * @param obfuscated Obfuscated text
   */
  onChangeText?(masked: string, unmasked: string, obfuscated: string): void;

  /**
   * Whether or not to display the obfuscated value on the `TextInput`. Defaults to false
   */
  showObfuscatedValue?: boolean;

  /**
   * Character to be used as the "fill character" on the default placeholder
   */
  placeholderFillCharacter?: string;

  /**
   * Character to be used on the obfuscated characteres. Defaults to "*"
   */
  obfuscationCharacter?: string;
}
