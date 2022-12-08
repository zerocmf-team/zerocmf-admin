import React, { useState, useEffect } from 'react';
import { PageHeader, Button, List, Card, Upload, message, Spin, Image as AntImage } from 'antd';
import { getAssets, deleteAssets } from '@/services/assets';
import { DeleteOutlined } from '@ant-design/icons';
import { uploadProps } from '../props';

const Image = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // 分页current
  const [pageCurrent, setPageCurrent] = useState(1);

  // 获取资源数据列表
  const getData: any = async (params: any) => {
    setLoading(true);
    const submitData = { ...params, type: 0 };
    const result = await getAssets(submitData);
    let paginationData: any = [];
    if (result.code === 1) {
      paginationData = result.data.data;
      let resultData: any = [];
      paginationData.forEach((element: any) => {
        resultData = [
          ...resultData,
          {
            id: element.id,
            file_name: element.file_name,
            file_path: element.file_path,
            prev_path: element.prev_path,
            remark_name: element.remark_name,
          },
        ];
      });
      setData(resultData);
      setTotal(result.data.total);
    }
    setLoading(false);
    return { data: paginationData };
  };

  // 首次加载读取数据
  useEffect(() => {
    getData({ current: 1 });
  }, []);

  const upload = uploadProps(0, getData);

  // 删除单项
  const deleteItem = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: any) => {
    e.stopPropagation();
    setLoading(true);
    const result = await deleteAssets(id);
    if (result.code === 1) {
      getData([]);
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <PageHeader
        style={{ padding: 0 }}
        title={`图片（共${total}条）`}
        extra={[
          <Upload key="upload" {...upload}>
            <Button type="primary">上传</Button>
          </Upload>,
        ]}
      >
        <List
          grid={{ gutter: 16, column: 5, xs: 2, sm: 4, md: 4, lg: 6 }}
          dataSource={data}
          pagination={{
            position: 'bottom',
            current: pageCurrent,
            total,
            onChange: (page) => {
              setPageCurrent(page);
              getData({ current: page });
            },
            pageSize: 10,
          }}
          renderItem={(item: any) => {
            return (
              <List.Item>
                <Card
                  cover={<AntImage alt={item.file_name} src={item.prev_path} />}
                  className="assets-thumbnail image-thumbnail"
                  hoverable={true}
                >
                  <div className="title">{item.remark_name}</div>
                  <div
                    onClick={(e) => {
                      deleteItem(e, item.id);
                    }}
                    className="deleteIcon"
                  >
                    <DeleteOutlined style={{ fontSize: '0.8rem' }} />
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
      </PageHeader>
    </Spin>
  );
};

export default Image;
