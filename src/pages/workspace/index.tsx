import {
  ProLayout,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormSwitch,
} from '@ant-design/pro-components';
import RightContent from '@/components/RightContent';
import defaultSettings from '../../../config/defaultSettings';
import {
  Col,
  Row,
  Card,
  Pagination,
  Avatar,
  Button,
  Form,
  message,
  Typography,
  Tooltip,
  Popconfirm,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';
import styles from './styles.less';
import { useEffect, useState } from 'react';
import { add, del, edit, list } from '@/services/workspace';

import { history } from 'umi';

const { Paragraph } = Typography;

const SaveForm = (props: any) => {
  return (
    <ModalForm
      width={520}
      {...props}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
    >
      <ProFormText name="index" hidden />
      <ProFormText name="siteId" label="站点Id" hidden />

      <ProFormText
        name="name"
        label="站点名称"
        tooltip="最长为 32 位"
        placeholder="请输入站点名称"
        rules={[{ required: true, message: '站点名称不能为空' }]}
      />

      <ProFormTextArea name="desc" label="站点描述" placeholder="请输入站点描述" />

      <ProFormText
        name="domain"
        label="域名"
        tooltip="绑定访问的域名"
        placeholder="请输入绑定的域名"
      />

      <ProFormText
        name="dsn"
        label="数据源配置"
        tooltip="用于自定义配置数据库的连接字符串"
        placeholder="请输入数据源"
      />

      <ProFormDigit
        label="排序"
        tooltip="越大越靠前"
        name="list_order"
        initialValue={10000}
        placeholder="排序"
      />

      <ProFormSwitch name="status" label="状态" initialValue={true} />
    </ModalForm>
  );
};

function Workspace() {
  const { Meta } = Card;

  const [modalVisit, setModalVisit] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增应用');

  const [form] = Form.useForm<any>();

  const [data, setData] = useState<any>({
    current: 1,
    page_size: 10,
    total: 1,
    data: [],
  });

  const fetchData = async () => {
    const res = await list();
    if (res.code != 1) {
      message.error(res.msg);
      return;
    }
    setData(res.data);
  };

  const saveData = async (params: any) => {
    params.status = params.status ? 1 : 0;
    let res;
    const { siteId } = params;
    if (siteId) {
      res = await edit(siteId, params);
    } else {
      res = await add(params);
    }
    if (res.code != 1) {
      message.error(res.msg);
      return false;
    }

    if (siteId) {
      const { index } = params;
      const newData = { ...data };
      newData.data[index] = { ...data.data[index], ...params, index };
      setData(newData);
    } else {
      fetchData();
    }

    return true;
  };

  const deleteApp = async (item: any) => {
    const res = await del(item.siteId);
    if (res.code != 1) {
      message.error(res.msg);
      return;
    }

    const { index } = item;
    const newData = { ...data };
    delete newData.data[index];
    setData(newData);

    message.success(res.msg);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProLayout
      className={styles.layout}
      rightContentRender={() => <RightContent />}
      menuRender={false}
      {...defaultSettings}
    >
      <SaveForm
        form={form}
        title={modalTitle}
        onFinish={async (values: any) => {
          return await saveData(values);
        }}
        visible={modalVisit}
        onVisibleChange={setModalVisit}
      />
      <div className={styles.main}>
        <div className={styles.container}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12} lg={6}>
              <div className={styles.card}>
                <Button
                  onClick={() => {
                    setModalVisit(true);
                    setModalTitle('新增应用');
                  }}
                  type="dashed"
                  className={styles.newButton}
                >
                  <PlusOutlined /> 新增应用
                </Button>
              </div>
            </Col>
            {data?.data?.map((item: any, i: number) => {
              return (
                <Col xs={24} md={12} lg={6} key={item.siteId}>
                  <Card
                    onClick={() => {
                      history.push(`/${item.siteId}/settings`);
                    }}
                    className={styles.card}
                    hoverable
                    actions={[
                      <Tooltip key="setting" title="编辑">
                        <EditOutlined
                          onClick={(e) => {
                            setModalVisit(true);
                            setModalTitle('编辑应用');
                            form.setFieldsValue({ ...item, index: i });
                            e.stopPropagation();
                          }}
                          key="edit"
                        />
                      </Tooltip>,

                      <Popconfirm
                        key="delete"
                        title="您确定删除改应用吗？"
                        onConfirm={async (e) => {
                          e?.stopPropagation();
                          deleteApp({ ...item, index: i });
                        }}
                        onCancel={(e) => {
                          e?.stopPropagation();
                        }}
                        okText="确定"
                        cancelText="取消"
                      >
                        <DeleteOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </Popconfirm>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar
                          size={48}
                          src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
                        />
                      }
                      title={item.name}
                      description={
                        <>
                          <Paragraph ellipsis={true} copyable>
                            {item.siteId}
                          </Paragraph>
                          <div className={styles.item}>{item.desc}</div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
          <div className={styles.pagination}>
            <Pagination current={data.current} pageSize={data.page_size} total={data.total} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </ProLayout>
  );
}

export default Workspace;
