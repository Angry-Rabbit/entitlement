import React, {PropTypes} from 'react';
import {Input, Row, Col, Icon} from 'antd';
import styles from './Captcha.css';


class Captcha extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props)
    const src = this.props.src;
    debugger;
    this.state = {
      src
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps==")
    // console.log(nextProps)
    // Should be a controlled component.
    debugger;
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }

    if('src' in nextProps){
      this.setState({src: nextProps.src});
    }
  }

  handleCaptchaChange = (e) => {
    const code = e.target.value;
    if (!('value' in this.props)) {
      this.setState({code});
    }
    this.triggerChange({code});
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, changedValue));
    }
  }

  refreshCaptcha = () => {
    let src = this.props.src.split('?', 1)[0] + '?' +new Date().getTime();
    this.setState({
      src
    })
  }


  render() {
    const {src} = this.state;
    return (
      <Row gutter={8}>
        <Col span={12}>
          <Input type="text" size="large" placeholder='验证码' onChange={this.handleCaptchaChange}
                 addonBefore={<Icon type="question"/>}/>
        </Col>
        <Col span={12}>
          <img src={src} onClick={this.refreshCaptcha}/>
        </Col>
      </Row>
    );
  }

}


export default Captcha;
