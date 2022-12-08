import { useEffect } from 'react';
import { Form, Select, Row, Col } from 'antd';

import { useImmer } from 'use-immer';

import { getThemeFiles } from '@/services/themeFile';

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

  const { onFormChange, form } = props;

  useEffect(() => {
    const init = async () => {
      let list_tpl = '';
      let one_tpl = '';
      const listResult = await getThemeFiles({ type: 'list' });
      if (listResult.code === 1) {
        list_tpl = listResult.data?.[0].file;
        setState((draft) => {
          draft.tplList = listResult.data;
        });
      }

      const articleResult = await getThemeFiles({ type: 'article' });
      if (articleResult.code === 1) {
        one_tpl = articleResult.data?.[0].file;
        setState((draft) => {
          draft.tplArticle = articleResult.data;
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
  }, []);

  return (
    <Row>
      <Col span={12}>
        <Form form={form} onValuesChange={onFormChange} {...formItemLayout}>
          <Form.Item
            label="列表模板"
            name="list_tpl"
            rules={[{ required: true, message: '列表模板不能为空!' }]}
          >
            <Select placeholder="请选择模板">
              {state.tplList.map((item: any, index) => (
                <Option key={index} value={item.file}>
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
              {state.tplArticle.map((item: any, index) => (
                <Option key={index} value={item.file}>
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
