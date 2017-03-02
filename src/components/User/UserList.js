import {Table} from 'antd';
import styles from './UserList.css';
import UserModal from './UserModal';

function editHandler(uid, index, values){

}

const columns = [
  {title: '名字', dataIndex: 'name', key: 'name'},
  {title: '角色', dataIndex: 'age', key: 'age'},
  {title: '地址', dataIndex: 'address', key: 'address'},
  {
    title: '操作', dataIndex: '', key: 'x',
    render: () => (<a>Edit</a>
    )
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  },
];


const UserList = () => {
  return (
    <Table
      columns={columns}
      expandedRowRender={record => <p>{record.description}</p>}
      dataSource={data}
    />
  );
}

export default UserList;
