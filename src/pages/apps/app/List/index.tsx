import { AppstoreOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Card, Col, message, Row, Typography } from 'antd';
import ModalForm from './components/modalForm';
import { useEffect, useRef } from 'react';
import { list } from '@/services/app';

import styles from './index.less';
import Tooltip from 'antd/es/tooltip';
import { useImmer } from 'use-immer';
import { history } from 'umi';

const { Meta } = Card;

const { Paragraph } = Typography;

const List = () => {
  const [state, setState] = useImmer({
    data: [],
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const modalRef = useRef<any>();

  const fetchData = async () => {
    const res = await list();
    if (res.code != 1) {
      message.error(res.msg);
      return;
    }
    const { data, current, pageSize, total } = res.data;
    setState((draft: any) => {
      draft.data = data;
      draft.current = current;
      draft.pageSize = pageSize;
      draft.total = total;
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer>
      <ModalForm
        open={open}
        ref={modalRef}
        onFinish={() => {
          fetchData();
        }}
      />
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card
            onClick={() => {
              modalRef.current.open();
            }}
            className={styles.add}
          >
            <PlusOutlined />
            <span style={{ marginLeft: '8px' }}>新增应用</span>
          </Card>
        </Col>

        {state.data.map((item: any) => {
          return (
            <Col key={item.id} span={6}>
              <Card
                className={styles.card}
                actions={[
                  <Tooltip key="edit" title="编辑应用">
                    <EditOutlined
                      onClick={() => {
                        modalRef.current.open(item);
                      }}
                    />
                  </Tooltip>,
                  <Tooltip key="page" title="管理页面">
                    <AppstoreOutlined
                      onClick={() => {
                        history.push(`/apps/app/page/${item.id}`);
                      }}
                    />
                  </Tooltip>,
                  <Tooltip key="delete" title="删除应用">
                    <DeleteOutlined />
                  </Tooltip>,
                ]}
              >
                <Meta
                  className="item"
                  avatar={
                    <Avatar src="https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg" />
                  }
                  title={item.name}
                  description={
                    <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                      {item.description}
                    </Paragraph>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContainer>
  );
};
export default List;
