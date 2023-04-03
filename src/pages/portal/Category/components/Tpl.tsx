import { useEffect } from 'react';
import { Form, Select, Row, Col } from 'antd';
import { useImmer } from 'use-immer';
// import { getThemeFiles } from '@/services/themeFile';
import { listPage } from '@/services/appPage';

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

const Tpl = (props: any) => {
  const [state, setState] = useImmer({
    tplList: [],
    tplArticle: [],
  });

  const { form } = props;

  useEffect(() => {
    const init = async () => {
      let list_tpl = '';
      let one_tpl = '';

      const listRes = await listPage(1, { type: 'list', paginate: 'no' });
      if (listRes.code == 1) {
        if (listRes.data.length > 0) {
          list_tpl = `${listRes.data[0]?.id}`;
        }
        setState((draft) => {
          draft.tplList = listRes.data;
        });
      }

      const res = await listPage(1, { type: 'article', paginate: 'no' });
      if (res.code == 1) {
        if (res.data.length > 0) {
          one_tpl = `${res.data[0]?.id}`;
        }
        setState((draft) => {
          draft.tplArticle = res.data;
        });
      }

      const blog = form.getFieldValue('list_tpl');
      if (!blog) {
        // 默认选中第一个
        form.setFieldsValue({
          list_tpl,
          one_tpl,
        });
      }
    };
    init();
  }, [form, setState]);

  return (
    <Row>
      <Col span={12}>
        <Form form={form} {...formItemLayout}>
          <Form.Item
            label="列表模板"
            name="list_tpl"
            rules={[{ required: true, message: '列表模板不能为空!' }]}
          >
            <Select placeholder="请选择模板">
              {state.tplList.map((item: any) => (
                <Option key={item.id} value={`${item.id}`}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="文章模板"
            name="one_tpl"
            rules={[{ required: true, message: '文章模板不能为空!' }]}
          >
            <Select placeholder="请选择模板">
              {state.tplArticle.map((item: any) => (
                <Option key={item.id} value={`${item.id}`}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Tpl;
