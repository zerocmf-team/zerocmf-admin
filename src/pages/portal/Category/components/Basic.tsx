import { useEffect, useState } from 'react';
import { Form, Input, TreeSelect, Row, Col, Select } from 'antd';
import { AssetsInput } from '@zerocmf/antd-form';
import { getPortalCategoryList } from '@/services/portalCategory';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

const Basic = (props: any) => {
  const { onFormChange, form, pid }: any = props;

  useEffect(() => {
    form.setFieldValue('parent_id', pid);
  }, [form, pid]);

  const [treeData, setTreeData] = useState([]); // 编辑
  useEffect(() => {
    const featchData = async () => {
      const result: any = await getPortalCategoryList();
      if (result.code === 1) {
        const data: any = [
          {
            title: '作为一级分类',
            value: '0',
          },
        ];

        result.data.forEach((element: any) => {
          element.parent_id = `${element.parent_id}`;
          data.push(element);
        });
        setTreeData(data);
      }
    };
    featchData();
  }, []);

  return (
    <>
      <Row>
        <Col span={12}>
          <Form form={form} onValuesChange={onFormChange} {...formItemLayout}>
            <Form.Item label="id" style={{ display: 'none' }} name="id">
              <Input />
            </Form.Item>

            <Form.Item
              label="上级"
              name="parent_id"
              rules={[{ required: true, message: '请选择上级分类!' }]}
            >
              <TreeSelect
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
              />
            </Form.Item>

            <Form.Item
              label="分类名称"
              name="name"
              rules={[{ required: true, message: '分类名称不能为空!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="分类别名" name="alias">
              <Input />
            </Form.Item>

            <Form.Item label="描述" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="缩略图"
              name="thumbnail"
              getValueProps={() => ({ path: form.getFieldValue('prev_path') })}
            >
              <AssetsInput />
            </Form.Item>

            <Form.Item label="状态" name="status" initialValue={1}>
              <Select placeholder="请选择状态">
                <Option value={1}>启用</Option>
                <Option value={0}>停用</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Basic;
