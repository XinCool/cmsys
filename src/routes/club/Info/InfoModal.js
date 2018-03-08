import React, {PureComponent} from 'react';
import {connect} from 'dva';
import LineMessage from '../../../components/LineMessage/index';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  Select,
  Modal,
  Spin,
  Radio
} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
@Form.create()
export default class InfoModal extends PureComponent {

  state = {
    addInputValue: '',
    confirmLoading: false,
    formData: {
      stuNum: '',
      nam: '',
      sex: '',
      annual: '',
      college: '',
      major: '',
      dept: '',
      position: '',
      sanction: '',
      remarks: '',
    },
    ModalTitle: '',
  };

  componentDidMount() {

  }


  handleOK() {
    const {data} = this.props;
    switch (data.key) {
      case 'read':
        this.props.handleModalVisible();
        break;
      case 'add':
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            this.props.dispatch({
              type: 'info/add',
              payload: values,
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                }
                this.setState({
                  confirmLoading: false,
                });
              }
            });

          }
        });
        break;
      case 'edit':
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            this.props.dispatch({
              type: 'info/update',
              payload: {
                ...values,
                id: data.data.id
              },
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                }
                this.setState({
                  confirmLoading: false,
                });
              }
            });

          }
        });
        break;
      default:
        break;
    }


  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const {data, modalLoading} = this.props;
    const formData = data.data == undefined ? {} : data.data;
    let title = '';
    switch (data.key) {
      case 'read':
        title = '查看';
        break;
      case 'add':
        title = '添加';
        break;
      case 'edit':
        title = '修改';
        break;
      default:
        break;
    }
    return (
      <Modal
        title={title + '会员'}
        visible={this.props.modalVisible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.handleModalVisible()}
        confirmLoading={this.state.confirmLoading}
      >
        {data.key == "read" ?
          <Card loading={modalLoading} bordered={false}>
            <LineMessage label="姓名">
              {formData.name}
            </LineMessage>
            <LineMessage label="学号">
              {formData.stuNum}
            </LineMessage>
            <LineMessage label="所属专业">
              {formData.major}
            </LineMessage>
            <LineMessage label="部门">
              {formData.dept}
            </LineMessage>
            <LineMessage label="现任职位">
              {formData.position}
            </LineMessage>
            <LineMessage label="任职状态">
              {formData.status == 1 ? "在职" : "离职"}
            </LineMessage>
            <LineMessage label="任职年度">
              {formData.annual}
            </LineMessage>
            <LineMessage label="奖罚情况">
              {formData.sanction}
            </LineMessage>
            <LineMessage label="添加时间">
              {moment(formData.insertTime).format('YYYY-MM-DD')}
            </LineMessage>
            <LineMessage label="添加人">
              {formData.insertMan}
            </LineMessage>
            <LineMessage label="最后修改时间">
              {moment(formData.lastupdTime).format('YYYY-MM-DD')}
            </LineMessage>
            <LineMessage label="最后修改人">
              {formData.lastupdMan}
            </LineMessage>
            <LineMessage label="备注">
              {formData.remarks}
            </LineMessage>

          </Card>
          :
          <Spin spinning={modalLoading}>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="姓名"
            >  {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.name
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="学号"
            >  {getFieldDecorator('stuNum', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.stuNum
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="所属专业"
            >  {getFieldDecorator('major', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.major
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="部门"
            >  {getFieldDecorator('dept', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.dept
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="任职年度"
            >  {getFieldDecorator('annual', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.annual
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="现任职位"
            >  {getFieldDecorator('position', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.position
            })(
              <Input />
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="奖罚情况"
            >  {getFieldDecorator('sanction', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.sanction
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="备注"
            >  {getFieldDecorator('assId', {
              initialValue: formData.remarks
            })(
              <TextArea rows={3}/>
            )}
            </FormItem>
          </Spin>
        }
      </Modal>
    )
  }
}
