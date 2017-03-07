import React, {PropTypes} from 'react'
import {Button, Row, Form, Input, Icon, Spin} from 'antd'
import {config} from '../utils'
import styles from './Login.less'
import Captcha from '../components/ui/Captcha';

const FormItem = Form.Item

const Login = ({
  loading,
  isNeedCaptcha,
  captchaSrc,
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      if(values.captcha){
        const captchaCode = values.captcha.code;
        values.captcha = captchaCode;
      }

      onOk(values)
    })
  }

  function checkCaptcha(rule, value, callback) {
    if (value && value.code) {
      callback();
      return;
    }
    callback('请输入验证码!');
  }

  return (
    <div className={styles.form}>
      <Spin spinning={loading} size="large">
        <div className={styles.logo}>
          <img src={config.logoSrc}/>
          <span>权管系统(ES)-登录</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名'
                }
              ]
            })(<Input size='large' onPressEnter={handleOk} placeholder='用户名' addonBefore={<Icon type="user"/>}/>)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码'
                }
              ]
            })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='密码'
                      addonBefore={<Icon type="lock"/>}/>)}
          </FormItem>
          {
            isNeedCaptcha ?
              <FormItem>
                {
                  getFieldDecorator('captcha', {
                    rules: [
                      {
                        validator: checkCaptcha,
                      }
                    ]
                  })(<Captcha src={captchaSrc}/>)
                }
              </FormItem> : ""
          }
          <Row>
            <Button type='primary' size='large' onClick={handleOk} loading={loginButtonLoading}>
              登录
            </Button>
          </Row>
        </form>
      </Spin>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  loginButtonLoading: PropTypes.bool,
  isNeedCaptcha: PropTypes.bool,
  captchaSrc: PropTypes.string,
  onOk: PropTypes.func
}

export default Form.create()(Login)
