import { createContext, useEffect, useState } from 'react';
import Tetris from './Tetris';
import ShowCase from './components/ShowCase';
import Bins from './components/Bins';
import './index.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const userName = '夏天';
const initialRecord = 0;
const initialScore = 0;
const initialStoreTop = [0, 0, 0, 0];
const initialWasteList = [
  { id: 1, type: 5, used: -1 },
  { id: 2, type: 1, used: -1 },
  { id: 3, type: 8, used: -1 },
  { id: 4, type: 4, used: -1 },
  { id: 5, type: 6, used: -1 },
  { id: 6, type: 6, used: -1 },
  { id: 7, type: 9, used: -1 },
  { id: 8, type: 1, used: -1 },
  { id: 9, type: 1, used: -1 },
  { id: 10, type: 1, used: -1 },
]; // TODO:
const initialBoxList: any[] = [];
for (let i = 0; i < 4; i++) {
  let arr: any[] = [];
  for (let j = 0; j < 6; j++) {
    arr.push({ refer: 0, type: 0 });
  }
  initialBoxList.push(arr);
}

const initialData = {
  score: 0,
  storeTop: [0, 0, 0, 0],
  boxList: initialBoxList,
  wasteList: initialWasteList,
  curSelect: 0,
  step: 1,
  toggleScore: () => {},
  toggleStoreTop: (top: number, col: number) => {},
  toggleBoxList: (rol: number, col: number, refer: number, type: number) => {},
  toggleWasteList: (id: number, pos: number) => {},
  toggleStep: () => {},
  toggleCurSelect: (id: number) => {},
};
export const WasteType = [
  { id: 1, name: '较完整的玻璃制品', type: 1, width: 1, height: 2 },
  { id: 2, name: '较完整的塑料制品', type: 1, width: 1, height: 1 },
  { id: 3, name: '毛绒玩具', type: 1, width: 2, height: 2 },
  { id: 4, name: '旧书', type: 1, width: 2, height: 2 },
  { id: 5, name: '易拉罐', type: 1, width: 1, height: 1 },
  { id: 6, name: '皮鞋', type: 1, width: 3, height: 1 },
  { id: 7, name: '大骨头', type: 2, width: 1, height: 3 },
  { id: 8, name: '鱼骨', type: 2, width: 2, height: 1 },
  { id: 9, name: '烟蒂', type: 3, width: 1, height: 1 },
  { id: 10, name: '碎碗碟', type: 3, width: 2, height: 1 },
  { id: 11, name: '电池', type: 4, width: 1, height: 1 },
  { id: 12, name: '灯泡', type: 4, width: 2, height: 1 },
  { id: 13, name: '过期药物', type: 4, width: 1, height: 1 },
  { id: 14, name: '牛奶纸盒', type: 1, width: 1, height: 1 },
];
export let DataContext = createContext(initialData);
export let totalAll = 0;
export let record = 0;
export default function IndexPage() {
  useEffect(() => {
    // TODO: getData
    if (localStorage.getItem('WASTESORTING_RECORD')) {
      record = Number(localStorage.getItem('WASTESORTING_RECORD'));
      console.log(record);
    }
  }, []);

  let [score, setScore] = useState(initialScore);
  let [storeTop, setStoreTop] = useState(initialStoreTop);
  // initialWasteList
  let [boxList, setBoxList] = useState(initialBoxList);
  let [wasteList, setWasteList] = useState(initialWasteList); // TODO: slice
  let [step, setStep] = useState(1); // 1 表示第一阶段，2 表示第二阶段
  let [curSelect, setCurSelect] = useState(0);
  totalAll = initialWasteList.length;

  let toggleScore = () => {
    setScore((state) => state + 1);
  };
  let toggleStoreTop = (top: number, col: number) => {
    // console.log('top:', top, 'col:', col);
    setStoreTop((state) => {
      let new_state = state;
      new_state[col] = top;
      return new_state;
    });
  };
  let toggleBoxList = (
    col: number,
    rol: number,
    refer: number,
    type: number,
  ) => {
    setBoxList((state) => {
      let new_state = state;
      new_state[col][rol] = { refer, type };
      // console.log(new_state)
      return new_state;
    });
  };
  let toggleWasteList = (num: number, pos: number) => {
    setWasteList((state) => {
      let new_state = state;
      // TODO: id undefined
      new_state[num].used = pos;
      return new_state;
    });
  };
  let toggleCurSelect = (id: number) => {
    setCurSelect(id);
  };
  let toggleStep = () => {
    console.log('step', step);
    setStep((state) => 3 - state);
  };

  return (
    <div className="index">
      <Layout style={{ height: '100%' }}>
        {/* <Header style={{ background: 'white' }}>
          <span>不聪明的垃圾桶</span>
        </Header> */}
        <Content>
          <DataContext.Provider
            value={{
              score,
              storeTop,
              boxList,
              wasteList,
              curSelect,
              step,
              toggleScore,
              toggleStoreTop,
              toggleBoxList,
              toggleWasteList,
              toggleCurSelect,
              toggleStep,
            }}
          >
            {step == 1 ? <Tetris name={userName} /> : <Bins />}
            <ShowCase />
          </DataContext.Provider>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}
