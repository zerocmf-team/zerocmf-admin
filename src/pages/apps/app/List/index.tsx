import { AppstoreOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, Col, message, Row, Typography } from 'antd';
import ModalForm from './components/modalForm';
import { useEffect, useRef } from 'react';
import { list } from '@/services/app';

import styles from './index.less';
import Tooltip from 'antd/es/tooltip';
import { useImmer } from 'use-immer';
import { historyPush } from '@/utils/utils';

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
        <Col xs={24} md={12} lg={6}>
          <div className={styles.card}>
            <Button
              onClick={() => {
                modalRef.current.open();
              }}
              type="dashed"
              className={styles.newButton}
            >
              <PlusOutlined />
              <span style={{ marginLeft: '8px' }}>新增渠道</span>
            </Button>
          </div>
        </Col>

        {state.data.map((item: any) => {
          return (
            <Col xs={24} md={12} lg={6} key={item.id}>
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
                        historyPush(`/apps/app/page/${item.id}`);
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
                    <Avatar
                      size={48}
                      src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
                    />
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
