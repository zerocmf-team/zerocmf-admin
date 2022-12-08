import { useState } from 'react';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import Image from './components/image';
import Video from './components/video';
import Audio from './components/audio';
import File from './components/file';

const tabList = [
  {
    key: 'tab1',
    tab: '图片',
  },
  {
    key: 'tab2',
    tab: '音频',
  },
  {
    key: 'tab3',
    tab: '视频',
  },
  {
    key: 'tab4',
    tab: '附件',
  },
];

const Assets = () => {
  const [key, setKey] = useState('tab1');

  const onTabChange = (tab: any) => {
    setKey(tab);
  };

  const contentList = {
    tab1: <Image key="tab1" />,
    tab2: <Audio key="tab2" />,
    tab3: <Video key="tab3" />,
    tab4: <File key="tab4" />,
  };

  return (
    <PageContainer>
      <Card tabList={tabList} activeTabKey={key} onTabChange={onTabChange}>
        {contentList[key]}
      </Card>
    </PageContainer>
  );
};

export default Assets;
