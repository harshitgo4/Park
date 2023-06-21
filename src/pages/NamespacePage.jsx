import { useParams } from 'react-router-dom';
import Home from './IndexPage';

const NamespacePage = () => {
  const { folder, namespace } = useParams();
  console.log(useParams)

  return <Home folder={folder} initialNamespace={namespace} />;
};

export default NamespacePage;