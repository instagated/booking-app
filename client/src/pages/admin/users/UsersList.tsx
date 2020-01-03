import React, { useState } from "react";
import { DataPane } from "../../../components/dataPane/DataPane";
import { User, useUsersQuery, UserRole } from "../../../lib/codegen";
import { notification, Dropdown, Select } from "antd";
import { UserForm } from "./UserForm";
import { getColumnSearchProps } from "../../../components/dataPane/components/TableFilterDropdown";

interface UsersListProps {

}

export const UsersList: React.FC<UsersListProps> = props => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const usersQuery = useUsersQuery({
    variables: {
      data: {
        limit: 10,
        offset: 0
      }
    }
  })
  const { loading, error, data } = usersQuery

  if (error)
    notification['error']({ message: error.message })

  return (
    <DataPane<User>
      loading={loading}
      style={{ height: '100%' }}
      activeIdState={[activeId, setActiveId]}
      dataSource={data ? { items: data.users.items, total: data.users.total } : { items: [], total: 0 }}
      renderPane={() => <UserForm />}
      tableProps={{
        columns: [
          {
            key: 'name',
            dataIndex: 'name',
            title: 'Name',
            render: (text, record) => text
          },
          {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            render: (text, record) => text
          },
          {
            key: 'role',
            dataIndex: 'role',
            title: 'Role',
            render: (text, record) => text,
            ...getColumnSearchProps({
              dataIndex: 'role',
              isFiltered: () => usersQuery.variables.data.role ? true : false,
              onSearch: (searchValue) => usersQuery.refetch({ data: { ...usersQuery.variables.data, role: searchValue } }),
              onReset: () => usersQuery.refetch({ data: { ...usersQuery.variables.data, role: undefined } }),
              renderMenu: ({ onSearch }) =>
                <Select
                  style={{
                    width: 150
                  }}
                  allowClear={true}
                  onChange={(value) => onSearch(value as any)}
                >
                  <Select.Option value={UserRole['Admin']}>Admin</Select.Option>
                  <Select.Option value={UserRole['Employee']}>Employee</Select.Option>
                  <Select.Option value={UserRole['Customer']}>Customer</Select.Option>
                </Select>
            })
          }
        ],
        pageSize: usersQuery.variables.data.limit!,
        initialPage: () => 1,
        handlePageChange: offset => {
          usersQuery.refetch({ data: { ...usersQuery.variables.data, offset } })
        }
      }}
    />
  );
}