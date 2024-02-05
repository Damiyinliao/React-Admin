import { useEffect, useState } from 'react';
import { Button, Table, TableColumnsType, TablePaginationConfig, Tag, message } from 'antd';
import { MenuTypeName } from './dict';
import menuService from '@/api/app';
import useRequest from '@/hooks/useRequest';
import { MenuItem } from '@/interface/menu';
import { AntdIcons } from '@/components/AntdIcons';
import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MenuForm from './MenuForm';
import { useMenuStore } from '@/stores/menu';

const Menu: React.FC = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false); // 新增菜单弹窗
  const [formType, setFormType] = useState<'add' | 'edit'>('add'); // 新增菜单弹窗
  const [rowData, setRowData] = useState<MenuItem>({} as MenuItem); // 行数据

  const [menuTree, setMenuTree] = useState<MenuItem[]>([]); // 菜单树
  const { runAsync: getAllMenus } = useRequest(menuService.getMenuAll, { manual: true });

  const { runAsync: getMenuTree, loading } = useRequest(menuService.getMenuTree, { manual: true });

  const { setMenuList } = useMenuStore();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10
  });
  const { runAsync: delMenu, loading: delLoading } = useRequest(menuService.delMenu, { manual: true });

  // 处理菜单树
  // const handleMenuTree = async () => {
  //   const [error, result] = await getMenuTree();
  //   if (error) {
  //     return;
  //   }
  //   setMenuTree(result.data);
  // };

  // 获取所有菜单
  const handleGetAllMenus = async () => {
    const [error, result] = await getAllMenus();
    if (error) {
      return;
    }
    setMenuList(result.data);
  };

  const handleSuccess = () => {
    // handleMenuTree();
    handleGetAllMenus();
    setFormVisible(false);
  };

  // 分页切换处理
  const handlePagination = (tablePagination: TablePaginationConfig) => {
    setPagination(tablePagination);
  };
  // 删除菜单
  const handleDel = async (id: number, record: MenuItem) => {
    const [error, result] = await delMenu();
    if (!error) {
      message.success(result.msg);
      // handleMenuTree();
    }
    console.log('删除', id, record);
  };
  // 页码页脚切换获取菜单树
  // useEffect(() => {
  //   handleMenuTree()
  // }, [
  //   pagination.current,
  //   pagination.pageSize
  // ])

  const columns: TableColumnsType<{ id: any }> | undefined = [
    {
      title: '菜单名称',
      dataIndex: 'title',
      width: 200
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      render: (value: string) => <Tag color="processing">{MenuTypeName[value]}</Tag>
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
      sorter: (a: any, b: any) => a.sort - b.sort,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: '路由',
      dataIndex: 'path',
      align: 'center'
    },
    {
      title: '路径',
      dataIndex: 'component',
      align: 'center'
    },
    {
      title: '父级菜单',
      dataIndex: 'parentPath'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
      render: (value: string) => AntdIcons[value] && React.createElement(AntdIcons[value])
    },
    {
      title: '操作',
      dataIndex: 'id',
      align: 'center',
      render: (rowKey: number, record: any) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setFormType('edit');
              setRowData(record);
              setFormVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            danger
            type="link"
            icon={<DeleteOutlined />}
            loading={delLoading}
            onClick={() => handleDel(rowKey, record)}
          >
            删除
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-3">
      <Button
        type="primary"
        onClick={() => {
          setFormVisible(true);
          setFormType('add');
        }}
      >
        添加
      </Button>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={menuTree}
        pagination={pagination}
        onChange={handlePagination}
      />
      <MenuForm
        data={formType === 'edit' ? rowData : undefined}
        type={formType}
        visible={formVisible}
        onCancel={() => setFormVisible(false)}
        onSuccess={() => handleSuccess()}
      />
    </div>
  );
};
export default Menu;
