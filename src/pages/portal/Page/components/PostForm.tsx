import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Radio } from 'antd';
import { AssetsInput, AssetsMultInput, EditorInput } from '@zerocmf/antd-form';
import { getPortal, addPortal, updatePortal } from '@/services/portal';
import { listPage } from '@/services/appPage';
import { historyPush } from '@/utils/utils';
import { history } from 'umi';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const PostForm = ({ editId }: any) => {
  const [form] = Form.useForm();

  const [post, setPost] = useState<any>([]);

  const [tpl, setTpl] = useState([]);

  const onFinish = async (data: any) => {
    const param = { ...data };
    const { category } = param;
    const categoryIds: any = [];
    if (category !== undefined) {
      category.forEach((element: any) => {
        categoryIds.push(element.value);
      });
    }
    param.category_ids = categoryIds;
    param.is_top = param.is_top ? 1 : 0;
    param.recommended = param.recommended ? 1 : 0;
    param.post_type = 2;
    let result;
    if (editId > 0) {
      result = await updatePortal(editId, param);
    } else {
      result = await addPortal(param);
    }
    if (result.code === 1) {
      if (!editId) {
        historyPush(`/portal/page/edit/${result.data.id}`);
      }
      message.success(result.msg);
      return;
    }
    message.error(result.msg);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPortal(editId);
      if (result.code === 1) {
        const { data } = result;
        if (data.category instanceof Array) {
          const category = [];
          data.category.forEach((element: any) => {
            category.push({
              label: element.name,
              value: element.id.toString(),
            });
          });
        }
        if (data.post_keywords === '') {
          delete data.post_keywords;
        } else {
          data.post_keywords = data.keywords;
        }

        if (data.more_json && data.more_json.template) {
          data.template = data.more_json.template;
        }

        form.setFieldsValue(data);
        setPost(data);
      }
    };

    if (editId > 0) {
      fetchPost();
    }

    const init = async () => {
      const res = await listPage(1, { type: 'article', paginate: 'no' });
      if (res.code == 1) {
        setTpl(res.data);
        if (res.data.length > 0) {
          form.setFieldValue('template', `${res.data[0]?.id}`);
        }
      }
      /* 改成低代码调用 */
      // const result = await getThemeFiles({ theme: THEME, type: 'page' });
      // if (result.code === 1) {
      //   setTpl(result.data);
      // }
    };

    init();
  }, [editId]);

  return (
    <Form form={form} style={{ maxWidth: '800px' }} {...layout} onFinish={onFinish}>
      <Form.Item
        label="标题"
        name="post_title"
        rules={[{ required: true, message: '标题能为空!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="别名" name="alias">
        <Input />
      </Form.Item>

      <Form.Item
        label="缩略图"
        name="thumbnail"
        getValueProps={() => ({ path: post.thumb_prev_path })}
      >
        <AssetsInput />
      </Form.Item>

      <Form.Item label="关键词" name="post_keywords">
        <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
      </Form.Item>

      <Form.Item label="摘要" name="post_excerpt">
        <Input />
      </Form.Item>

      <Form.Item label="三要素-标题" name="seo_title">
        <Input />
      </Form.Item>

      <Form.Item label="三要素-关键词" name="seo_keywords">
        <Input />
      </Form.Item>

      <Form.Item label="三要素-描述" name="seo_description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="内容" name="post_content">
        <EditorInput />
      </Form.Item>

      <Form.Item label="相册" name="photos">
        <AssetsMultInput type="image" />
      </Form.Item>

      <Form.Item label="附件" name="files">
        <AssetsMultInput type="file" />
      </Form.Item>

      <Form.Item label="模板" name="template" initialValue={'default'}>
        <Select placeholder="请选择模板" style={{ width: 120 }}>
          {tpl.map((item: any) => (
            <Option key={item.id} value={`${item.id}`}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="状态" name="post_status" initialValue={1}>
        <Radio.Group>
          <Radio value={0}>停用</Radio>
          <Radio value={1}>启用</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button style={{ marginRight: '8px' }} type="primary" htmlType="submit">
          提交
        </Button>

        <Button onClick={() => history.goBack()}>返回</Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
