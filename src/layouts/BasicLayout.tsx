import { useEffect } from 'react';
import { useModel } from 'umi';

function BasicLayout(props: any) {
  const { initialState, setInitialState } = useModel<any>('@@initialState');

  useEffect(() => {
    setInitialState({
      ...initialState,
      site: {
        siteId: props.match.params?.siteId,
      },
    });
  }, []);

  return props.children;
}

export default BasicLayout;
