
import React from 'react';
import PropTypes from 'prop-types';
import { TextInput , StyleSheet} from 'react-native';
import { white, cyberGrape } from '../utils/colors'

export default function InputText (props) {
  const { name, onChange, value, placeholder } = props
  return (
    <TextInput
      name={name}
      onChangeText={(text) => onChange(text)}
      style={styles.input}
      placeholder={placeholder}
      valu={value}
    />
  )
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  input: {
    borderColor: cyberGrape,
    borderWidth: 1,
    height: 40,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  }
});