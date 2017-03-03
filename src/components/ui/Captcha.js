import React, {PropTypes} from 'react';
import {Input, Row, Col, Icon} from 'antd';
import styles from './Captcha.css';


class Captcha extends React.Component {

  constructor(props) {
    super(props);
    const value = this.props.value || {};
    this.state = {
      captcha: value.captcha,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }


  handleCaptchaChange = (e) => {
    const captcha = e.target.value;
    if (!('value' in this.props)) {
      this.setState({captcha});
    }
    this.triggerChange({captcha});
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }


  render() {
    const {src} = this.props;
    const {captcha} = this.state;

    return (
      <Row gutter={8}>
        <Col span={12}>
          <Input type="text" size="large" placeholder='验证码' value={captcha} onChange={this.handleCaptchaChange}
                 addonBefore={<Icon type="question"/>}/>
        </Col>
        <Col span={12}>
          <img src={src}/>
        </Col>
      </Row>
    );
  }

}


export default Captcha;
