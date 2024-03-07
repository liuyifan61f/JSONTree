import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Input, Tree } from 'antd';
import './App.css';
import {convertInputToTree} from '../src/util/dataToTreeModel.tsx';
import { TreeNode } from 'antd/es/tree-select';


const renderTitle = (node:{key:string|number,title:string}) => {
  return (
    <span>
    {node.key} {node.title} 
    </span>
  );
};

type TreeNode = {
  title: string;
  key: string;
  children?: TreeNode[]; 
};

const App = () => {
  const [inputData,setInputData]=useState('{"a":{"a.a":"1","a.b":"2"},"b":"3"}');
  const [treeData,setTreeData]=useState<TreeNode[]>(convertInputToTree('{"a":{"a.a":"1","a.b":"2"},"b":"3"}'));
  const handleChange=(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    setInputData(e.target.value);
    setTreeData(convertInputToTree(e.target.value));
  }
  return (
    <div className='container'>
      <div className='left'>
      <Input.TextArea  value={inputData} onChange={handleChange} style={{minHeight:'200px',width:'100%'}}/>
      </div>
      <div className='right'>
        <Tree
          showLine
          defaultExpandAll
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          titleRender={(node:{key:string|number,title:string}) => renderTitle(node)}
        />
      </div>
    </div>
    
  );
};



export default App;
