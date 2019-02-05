import React from "react";
import {
  TouchableOpacity,
  Text,
  Platform
} from "react-native";

export default function SubmitButton({ onPress, label, style }) {
  return (
    <TouchableOpacity
      style={Platform.OS === "ios" ? style.iosSubmitBtn : style.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={style.submitBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}
