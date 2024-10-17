import { ClipLoader } from 'react-spinners'
import Notebook from '../../Notebook/Notebooks'
import Notes from '../../Notes/Notes'
import Sidebar from '../../SideNavBar/Sidebar'
import Todo from '../../Todo/Todo'
import './Homepage.css'
import { useSelector } from 'react-redux'

function Homepage() {
  const user = useSelector((state) => state.auth.user)

  // if (!user)
  //   return (
  //     <div className="loader">
  //       <ClipLoader size={100} aria-label="Loading Spinner" color='#EA2E00'/>
  //     </div>
  //   )
  return (
    <div className="homepage">
      <Sidebar />
      <div className="homepage-content">
        <Notebook />
        <Notes notebookId="all" />
      </div>
      {/* <Todo/> */}
    </div>
  )
}
export default Homepage
