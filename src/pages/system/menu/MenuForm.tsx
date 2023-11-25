import { Modal, Form, Radio, Input, Switch, InputNumber, TreeSelect, FormInstance, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "@/interface";
import { MenuType } from "./dict";
import { useMenuStore } from "@/stores/menu";
import { transformTree } from "@/utils/treeHelper";
import { CarryOutOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MenuService from "@/api/app";
import useRequest from "@/hooks/useRequest";


interface MenuFormProps {
  type: 'add' | 'edit';
  data?: MenuItem;
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

type MenuFormState = Partial<MenuItem>

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const { visible, type, data } = props;
  const formRef = useRef<FormInstance>(null); // 表单实例
  const [submitLoading, setSubmitLoading] = useState<boolean>(false); // 提交按钮loading
  const [form] = Form.useForm<MenuFormState>(); // 表单实例
  const { runAsync: addMenu } = useRequest(MenuService.addMenu, { manual: true });
  const { runAsync: updateMenu } = useRequest(MenuService.updateMenu, { manual: true });

  const { menuList } = useMenuStore();
  const treeData = [
    {
      title: '根目录',
      id: '0',
      icon: <CarryOutOutlined />,
      children: transformTree(menuList || [], 'id', 'parentId')
    }
  ]
  const setInitValue = async () => {
    if (type === 'add') {
      form.setFieldsValue({
        type: MenuType.DIRECTORY.toString()
      })
    }
  }

  useEffect(() => {
    visible ? setInitValue() : form.resetFields()
    if (visible && data) {
      console.log('data', data);

      form.setFieldsValue(data)
    }
  }, [visible])

  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue({
        type: MenuType.DIRECTORY.toString(),
        parentId: 0
      })
    }
  }, [form])

  const renderDirectoryFormItems = () => {
    return (
      <>
        <Form.Item label="目录图标" name="icon" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="路由地址" name="path" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </>
    )
  }

  const renderMenuFormItems = () => {
    return (
      <>
        <Form.Item label="菜单图标" name="icon">
          <Input />
        </Form.Item>
        <Form.Item label="路由地址" name="path" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="页面路径" name="component" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="权限标识" name="permission">
          <Input />
        </Form.Item>
      </>
    )
  }

  const renderButtonFormItems = () => {
    return (
      <>
        <Form.Item label="权限标识" name="permission">
          <Input />
        </Form.Item>
      </>
    )
  }

  const renderFormItems = {
    [MenuType.DIRECTORY.toString()]: renderDirectoryFormItems,
    [MenuType.MENU.toString()]: renderMenuFormItems,
    [MenuType.BUTTON.toString()]: renderButtonFormItems
  }

  const handleSubmit = async (values: MenuFormState) => {
    setSubmitLoading(true);
    const [error, result] = type === 'add' ? await addMenu(values) : await updateMenu({ ...values, id: data?.id });
    if (!error) {
      message.success(result.msg);
      setSubmitLoading(false);
      props.onSuccess();

    } else {
      setSubmitLoading(false);
    }
  }

  return (
    <Modal
      forceRender
      destroyOnClose
      title={type === 'add' ? '添加菜单' : '编辑菜单'}
      width={800}
      open={props.visible}
      onCancel={ () => {
          props.onCancel();
          setSubmitLoading(false)
        }
      }
      onOk={() => form.submit()}
      confirmLoading={submitLoading}
    >
      <Form
        ref={formRef}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        name="menuForm"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item label="上级菜单" name="parentId">
          <TreeSelect
            allowClear
            fieldNames={{ label: 'title', value: 'id', children: 'children' }}
            treeIcon={true}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item label="菜单名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="菜单标题" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="菜单类型" name="type">
          <Radio.Group
            value={form.getFieldValue('type')}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="1">目录</Radio.Button>
            <Radio.Button value="2">菜单</Radio.Button>
            <Radio.Button value="3">按钮</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => renderFormItems[form.getFieldValue('type')]?.() }
        </Form.Item>
        <Form.Item label="显示排序">
          <Form.Item
            name="sort"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="父级目录"
            name="parentPath"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item label="是否隐藏">
          <Form.Item
            valuePropName="checked"
            name="hidden"
            tooltip="隐藏后在左侧菜单栏中不显示"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            label="是否缓存"
            name="cache"
            tooltip={{ title: '暂时用不到，打算给Vue-Admin里使用', icon: <InfoCircleOutlined /> }}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <Switch />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default MenuForm;