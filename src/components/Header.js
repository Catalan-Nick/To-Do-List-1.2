import Button from "./Button"
import { useLocation } from 'react-router-dom'
const Header = ({title, onAdd, showAdd}) => {
  const location = useLocation()
  return (
    <header>
        <h1 className="header">{title}</h1>
        {location.pathname === '/' && (<Button 
          onClick={onAdd}
          color={showAdd ? 'FireBrick' : 'ForestGreen'} 
          text={showAdd ? 'Close' : 'Add'} />
          )}
    </header>
  )
}

// Header.defaultProps = {
//     title: "Task Tracker"
// }

// Header.propTypes = {
//     title: PropTypes.string, //makes it have to be a string
//     title: PropTypes.string.isRequired, //makes it required

// }

// const headingStyle = { //css in JS option for dynamic styling
//     color: 'white',
//     backgroundColor: 'grey',
// }
export default Header