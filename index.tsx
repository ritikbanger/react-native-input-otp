import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardType,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface SingleOtpInputProps extends TextInputProps {
  index: number;
  onInputChange: (index: number, text: string) => void;
  onInputFocus: (index: number) => void;
  onBackspace: (index: number) => void;
  inputStyle?: TextStyle;
  focused?: boolean;
}

class SingleOtpInput extends Component<SingleOtpInputProps> {
  private inputRef: React.RefObject<TextInput> = React.createRef();

  componentDidUpdate(prevProps: SingleOtpInputProps) {
    if (this.props.focused && !prevProps.focused) {
      this.inputRef.current?.focus();
    }
    if (this.props.value !== prevProps.value && this.inputRef.current) {
      this.inputRef.current.setNativeProps({ text: this.props.value });
    }
  }

  handleTextChange = (text: string) => {
    const { index, onInputChange } = this.props;
    onInputChange(index, text);
  };

  handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Backspace') {
      const { index, onBackspace } = this.props;
      onBackspace(index);
    }
  };

  render() {
    const { style, onInputFocus, index, inputStyle, focused, ...rest } =
      this.props;
    const combinedStyle = StyleSheet.flatten([
      styles.input,
      inputStyle,
      style,
      focused ? styles.focusedInput : null,
    ]);

    return (
      <TextInput
        ref={this.inputRef}
        style={combinedStyle}
        onChangeText={this.handleTextChange}
        onKeyPress={this.handleKeyPress}
        onFocus={() => onInputFocus(index)}
        {...rest}
      />
    );
  }
}

interface OtpInputProps {
  numInputs: number;
  onChange: (otp: string) => void;
  isDisabled?: boolean;
  autoFocus?: boolean;
  keyboardType?: KeyboardType;
  value?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

interface OtpInputState {
  otp: string[];
  focusedInput: number;
}

class OtpInput extends Component<OtpInputProps, OtpInputState> {
  static defaultProps = {
    numInputs: 4,
    onChange: (otp: string) => console.log(otp),
    isDisabled: false,
    autoFocus: false,
    keyboardType: 'default',
    value: '',
  };

  constructor(props: OtpInputProps) {
    super(props);
    this.state = {
      otp: Array(props.numInputs).fill(''),
      focusedInput: 0,
    };
  }

  handleInputChange = (index: number, text: string) => {
    const newOtp = [...this.state.otp];
    newOtp[index] = text;
    this.setState({ otp: newOtp }, () => {
      this.props.onChange(newOtp.join(''));
      if (text && index < this.props.numInputs - 1) {
        this.focusInput(index + 1);
      }
    });
  };

  focusInput = (inputIndex: number) => {
    this.setState({ focusedInput: inputIndex });
  };

  handleBackspace = (index: number) => {
    const { otp } = this.state;
    if (otp[index] === '' && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      this.setState({ otp: newOtp, focusedInput: index - 1 });
    } else {
      const newOtp = [...otp];
      newOtp[index] = '';
      this.setState({ otp: newOtp }, () => {
        if (index > 0) {
          this.focusInput(index - 1);
        }
      });
    }
  };

  renderInputs = () => {
    const { numInputs, isDisabled, inputStyle, autoFocus, keyboardType } =
      this.props;
    const { otp, focusedInput } = this.state;

    return Array.from({ length: numInputs }, (_, i) => (
      <SingleOtpInput
        key={i}
        index={i}
        value={otp[i]}
        onInputChange={this.handleInputChange}
        onInputFocus={this.focusInput}
        onBackspace={this.handleBackspace}
        editable={!isDisabled}
        autoFocus={autoFocus && i === 0}
        keyboardType={keyboardType}
        inputStyle={inputStyle}
        focused={focusedInput === i}
        maxLength={1}
      />
    ));
  };

  render() {
    const { containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderInputs()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 40,
    height: 40,
    margin: 5,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  focusedInput: {
    borderColor: 'blue',
  },
});

export default OtpInput;
