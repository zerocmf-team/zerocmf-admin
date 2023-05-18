import { useEffect } from 'react';
import { useModel, history } from 'umi';

function BasicLayout(props: any) {
  const { initialState, setInitialState } = useModel<any>('@@initialState');

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await initialState?.fetchUserInfo();
      if (currentUser.access) {
        setInitialState({
          ...initialState,
          site: {
            siteId: props.match.params?.siteId,
          },
        });
      } else {
        history.push('/workspace');
      }
    };
    fetchData();
  }, [props.match.params.siteId]);

  return props.children;
}

export default BasicLayout;
