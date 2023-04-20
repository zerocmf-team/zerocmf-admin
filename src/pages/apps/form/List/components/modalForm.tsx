import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { addForm, editForm } from '@/services/form';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useImmer } from 'use-immer';

export default forwardRef((props: any, ref) => {
  const { children, onOpenChange, onFinish } = props;
  const [open, setOpen] = useState(false);
  const formRef = useRef<ProFormInstance>();
  const [state, setState] = useImmer({
    id: 0,
    title: '新建表单',
    isHome: false,
  });

  useImperativeHandle(ref, () => ({
    open(data: any = {}) {
      let title: any = '新建表单';
      let id = 0;
      if (data.id) {
        title = '编辑表单';
        id = data.id;
      }
      setState((draft: any) => {
        draft.title = title;
        draft.id = id;
      });
      formRef.current?.setFieldsValue(data);
      setOpen(true);
    },
  }));

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <ModalForm
      formRef={formRef}
      {...formItemLayout}
      layout="horizontal"
      width={520}
      visible={open}
      onVisibleChange={onOpenChange}
      title={state.title}
      trigger={children}
      submitter={{
        searchConfig: {
          submitText: '确认',
          resetText: '取消',
        },
      }}
      modalProps={{
        destroyOnClose: true,
        forceRender: true,
        onCancel() {
          setOpen(false);
        },
      }}
      onFinish={async (values) => {
        let res;
        const { id = 0 } = state;
        if (id > 0) {
          res = await editForm(id, values);
        } else {
          res = await addForm(values);
        }
        if (res.code != 1) {
          message.error(res.msg);
          return;
        }
        message.success(res.msg);
        if (onFinish) {
          onFinish();
        }
        setOpen(false);
      }}
    >
      <ProFormText
        name="name"
        label="表单名称"
        placeholder="请输入表单名称"
        rules={[
          {
            required: true,
            message: ' 表单名称不能为空',
          },
        ]}
      />

      <ProFormText name="description" label="表单描述" placeholder="请输入表单描述" />
      <ProFormText name="seoTitle" label="三要素-标题" placeholder="请输入三要素-标题" />
      <ProFormText name="seoDescription" label="三要素-描述" placeholder="请输入三要素-描述" />
      <ProFormText name="seoKeywords" label="三要素-关键词" placeholder="请输入三要素-关键词" />

      <ProFormSelect
        disabled={state.isHome}
        name="status"
        label="表单状态"
        request={async () => [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
        initialValue={1}
        placeholder="请选择表单状态"
        rules={[{ required: true, message: '表单状态不能为空!' }]}
      />
    </ModalForm>
  );
});
