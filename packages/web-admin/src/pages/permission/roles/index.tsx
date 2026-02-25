import { useState } from 'react'
import { Button, Table, Modal, Form, Input, Checkbox, App, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'
import type { IRole } from '@/services/system.service'

const ALL_PERMISSIONS = [
  'user:read',
  'user:write',
  'content:read',
  'content:write',
  'content:review',
  'memory:read',
  'dashboard:read',
  'system:read',
  'system:write',
  'export:write',
]

export default function RolesPage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<IRole | null>(null)
  const [form] = Form.useForm()

  const { data: rolesRes, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => systemService.getRoles(),
  })

  const createMutation = useMutation({
    mutationFn: (data: { name: string; description: string; permissions: string[] }) =>
      systemService.createRole(data),
    onSuccess: () => {
      message.success('创建成功')
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      closeModal()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{ name: string; description: string; permissions: string[] }> }) =>
      systemService.updateRole(id, data),
    onSuccess: () => {
      message.success('更新成功')
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      closeModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => systemService.deleteRole(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })

  const closeModal = () => {
    setModalOpen(false)
    setEditingRole(null)
    form.resetFields()
  }

  const openCreate = () => {
    setEditingRole(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (role: IRole) => {
    setEditingRole(role)
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    if (editingRole) {
      updateMutation.mutate({ id: editingRole.id, data: values })
    } else {
      createMutation.mutate(values)
    }
  }

  const columns = [
    { title: '角色名', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '权限数',
      dataIndex: 'permissions',
      key: 'permissionCount',
      render: (permissions: string[]) => permissions.length,
    },
    { title: '关联用户数', dataIndex: 'userCount', key: 'userCount' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: IRole) => (
        <>
          <Button type="link" size="small" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Popconfirm title="确定删除该角色？" onConfirm={() => deleteMutation.mutate(record.id)}>
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <PageContainer
      title="角色管理"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          新增角色
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={rolesRes?.data}
        pagination={false}
      />

      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入角色名称' }]}>
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="请输入角色描述" />
          </Form.Item>
          <Form.Item name="permissions" label="权限" rules={[{ required: true, message: '请选择权限' }]}>
            <Checkbox.Group options={ALL_PERMISSIONS} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}
