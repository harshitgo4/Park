import { useParams } from 'react-router-dom';
import Home from './IndexPage';

const FolderPage = () => {
  const { folder } = useParams();

  return <Home folder={folder} />;
};

export default FolderPage;