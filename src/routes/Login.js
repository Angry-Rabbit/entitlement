import React, {PropTypes} from 'react'
import {Button, Row, Form, Input, Icon} from 'antd'
import {config} from '../utils'
import styles from './Login.less'
import Captcha from '../components/ui/Captcha';

const FormItem = Form.Item

const Login = ({
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
      debugger;
      onOk(values)
    })
  }

  return (
    <div className={styles.form}>
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
          })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='密码' addonBefore={<Icon type="lock"/>}/>)}
        </FormItem>
        {
          isNeedCaptcha ?
            <FormItem hasFeedback>
              {
                getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: '请填写验证码'
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
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  isNeedCaptcha: PropTypes.bool,
  captchaSrc: PropTypes.string,
  onOk: PropTypes.func
}

export default Form.create()(Login)
