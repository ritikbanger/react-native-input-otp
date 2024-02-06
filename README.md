# react-native-input-otp

## Overview

`react-native-input-otp` is a fully customizable, one-time password (OTP) input component designed for React Native applications. This package makes it easy to integrate an OTP input feature into your mobile app, ensuring a user-friendly and secure way for users to input their OTP codes.

## Installation

To install `react-native-input-otp`, run the following command in your React Native project:

```bash
npm install react-native-input-otp
```

## Props

The `OtpInput` component accepts several props to customize its behavior and style:

<table>
  <tr>
    <th>Prop Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td><code>numInputs</code></td>
    <td><code>number</code></td>
    <td>The number of input boxes for the OTP.</td>
    <td><code>4</code></td>
  </tr>
  <tr>
    <td><code>onChange</code></td>
    <td><code>(otp: string) => void</code></td>
    <td>Function called with the OTP value when it changes.</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>isDisabled</code></td>
    <td><code>boolean</code></td>
    <td>If set to <code>true</code>, all input boxes are disabled.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>autoFocus</code></td>
    <td><code>boolean</code></td>
    <td>If set to <code>true</code>, the first input box is focused automatically.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>keyboardType</code></td>
    <td><code>KeyboardType</code> (React Native)</td>
    <td>The type of keyboard to display for inputs.</td>
    <td><code>'default'</code></td>
  </tr>
  <tr>
    <td><code>value</code></td>
    <td><code>string</code></td>
    <td>The current value of the OTP input.</td>
    <td><code>''</code> (empty string)</td>
  </tr>
  <tr>
    <td><code>containerStyle</code></td>
    <td><code>ViewStyle</code> (React Native style)</td>
    <td>Custom styles for the container of the input boxes.</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>inputStyle</code></td>
    <td><code>TextStyle</code> (React Native style)</td>
    <td>Custom styles for each input box.</td>
    <td>-</td>
  </tr>
</table>

## Customization

You can customize the appearance of the OTP inputs by providing `containerStyle` and `inputStyle` props. These props accept standard React Native style objects.

## Usage

### In Class Components

First, import the `OtpInput` component from the package:

```javascript
import OtpInput from 'react-native-input-otp';
```

Then, you can use the `OtpInput` component in your class component as follows:

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';
import OtpInput from 'react-native-input-otp';

class YourComponent extends Component {
  handleOtpChange = otp => {
    console.log(otp); // OTP value
  };

  render() {
    return (
      <View>
        <OtpInput numInputs={4} onChange={this.handleOtpChange} />
      </View>
    );
  }
}

export default YourComponent;
```

### In Functional Components

For functional components, the usage is similar. Import the `OtpInput` component and use it inside your functional component:

```javascript
import React from 'react';
import { View } from 'react-native';
import OtpInput from 'react-native-input-otp';

const YourComponent = () => {
  const handleOtpChange = otp => {
    console.log(otp); // OTP value
  };

  return (
    <View>
      <OtpInput numInputs={4} onChange={handleOtpChange} />
    </View>
  );
};

export default YourComponent;
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
