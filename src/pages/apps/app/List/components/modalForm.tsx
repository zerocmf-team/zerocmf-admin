import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { add, edit } from '@/services/app';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useImmer } from 'use-immer';

export default forwardRef((props: any, ref) => {
  const { children, onOpenChange, onFinish } = props;

  const [open, setOpen] = useState(false);

  const formRef = useRef<ProFormInstance>();

  const [state, setState] = useImmer({
    id: 0,
    title: '新建应用',
  });

  useImperativeHandle(ref, () => ({
    open(data: any = {}) {
      let title: any = '新建应用';
      let id = 0;
      if (data.id) {
        title = '编辑应用';
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
          res = await edit(id, values);
        } else {
          res = await add(values);
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
        label="应用名称"
        placeholder="请输入应用名称"
        rules={[
          {
            required: true,
            message: '应用名称不能为空',
          },
        ]}
      />

      <ProFormText name="description" label="应用描述" placeholder="请输入应用名称" />

      <ProFormText
        name="version"
        label="应用版本"
        placeholder="请输入应用版本"
        initialValue="1.0.0"
      />
    </ModalForm>
  );
});
