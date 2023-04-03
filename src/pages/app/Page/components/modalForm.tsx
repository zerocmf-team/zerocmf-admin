import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { addPage, editPage } from '@/services/appPage';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useImmer } from 'use-immer';
import FormItem from 'antd/es/form/FormItem';

export default forwardRef((props: any, ref) => {
  const { children, onOpenChange, onFinish, appId } = props;
  const [open, setOpen] = useState(false);
  const formRef = useRef<ProFormInstance>();
  const [state, setState] = useImmer({
    id: 0,
    title: '新建页面',
    isHome: false,
  });

  useImperativeHandle(ref, () => ({
    open(data: any = {}) {
      let title: any = '新建页面';
      let isHome: any = false;
      let id = 0;
      if (data.id) {
        title = '编辑页面';
        id = data.id;
      }

      if (data.isHome) {
        isHome = true;
      }

      setState((draft: any) => {
        draft.title = title;
        draft.id = id;
        draft.isHome = isHome;
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
          res = await editPage(id, values);
        } else {
          res = await addPage(Number(appId), values);
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
        label="页面名称"
        placeholder="请输入页面名称"
        rules={[
          {
            required: true,
            message: '页面名称不能为空',
          },
        ]}
      />

      <ProFormText name="description" label="页面描述" placeholder="请输入页面描述" />

      <ProFormSelect
        name="type"
        label="页面类型"
        valueEnum={{
          page: '页面',
          list: '列表',
          article: '文章',
        }}
        initialValue="page"
        placeholder="请选择页面类型"
        rules={[{ required: true, message: '页面类型不能为空!' }]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          let alias = '';
          if (state.isHome) {
            alias = '/';
          } else if (type == 'page') {
            alias = '/page/:id';
          } else if (type == 'list') {
            alias = '/list/:id';
          } else if (type == 'article') {
            return null;
          }
          return (
            <ProFormText
              disabled={state.isHome}
              tooltip="自定义页面访问路由"
              name="alias"
              label="路由别名"
              placeholder={`${alias}`}
            />
          );
        }}
      </ProFormDependency>

      <FormItem noStyle>
        <ProFormDependency name={['type']}>
          {({ type }) => {
            if (type === 'page') {
              return (
                <>
                  <ProFormText
                    name="seoTitle"
                    label="三要素-标题"
                    placeholder="请输入三要素-标题"
                  />
                  <ProFormText
                    name="seoDescription"
                    label="三要素-描述"
                    placeholder="请输入三要素-描述"
                  />
                  <ProFormText
                    name="seoKeywords"
                    label="三要素-关键词"
                    placeholder="请输入三要素-关键词"
                  />
                </>
              );
            }
            return null;
          }}
        </ProFormDependency>
      </FormItem>

      <ProFormSelect
        disabled={state.isHome}
        name="status"
        label="页面状态"
        request={async () => [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
        initialValue={1}
        placeholder="请选择页面状态"
        rules={[{ required: true, message: '页面状态不能为空!' }]}
      />
    </ModalForm>
  );
});
