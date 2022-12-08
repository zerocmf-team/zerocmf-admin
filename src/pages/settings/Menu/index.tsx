import type { FormInstance, InputRef } from 'antd';
import { Tag } from 'antd';
import { Popconfirm, Space } from 'antd';
import { Button, Card, Form, Input, message, Table } from 'antd';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import ModalForm from './components/modalForm';
import { useImmer } from 'use-immer';
import { getAllAdminMenu, deleteMenu } from '@/services/adminMenu';
import { useIntl, useModel } from 'umi';
import styles from './index.less';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  editable?: boolean;
  children?: DataType[];
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

const statusMap = {
  0: {
    color: 'blue',
    text: '显示',
  },
  1: {
    color: '',
    text: '隐藏',
  },
};

const Menu = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useImmer({
    data: [],
    expandedRowKeys: [],
  });

  const { initialState } = useModel('@@initialState');

  const modalFormRef = useRef<any>(null);

  const intl = useIntl();

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }

  const EditableCell: React.FC<EditableCellProps> = (props: any) => {
    const { title, editable, children, dataIndex, record = {}, handleSave, ...restProps } = props;
    // const defaultValue = record?.[dataIndex];
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const handleSave = (row: any) => {
    const { index } = row;
    if (index) {
      const indexArr = index.split('-');
      let newDraft: any = [];
      setState((draft: any) => {
        newDraft = draft.data;
        let editIndex = indexArr[0];
        if (indexArr.length > 1) {
          indexArr.forEach((i: any, ai: number) => {
            if (ai != indexArr.length - 1) {
              newDraft = newDraft[i].routes;
            }
            editIndex = i;
          });
        }
        newDraft[editIndex] = row;
      });
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await getAllAdminMenu();
    if (res.code == 1) {
      setState((draft: any) => {
        draft.data = res.data;
      });
    } else {
      message.error(res.msg);
    }
    setLoading(false);
  }, [setState]);

  const fetchDelete = async (id: number) => {
    const res = await deleteMenu(id);
    if (res.code == 1) {
      fetchData();
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
    setLoading(false);
  };

  const columns: any = [
    {
      title: '排序',
      dataIndex: 'list_order',
      key: 'list_order',
      width: 180,
      editable: true,
      onCell: (record: DataType) => ({
        record,
        editable: true,
        dataIndex: 'list_order',
        title: '排序',
        handleSave,
      }),
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: (text: string, record: any) => {
        // console.log(text, reord);
        return intl.formatMessage({
          id: record.locale,
        });
      },
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 100,
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      with: '15%',
    },
    {
      title: '菜单状态',
      dataIndex: 'hideInMenu',
      key: 'hideInMenu',
      width: 90,
      render: (text: any) => {
        return <Tag color={statusMap[text].color}>{statusMap[text].text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: '15%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (_: any, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              modalFormRef.current.open({ data: record, title: '修改菜单' });
            }}
          >
            <EditOutlined />
            修改
          </a>
          <a
            onClick={() => {
              modalFormRef.current.open({ data: { parent_id: record.id }, title: '添加菜单' });
            }}
          >
            <PlusOutlined />
            添加
          </a>
          <Popconfirm
            title="您确定删除吗?"
            onConfirm={() => {
              fetchDelete(record.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: 'var(--ant-error-color)' }}>
              <DeleteOutlined />
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onFinish = () => {
    fetchData();
    initialState?.fetchMenus?.();
  };

  // rowSelection objects indicates the need for row selection
  const expandable: any = {
    expandedRowKeys: state.expandedRowKeys,
    onExpandedRowsChange: (expandedRows: any) => {
      setState((draft: any) => {
        draft.expandedRowKeys = expandedRows;
      });
    },
  };

  return (
    <PageContainer className={styles.tableContaier} loading={loading}>
      <ModalForm onFinish={onFinish} ref={modalFormRef} />
      <Card>
        <div className={styles.btnGroup}>
          <Button
            onClick={() => {
              modalFormRef.current.open();
            }}
            type="primary"
          >
            新建
          </Button>
        </div>
        <Table
          rowKey="id"
          columns={columns}
          rowClassName={() => 'editable-row'}
          childrenColumnName="routes"
          dataSource={state.data}
          components={components}
          expandable={{ ...expandable }}
          pagination={false}
        />
      </Card>
    </PageContainer>
  );
};
export default Menu;
