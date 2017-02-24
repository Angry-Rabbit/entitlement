import React, {Component} from 'react';
import {Modal, Form, Input, Button, Icon, Row, Col} from 'antd';
import styles from './AppModel.less';

const FormItem = Form.Item;
class AppEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  handleRefreshAppToken = () => {
    const {refreshAppToken} = this.props;
    this.props.form.setFieldsValue({
      token: refreshAppToken(),
    })
  };

  handleResetForm = () => {
    this.props.form.resetFields();
  };

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {id, name, token, description} = this.props.record;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    debugger;
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          width='40%'
          title="编辑接入应用信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer={[
            <Button key='reset' onClick={this.handleResetForm} size="large">重置</Button>,
            <Button key="cancel" onClick={this.hideModelHandler} size="large">取消</Button>,
            <Button key="submit" onClick={this.okHandler} size="large" type="primary">提交</Button>
          ]}
        >
          <Form horizontal onSubmit={this.okHandler}>
            {id ? <FormItem {...formItemLayout} label="编	号">
                {
                  getFieldDecorator('id', {
                    initialValue: id,
                  })(<Input disabled/>)
                }
              </FormItem>
              : ""}
            <FormItem {...formItemLayout} label="名    称">
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{required: true, message: '请填写接入应用名称!'}]
                })(<Input />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="令    牌">
              <Row gutter={8} align="top" type="flex" justify="space-around">
                <Col span={18}>
                  {
                    getFieldDecorator('token', {
                      initialValue: token,
                    })(<Input type='textarea' rows="4"/>)
                  }
                </Col>
                <Col span={6}>
                  <Button key="refreshtoken_btn" size='small' onClick={this.handleRefreshAppToken} icon='reload' >更新令牌</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="备    注">
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input type="textarea" rows="4"/>)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AppEditModal);
