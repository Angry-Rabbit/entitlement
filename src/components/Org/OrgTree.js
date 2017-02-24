import {Tree, Button} from 'antd';
import styles from './OrgTree.less';
const TreeNode = Tree.TreeNode;

function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 3; i++) {
    arr.push({name: `leaf ${key}-${i}`, key: `${key}-${i}`});
  }
  return arr;
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
          curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}

class OrgTree extends React.Component {
  state = {
    treeData: [],
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          {name: '江西', key: '0-0'},
          {name: '广东', key: '0-1'},
          {name: '北京', key: '0-2'},
          {name: '湖南', key: '0-3'},
          {name: '贵州', key: '0-4'},
        ],
      });
    }, 100);
  }

  onSelect = (info) => {
    console.log('selected', info);
  }
  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 4);
        this.setState({treeData});
        resolve();
      }, 1000);
    });
  }

  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'}/>;
    });
    const treeNodes = loop(this.state.treeData);
    return (
        <Tree onSelect={this.onSelect} loadData={this.onLoadData} className={styles.normal}>
          {treeNodes}
        </Tree>
    );
  }
}

export default OrgTree;
