import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Select,
  TreeSelect,
  message,
  Radio,
  Switch,
  Space,
} from 'antd';
import { AssetsInput, AssetsMultInput, EditorInput } from '@zerocmf/antd-form';
import { history } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getPortalCategoryList } from '@/services/portalCategory';
import { getPortal, addPortal, updatePortal } from '@/services/portal';
import moment from 'moment';
// import { getThemeFiles } from '@/services/themeFile';
import { listPage } from '@/services/appPage';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const { Option } = Select;

const PostForm = ({ editId }: any) => {
  const [treeData, setTreeData] = useState([]);
  const [treeValue, setTreeValue] = useState([]);

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

    param.publish_time = param.publish_time.format(dateFormat);

    let result;
    if (editId > 0) {
      result = await updatePortal(editId, param);
    } else {
      result = await addPortal(param);
    }

    if (result.code === 1) {
      if (!editId) {
        history.push(`/portal/article/edit/${result.data.id}`);
      }
      message.success(result.msg);
      return;
    }
    message.error(result.msg);
  };

  const tProps = {
    treeDefaultExpandAll: true,
    value: treeValue,
    treeData,
    multiple: true,
    treeCheckable: true,
    treeCheckStrictly: true,
    allowClear: true,
  };

  useEffect(() => {
    const featchData = async () => {
      const result = await getPortalCategoryList();
      if (result.code === 1) {
        setTreeData(result.data);
      }
    };
    featchData();

    const featchPost = async () => {
      const result = await getPortal(editId);
      if (result.code === 1) {
        const { data } = result;
        if (data.category instanceof Array) {
          const category: any = [];
          data.category.forEach((element: any) => {
            category.push({
              label: element.name,
              value: element.id.toString(),
            });
          });

          if (category.length > 0) {
            setTreeValue(category);
            data.category = category;
          }
        }

        if (data.post_keywords === '') {
          delete data.post_keywords;
        } else {
          data.post_keywords = data.keywords;
        }

        if (data.more_json && data.more_json.extends) {
          data.extends = data.more_json.extends;
        }

        if (data.more_json && data.more_json.template) {
          data.template = data.more_json.template;
        }

        if (data.publish_time) {
          data.publish_time = moment(data.publish_time, dateFormat);
        }

        form.setFieldsValue(data);
        setPost(data);
      }
    };
    featchData();

    if (editId > 0) {
      featchPost();
    }

    const init = async () => {
      const res = await listPage(1, { type: 'article', paginate: 'no' });
      if (res.code === 1) {
        setTpl(res.data);
        if (res.data.length > 0) {
          form.setFieldValue('template', `${res.data[0]?.id}`);
        }
      }

      // 改成低代码调用
      // const result = await getThemeFiles({ type: 'article' });
      // if (result.code === 1) {
      //   setTpl(result.data);
      // }
    };

    init();
  }, [editId]);

  return (
    <Form form={form} style={{ maxWidth: '800px' }} {...layout} onFinish={onFinish}>
      <Form.Item
        label="分类"
        name="category"
        rules={[{ required: true, message: '分类不能为空!' }]}
      >
        <TreeSelect dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} {...tProps} />
      </Form.Item>

      <Form.Item
        label="标题"
        name="post_title"
        rules={[{ required: true, message: '标题能为空!' }]}
      >
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

      <Form.Item label="排序" name="list_order" initialValue={10000}>
        <InputNumber />
      </Form.Item>

      <Form.Item label="文章来源" name="post_source">
        <Input />
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

      <Form.Item label="音频" name="audio" getValueProps={() => ({ path: post.audio_prev_path })}>
        <AssetsInput type="audio" />
      </Form.Item>

      <Form.Item label="视频" name="video" getValueProps={() => ({ path: post.video_prev_path })}>
        <AssetsInput type="video" />
      </Form.Item>

      <Form.Item label="置顶" name="is_top" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="推荐" name="recommended" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="参数">
        <Form.List name="extends">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field: any) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'key']}
                    fieldKey={[field.fieldKey, 'key']}
                    rules={[{ required: true, message: 'Missing key' }]}
                  >
                    <Input placeholder="key" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'value']}
                    fieldKey={[field.fieldKey, 'value']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder="value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button onClick={() => add()} icon={<PlusOutlined />}>
                  添加
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item initialValue={moment()} label="发布时间" name="publish_time">
        <DatePicker format={dateFormat} showTime />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: '文章模板不能为空!' }]}
        label="模板"
        name="template"
      >
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

        <Button onClick={() => history.push('/portal/article/list')}>返回</Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
